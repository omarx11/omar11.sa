import { nanoid } from "nanoid";
import { createContext, useState } from "react";

import { links } from "@/app/config/navigation";
import type { BotMessage } from "@/app/lib/validators/bot-message";

const ChatBotDefaultValue: BotMessage[] = [
  {
    id: nanoid(),
    text: "Omar's AI assistant. How can I help?",
    isUserMessage: false,
  },
];

export const StatementContext = createContext<{
  pageNo: number;
  gameAppId: number | null;
  gameAppName: string | null;
  pageColor: string;
  botMessages: BotMessage[];
  chatbot_id: string;
  isLoadingGame: boolean;
  setPageColor: (color: string) => void;
  setPageNo: (pageNo: number) => void;
  setGameAppId: (appId: number | null) => void;
  setGameAppName: (appId: string | null) => void;
  addBotMessage: (message: BotMessage) => void;
  removeBotMessage: (id: string) => void;
  updateBotMessage: (
    id: string,
    updateFn: (prevText: string) => string,
  ) => void;
  setIsLoadingGame: (isUpdating: boolean) => void;
}>({
  pageNo: 0,
  gameAppId: null,
  gameAppName: null,
  pageColor: "",
  botMessages: [],
  chatbot_id: nanoid(),
  isLoadingGame: false,
  setPageColor: () => {},
  setPageNo: () => {},
  setGameAppId: () => {},
  setGameAppName: () => {},
  addBotMessage: () => {},
  removeBotMessage: () => {},
  updateBotMessage: () => {},
  setIsLoadingGame: () => {},
});

export function StatementProvider({ children }: { children: React.ReactNode }) {
  const [pageNo, setPageNo] = useState(0);
  const [pageColor, setPageColor] = useState(links[pageNo]?.color || "");
  const [botMessages, setBotMessages] = useState(ChatBotDefaultValue);
  const [chatbot_id] = useState<string>(nanoid());
  const [gameAppId, setGameAppId] = useState<number | null>(null);
  const [gameAppName, setGameAppName] = useState<string | null>(null);
  const [isLoadingGame, setIsLoadingGame] = useState<boolean>(false);

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
    <StatementContext.Provider
      value={{
        pageNo,
        pageColor,
        botMessages,
        chatbot_id,
        gameAppId,
        gameAppName,
        isLoadingGame,
        setPageNo,
        setPageColor,
        addBotMessage,
        removeBotMessage,
        updateBotMessage,
        setGameAppId,
        setGameAppName,
        setIsLoadingGame,
      }}
    >
      {children}
    </StatementContext.Provider>
  );
}
