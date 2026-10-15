"use client";

import { nanoid } from "nanoid";
import { createContext, useState } from "react";

import type { BotMessage } from "@/app/lib/validators/bot-message";

const ChatBotDefaultValue: BotMessage[] = [
  {
    id: nanoid(),
    text: "Omar's AI assistant. How can I help?",
    isUserMessage: false,
  },
];

export const ChatContext = createContext<{
  botMessages: BotMessage[];
  chatbot_id: string;
  addBotMessage: (message: BotMessage) => void;
  removeBotMessage: (id: string) => void;
  updateBotMessage: (
    id: string,
    updateFn: (prevText: string) => string,
  ) => void;
}>({
  botMessages: [],
  chatbot_id: nanoid(),
  addBotMessage: () => {},
  removeBotMessage: () => {},
  updateBotMessage: () => {},
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [botMessages, setBotMessages] = useState(ChatBotDefaultValue);
  const [chatbot_id] = useState<string>(nanoid());

  const addBotMessage = (message: BotMessage) => {
    setBotMessages((prev) => [...prev, message]);
  };

  const removeBotMessage = (id: string) => {
    setBotMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const updateBotMessage = (
    id: string,
    updateFn: (prevText: string) => string,
  ) => {
    setBotMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, text: updateFn(message.text) };
        }
        return message;
      }),
    );
  };

  return (
    <ChatContext.Provider
      value={{
        botMessages,
        chatbot_id,
        addBotMessage,
        removeBotMessage,
        updateBotMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
