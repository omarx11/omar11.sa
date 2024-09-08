"use server";

import { createClient } from "./supabase/server";
import { BotMessage } from "./validators/bot-message";

/**
 * GET Github Repository
 * @returns An array of comments.
 */
export const getGithubRepos = async () => {
  const response = await fetch(
    "https://api.github.com/users/omarx11/repos?direction=desc",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch data");
  const data = await response.json();

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
