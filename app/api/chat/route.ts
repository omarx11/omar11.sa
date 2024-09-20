import type { NextRequest } from "next/server";
import { BotMessageArraySchema } from "@/app/lib/validators/bot-message";
import { chatbotPrompt } from "@/app/lib/chatbot/chatbot-prompt";
import {
  OpenAIStream,
  type ChatGPTMessage,
  type OpenAIStreamPayload,
} from "@/app/lib/openai-stream";

export async function POST(req: NextRequest) {
  const { botMessages } = await req.json();
  const prompt = await chatbotPrompt();

  const parsedMessages = BotMessageArraySchema.parse(botMessages);

  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
    return {
      role: message.isUserMessage ? "user" : "system",
      content: message.text,
    };
  });

  outboundMessages.unshift({
    role: "system",
    content: prompt,
  });

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
