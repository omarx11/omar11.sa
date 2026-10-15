import { createParser, type EventSourceMessage } from "eventsource-parser";

export interface ChatGPTMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenAIStreamPayload {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
}

type CompletionChunk = { choices?: { delta?: { content?: string } }[] };

/** Streams an OpenAI chat completion as plain UTF-8 text. */
export async function OpenAIStream(
  payload: OpenAIStreamPayload,
): Promise<ReadableStream<Uint8Array>> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok || !res.body) {
    throw new Error(
      `OpenAI API returned an error: ${res.status} - ${await res.text()}`,
    );
  }

  const body = res.body;
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      let closed = false;
      let chunks = 0;
      const close = () => {
        if (!closed) {
          closed = true;
          controller.close();
        }
      };

      const parser = createParser({
        onEvent(event: EventSourceMessage) {
          if (closed) return;
          if (event.data === "[DONE]") return close();
          try {
            const json = JSON.parse(event.data) as CompletionChunk;
            const text = json.choices?.[0]?.delta?.content ?? "";
            // Skip the leading newlines some completions start with.
            if (chunks < 2 && text.includes("\n")) return;
            controller.enqueue(encoder.encode(text));
            chunks++;
          } catch (error) {
            closed = true;
            controller.error(error);
          }
        },
      });

      // OpenAI's SSE events can be split across network chunks; the parser
      // reassembles them. `stream: true` keeps multi-byte characters (e.g.
      // Arabic, emoji) that straddle chunks intact.
      const reader = body.getReader();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        parser.feed(decoder.decode(value, { stream: true }));
      }
      // Ends the response even if OpenAI never sent "[DONE]".
      close();
    },
  });
}
