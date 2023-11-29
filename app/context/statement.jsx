"use client";
import { createContext, useState } from "react";
import { links } from "@/app/configs/navigation";
import { nanoid } from "nanoid";

const ChatBotDefaultValue = [
  {
    id: nanoid(),
    text: "Omar's AI assistant. How can I help?",
    isUserMessage: false,
  },
];

export const StatementContext = createContext();

export const StatementProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const [color, setColor] = useState(links[page]?.color);
  const [comments, setComments] = useState(null);
  const [botMessages, setBotMessages] = useState(ChatBotDefaultValue);
  const [isBotMsgUpdating, setIsBotMsgUpdating] = useState(false);
  const [userChatBotId, _] = useState(nanoid());

  const addBotMessage = (message) => {
    setBotMessages((prev) => [...prev, message]);
  };

  const removeBotMessage = (id) => {
    setBotMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const updateBotMessage = (id, updateFn) => {
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
    <StatementContext.Provider
      value={{
        page,
        color,
        comments,
        botMessages,
        isBotMsgUpdating,
        userChatBotId,
        setPage,
        setColor,
        setComments,
        setIsBotMsgUpdating,
        addBotMessage,
        removeBotMessage,
        updateBotMessage,
      }}
    >
      {children}
    </StatementContext.Provider>
  );
};
