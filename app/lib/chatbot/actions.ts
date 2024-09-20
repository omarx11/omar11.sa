import { createClient } from "../supabase/client";
import type { BotMessage } from "../validators/bot-message";

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

/**
 * POST Bot Messages
 * @param botMessages Array of messages.
 * @param chatbot_id Chat uuid
 */
export const saveBotMessage = async (
  { botMessages }: { botMessages: BotMessage[] },
  chatbot_id: string
): Promise<void> => {
  const supabase = createClient();

  if (!chatbot_id) throw new Error("Chatbot ID is required.");

  // if the user have chat_id..
  const userChatId = chatbot_id;

  const serializedChatbox = JSON.stringify(botMessages);

  const bodyInsert = {
    chat_id: userChatId,
    chatbox: serializedChatbox,
  };

  const bodyUpdate = {
    chatbox: serializedChatbox,
  };

  try {
    // check if the user chat_id exist..
    const { data: existingData } = await supabase
      .from("chatbot_omar11")
      .select()
      .eq("chat_id", userChatId)
      .single();

    // user chat is exist.. update his column
    if (existingData) {
      const { error: updateError } = await supabase
        .from("chatbot_omar11")
        .update(bodyUpdate)
        .eq("chat_id", userChatId);

      if (updateError) {
        throw new Error(`Error updating user chatbot: ${updateError}`);
      }
    } else {
      // user chat not exist.. insert new column
      const { error: insertError } = await supabase
        .from("chatbot_omar11")
        .insert(bodyInsert);

      if (insertError) {
        throw new Error(`Error updating user chatbot: ${insertError}`);
      }
    }
  } catch (error) {
    throw new Error(`Error updating user chatbot: ${error}`);
  }
};
