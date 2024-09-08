import type { BotMessage } from "@/app/lib/validators/bot-message";

/**
 * POST Bot Message
 * @param botMessages Array of messages.
 * @returns An object of the bot message.
 */
export const getBotMessage = async ({
  botMessages,
}: {
  botMessages: BotMessage[];
}): Promise<Response> => {
  const data = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ botMessages }),
  });
  if (!data.ok) throw new Error("Failed to fetch data");

  return data;
};
