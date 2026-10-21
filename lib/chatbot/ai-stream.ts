import { createParser, type EventSourceMessage } from "eventsource-parser";

import type { ChatEvent } from "./events";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionPayload {
  model: string;
  messages: ChatMessage[];
  max_tokens: number;
  stream: true;
}

// llama.cpp's stream: OpenAI-style deltas, plus `prompt_progress` while it
// reads the prompt (`return_progress`) and `usage`/`timings` in the last
// chunk (`stream_options.include_usage`).
type CompletionChunk = {
  choices?: {
    delta?: { content?: string | null };
    finish_reason?: string | null;
  }[];
  prompt_progress?: { total: number; processed: number };
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    prompt_tokens_details?: { cached_tokens?: number };
  };
  timings?: {
    prompt_ms: number;
    predicted_ms: number;
    predicted_per_second: number;
  };
};

/**
 * How long to wait for the first token. After the model server restarts, its
 * prompt cache is cold and reading the system prompt takes about a minute.
 */
const FIRST_TOKEN_TIMEOUT_MS = 120_000;

/**
 * Streams a chat completion from an OpenAI-compatible server (`AI_BASE_URL`,
 * e.g. the self-hosted llama.cpp server) as newline-delimited `ChatEvent`
 * JSON. Aborting `signal` (the visitor's request) cancels the upstream
 * request, so the model stops generating for someone who already left.
 */
export async function chatCompletionStream(
  payload: ChatCompletionPayload,
  signal: AbortSignal,
): Promise<ReadableStream<Uint8Array>> {
  const firstToken = new AbortController();
  const timer = setTimeout(() => firstToken.abort(), FIRST_TOKEN_TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(
      `${(process.env.AI_BASE_URL ?? "").replace(/\/$/, "")}/chat/completions`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AI_API_KEY ?? ""}`,
        },
        method: "POST",
        body: JSON.stringify({
          ...payload,
          stream_options: { include_usage: true },
          return_progress: true,
        }),
        signal: AbortSignal.any([signal, firstToken.signal]),
      },
    );
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok || !res.body) {
    throw new Error(
      `The model server returned an error: ${res.status} - ${await res.text()}`,
    );
  }

  const reader = res.body.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      let closed = false;
      let started = false;
      let truncated = false;
      const send = (event: ChatEvent) => {
        if (!closed)
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };
      const close = () => {
        if (!closed) {
          closed = true;
          controller.close();
        }
      };

      const parser = createParser({
        onEvent(event: EventSourceMessage) {
          if (closed || event.data === "[DONE]") return;
          const json = JSON.parse(event.data) as CompletionChunk;

          const progress = json.prompt_progress;
          if (progress && !started) {
            send({
              type: "progress",
              processed: progress.processed,
              total: progress.total,
            });
          }

          const choice = json.choices?.[0];
          if (choice?.finish_reason === "length") truncated = true;
          // The model sometimes writes an empty "<think></think>" into its
          // answer. Drop it, and the blank lines before the first real text.
          let text = (choice?.delta?.content ?? "")
            .replaceAll("<think>", "")
            .replaceAll("</think>", "");
          if (!started) text = text.trimStart();
          if (text) {
            started = true;
            send({ type: "text", text });
          }

          if (json.usage && json.timings) {
            send({
              type: "stats",
              stats: {
                promptTokens: json.usage.prompt_tokens,
                cachedTokens:
                  json.usage.prompt_tokens_details?.cached_tokens ?? 0,
                outputTokens: json.usage.completion_tokens,
                tokensPerSecond: json.timings.predicted_per_second,
                promptMs: json.timings.prompt_ms,
                generationMs: json.timings.predicted_ms,
                truncated,
              },
            });
          }
        },
      });

      // SSE events can be split across network chunks; the parser reassembles
      // them. `stream: true` keeps multi-byte characters (e.g. Arabic, emoji)
      // that straddle chunks intact.
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          parser.feed(decoder.decode(value, { stream: true }));
        }
      } catch (error) {
        // The visitor already has the start of the reply, so say what went
        // wrong in-band instead of cutting the response off.
        if (!signal.aborted) {
          console.error("Chat stream failed:", error);
          send({ type: "error", message: "The reply was cut off." });
        }
      }
      // Ends the response even if the server never sent "[DONE]".
      close();
    },
    cancel() {
      return reader.cancel();
    },
  });
}
