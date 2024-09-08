import { createContext, useState } from "react";
import { links } from "@/app/config/navigation";
import { nanoid } from "nanoid";
import type { BotMessage } from "@/app/lib/validators/bot-message";
import type { Guestbook } from "@/app/lib/supabase/types/custom";

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
  totalPlayTime: number | null;
  pageColor: string;
  botMessages: BotMessage[];
  chatbot_id: string;
  comments: Guestbook[] | null;
  isCommentLoading: boolean;
  isLoadingGame: boolean;
  setComments: (comments: Guestbook[] | null) => void;
  setPageColor: (color: string) => void;
  setPageNo: (pageNo: number) => void;
  setTotalPlayTime: (time: number) => void;
  setGameAppId: (appId: number | null) => void;
  addBotMessage: (message: BotMessage) => void;
  removeBotMessage: (id: string) => void;
  removeComment: (cid: string) => void;
  addComment: (newComment: Guestbook) => void;
  updateBotMessage: (
    id: string,
    updateFn: (prevText: string) => string
  ) => void;
  setIsCommentLoading: (isUpdating: boolean) => void;
  setIsLoadingGame: (isUpdating: boolean) => void;
}>({
  pageNo: 0,
  totalPlayTime: 0,
  gameAppId: null,
  pageColor: "",
  botMessages: [],
  chatbot_id: nanoid(),
  isCommentLoading: false,
  isLoadingGame: false,
  comments: null,
  setComments: () => {},
  setPageColor: () => {},
  setPageNo: () => {},
  setTotalPlayTime: () => {},
  setGameAppId: () => {},
  addBotMessage: () => {},
  removeBotMessage: () => {},
  removeComment: () => {},
  addComment: () => {},
  updateBotMessage: () => {},
  setIsCommentLoading: () => {},
  setIsLoadingGame: () => {},
});

export function StatementProvider({ children }: { children: React.ReactNode }) {
  const [pageNo, setPageNo] = useState(0);
  const [pageColor, setPageColor] = useState(links[pageNo]?.color || "");
  const [comments, setComments] = useState<Guestbook[] | null>(null);
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false);
  const [botMessages, setBotMessages] = useState(ChatBotDefaultValue);
  const [chatbot_id] = useState<string>(nanoid());
  const [gameAppId, setGameAppId] = useState<number | null>(null);
  const [isLoadingGame, setIsLoadingGame] = useState<boolean>(false);
  const [totalPlayTime, setTotalPlayTime] = useState<number | null>(null);

  const addComment = (newComment: Guestbook) => {
    setComments((prev) => (prev ? [newComment, ...prev] : [newComment]));
  };

  const removeComment = (cid: string) => {
    setComments((prev) =>
      prev ? prev.filter((comment: Guestbook) => comment.cid !== cid) : null
    );
  };

  const addBotMessage = (message: BotMessage) => {
    setBotMessages((prev) => [...prev, message]);
  };

  const removeBotMessage = (id: string) => {
    setBotMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const updateBotMessage = (
    id: string,
    updateFn: (prevText: string) => string
  ) => {
    setBotMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, text: updateFn(message.text) };
        }
        return message;
      })
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
        chatbot_id,
        gameAppId,
        isLoadingGame,
        totalPlayTime,
        setPageNo,
        setPageColor,
        setComments,
        removeComment,
        addComment,
        setIsCommentLoading,
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
}
