import { chatbotPrompt } from "@/app/config/chatbot-prompt";
import { OpenAIStream } from "@/app/lib/openai-stream";
import { MessageArraySchema } from "@/app/lib/validators/message";

export async function POST(req) {
  const { botMessages } = await req.json();
  const prompt = await chatbotPrompt();

  const parsedMessages = MessageArraySchema.parse(botMessages);

  const outboundMessages = parsedMessages.map((message) => {
    return {
      role: message.isUserMessage ? "user" : "system",
      content: message.text,
    };
  });

  outboundMessages.unshift({
    role: "system",
    content: prompt,
  });

  const payload = {
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
