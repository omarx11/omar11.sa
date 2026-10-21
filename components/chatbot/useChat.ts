"use client";

import { nanoid } from "nanoid";
import { useCallback, useEffect, useRef, useState } from "react";

import { assistant } from "@/config/meta";
import { contextWindow, type ReplyStats } from "@/lib/chatbot/events";
import type { BotMessage } from "@/lib/chatbot/message-schema";
import { saveConversation } from "@/lib/chatbot/save-conversation";
import { streamReply } from "@/lib/chatbot/stream-reply";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: number;
  /** Assistant replies only. */
  state?: "waiting" | "streaming" | "done" | "stopped" | "error";
  error?: string;
  /** While the server reads the prompt, before the first word. */
  progress?: { processed: number; total: number };
  stats?: ReplyStats;
};

const STORAGE_KEY = "glitch-chat";

const greeting = (): ChatMessage => ({
  id: nanoid(),
  role: "assistant",
  text: assistant.greeting,
  createdAt: Date.now(),
  state: "done",
});

// Only finished turns are sent back as context; failed replies are left out.
const isContext = (message: ChatMessage) =>
  message.role === "user" ||
  ((message.state === "done" || message.state === "stopped") &&
    message.text.length > 0);

const toWire = (messages: ChatMessage[]): BotMessage[] =>
  messages.map((message) => ({
    id: message.id,
    text: message.text,
    isUserMessage: message.role === "user",
  }));

type Saved = { chatId: string; messages: ChatMessage[] };

/** The chat survives reloads and page changes (per browser, best effort). */
function restore(): Saved | null {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (!saved?.chatId || !Array.isArray(saved.messages)) return null;
    return {
      chatId: saved.chatId,
      messages: (saved.messages as ChatMessage[]).map((message, i) =>
        // The greeting always opens the chat; show the current one from
        // config, not the text saved when the chat started.
        i === 0 && message.role === "assistant"
          ? { ...message, text: assistant.greeting }
          : // A reply that was streaming when the page closed can't be resumed.
            message.state === "waiting" || message.state === "streaming"
            ? { ...message, state: message.text ? "stopped" : "error" }
            : message,
      ),
    };
  } catch {
    return null;
  }
}

/** The conversation: messages, sending, stopping, retrying, starting over. */
export function useChat({ onReply }: { onReply?: () => void } = {}) {
  const [initial] = useState(restore);
  const [chatId, setChatId] = useState(() => initial?.chatId ?? nanoid());
  const [messages, setMessages] = useState<ChatMessage[]>(
    () => initial?.messages ?? [greeting()],
  );
  const abortRef = useRef<AbortController | null>(null);
  const onReplyRef = useRef(onReply);
  onReplyRef.current = onReply;

  const busy = messages.some(
    (message) => message.state === "waiting" || message.state === "streaming",
  );

  // Saved once each reply has finished (not on every streamed word).
  useEffect(() => {
    if (busy) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          chatId,
          messages: messages.map(({ progress, ...message }) => message),
        }),
      );
    } catch {
      // Storage full or blocked: the chat still works, it just won't persist.
    }
    if (messages.length > 1) {
      saveConversation(chatId, toWire(messages).slice(-200)).catch((error) => {
        console.error("Error saving chatbot conversation:", error);
      });
    }
  }, [busy, chatId, messages]);

  const patch = useCallback(
    (id: string, update: (message: ChatMessage) => ChatMessage) =>
      setMessages((prev) =>
        prev.map((message) => (message.id === id ? update(message) : message)),
      ),
    [],
  );

  const runReply = useCallback(
    async (context: ChatMessage[], replyId: string) => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        await streamReply(
          toWire(contextWindow(context.filter(isContext))),
          controller.signal,
          (event) => {
            if (event.type === "error") throw new Error(event.message);
            patch(replyId, (message) => {
              switch (event.type) {
                case "progress":
                  return { ...message, progress: event };
                case "text":
                  return {
                    ...message,
                    state: "streaming",
                    progress: undefined,
                    text: message.text + event.text,
                  };
                case "stats":
                  return { ...message, stats: event.stats };
              }
            });
          },
        );
        patch(replyId, (message) =>
          message.text
            ? { ...message, state: "done" }
            : {
                ...message,
                state: "error",
                error: `${assistant.name} had nothing to say. Try again?`,
              },
        );
      } catch (error) {
        patch(replyId, (message) =>
          controller.signal.aborted
            ? {
                ...message,
                state: message.text ? "stopped" : "error",
                error: message.text ? undefined : "Stopped.",
              }
            : {
                ...message,
                state: "error",
                progress: undefined,
                error:
                  error instanceof Error && !(error instanceof SyntaxError)
                    ? error.message
                    : "Something went wrong.",
              },
        );
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        onReplyRef.current?.();
      }
    },
    [patch],
  );

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    const now = Date.now();
    const user: ChatMessage = {
      id: nanoid(),
      role: "user",
      text,
      createdAt: now,
    };
    const reply: ChatMessage = {
      id: nanoid(),
      role: "assistant",
      text: "",
      createdAt: now,
      state: "waiting",
    };
    setMessages((prev) => [...prev, user, reply]);
    void runReply([...messages, user], reply.id);
  };

  /** Asks again for a failed or stopped reply, with the same context. */
  const retry = (replyId: string) => {
    if (busy) return;
    const index = messages.findIndex((message) => message.id === replyId);
    if (index < 0) return;
    patch(replyId, (message) => ({
      ...message,
      text: "",
      state: "waiting",
      error: undefined,
      stats: undefined,
      createdAt: Date.now(),
    }));
    void runReply(messages.slice(0, index), replyId);
  };

  const stop = () => abortRef.current?.abort();

  const reset = () => {
    abortRef.current?.abort();
    setChatId(nanoid());
    setMessages([greeting()]);
  };

  return { chatId, messages, busy, send, retry, stop, reset };
}
