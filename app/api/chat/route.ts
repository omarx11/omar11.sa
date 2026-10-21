import { z } from "zod";

import {
  type ChatCompletionPayload,
  type ChatMessage,
  chatCompletionStream,
} from "@/lib/chatbot/ai-stream";
import { chatbotPrompt } from "@/lib/chatbot/chatbot-prompt";
import { assistantEnabled, DISABLED_MESSAGE } from "@/lib/chatbot/enabled";
import { CONTEXT_MESSAGES, contextWindow } from "@/lib/chatbot/events";
import { MessageSchema } from "@/lib/chatbot/message-schema";

// Bounds what a visitor can send (and what reaches the model, which runs on a
// small home server).
const RequestSchema = z.object({
  botMessages: z
    .array(MessageSchema.extend({ text: z.string().max(1000) }))
    .min(1)
    .max(CONTEXT_MESSAGES),
});

export async function POST(req: Request) {
  const parsed = RequestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid chat request." }, { status: 400 });
  }
  if (!assistantEnabled()) {
    return Response.json({ error: DISABLED_MESSAGE }, { status: 503 });
  }
  if (!process.env.AI_BASE_URL || !process.env.AI_API_KEY) {
    return Response.json(
      { error: "The assistant is not configured." },
      { status: 503 },
    );
  }

  const messages: ChatMessage[] = [
    { role: "system", content: await chatbotPrompt() },
    ...contextWindow(parsed.data.botMessages).map(
      (message): ChatMessage => ({
        role: message.isUserMessage ? "user" : "assistant",
        content: message.text,
      }),
    ),
  ];

  // Sampling is left to the model server's defaults, which are tuned for the
  // model it runs (see docs/ai-assistant-local-llm.md).
  const payload: ChatCompletionPayload = {
    model: process.env.AI_MODEL ?? "assistant",
    messages,
    // Replies are meant to be ~15 words; this also stops runaway poems.
    max_tokens: 100,
    stream: true,
  };

  try {
    return new Response(await chatCompletionStream(payload, req.signal), {
      headers: {
        // One `ChatEvent` per line (lib/chatbot/events.ts).
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Chat completion failed:", error);
    return Response.json(
      { error: "The assistant is unavailable right now." },
      { status: 502 },
    );
  }
}
