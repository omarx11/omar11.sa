"use client";
import { createContext, useState } from "react";
import { links } from "@/app/config/navigation";
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
  const [pageNo, setPageNo] = useState(0);
  const [pageColor, setPageColor] = useState(links[pageNo]?.color);
  const [comments, setComments] = useState(null);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [botMessages, setBotMessages] = useState(ChatBotDefaultValue);
  const [isBotMsgUpdating, setIsBotMsgUpdating] = useState(false);
  const [userChatBotId, _] = useState(nanoid());
  const [gameAppId, setGameAppId] = useState(null);
  const [isLoadingGame, setIsLoadingGame] = useState(false);
  const [totalPlayTime, setTotalPlayTime] = useState(0);

  const removeComment = (cid) => {
    setComments((prev) => prev.filter((comment) => comment.cid !== cid));
  };

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
        pageNo,
        pageColor,
        comments,
        isCommentLoading,
        botMessages,
        isBotMsgUpdating,
        userChatBotId,
        gameAppId,
        isLoadingGame,
        totalPlayTime,
        setPageNo,
        setPageColor,
        setComments,
        removeComment,
        setIsCommentLoading,
        setIsBotMsgUpdating,
        addBotMessage,
        removeBotMessage,
        updateBotMessage,
        setGameAppId,
        setIsLoadingGame,
        setTotalPlayTime,
      }}
    >
      {children}
    </StatementContext.Provider>
  );
};
