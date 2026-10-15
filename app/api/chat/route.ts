import { z } from "zod";

import { chatbotPrompt } from "@/app/lib/chatbot/chatbot-prompt";
import {
  type ChatGPTMessage,
  OpenAIStream,
  type OpenAIStreamPayload,
} from "@/app/lib/openai-stream";
import { MessageSchema } from "@/app/lib/validators/bot-message";

// Bounds what a visitor can send (and what reaches OpenAI, which is billed).
const RequestSchema = z.object({
  botMessages: z
    .array(MessageSchema.extend({ text: z.string().max(1000) }))
    .min(1)
    .max(50),
});
/** Only the recent turns are sent as context. */
const CONTEXT_MESSAGES = 12;

export async function POST(req: Request) {
  const parsed = RequestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid chat request." }, { status: 400 });
  }
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "The assistant is not configured." },
      { status: 503 },
    );
  }

  const messages: ChatGPTMessage[] = [
    { role: "system", content: await chatbotPrompt() },
    ...parsed.data.botMessages.slice(-CONTEXT_MESSAGES).map(
      (message): ChatGPTMessage => ({
        role: message.isUserMessage ? "user" : "assistant",
        content: message.text,
      }),
    ),
  ];

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };

  try {
    return new Response(await OpenAIStream(payload), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Chat completion failed:", error);
    return Response.json(
      { error: "The assistant is unavailable right now." },
      { status: 502 },
    );
  }
}
