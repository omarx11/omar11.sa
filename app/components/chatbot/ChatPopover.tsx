"use client";

import * as Popover from "@radix-ui/react-popover";
import { QueryClientProvider } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

import { getQueryClient } from "@/app/lib/query-client";
import { cn } from "@/app/lib/utils";

import ChatBotInput from "./ChatBotInput";
import { ChatIcon } from "./ChatIcon";
import { ChatContext, ChatProvider } from "./chat-context";
import MarkdownLite from "./MarkdownLite";

// Loaded on demand by AIBotAssistant, so none of this ships until the chat is used.
export default function ChatPopover({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <ChatProvider>
        <Chat defaultOpen={defaultOpen} />
      </ChatProvider>
    </QueryClientProvider>
  );
}

function Chat({ defaultOpen }: { defaultOpen: boolean }) {
  const [hovored, setHovored] = useState<boolean>(defaultOpen);
  const { botMessages, chatbot_id } = useContext(ChatContext);
  const inverseMessages = [...botMessages].reverse();

  useEffect(() => {
    const chatBoxEl = document.getElementById("chatBox");
    if (chatBoxEl) {
      const isScrolledToBottom =
        chatBoxEl.scrollTop + chatBoxEl.clientHeight >=
        chatBoxEl.scrollHeight - 50;
      if (isScrolledToBottom) {
        chatBoxEl.scrollTop = chatBoxEl.scrollHeight;
      }
    }
  }, []);

  return (
    <Popover.Root
      onOpenChange={(open) => !open && setHovored(false)}
      open={!!hovored}
    >
      <Popover.Trigger asChild>
        <button
          aria-label="AI Assistant"
          className="border-0"
          onClick={() => setHovored(true)}
          onMouseEnter={() => setHovored(true)}
          type="button"
        >
          <ChatIcon />
        </button>
      </Popover.Trigger>
      <Popover.Content
        align="start"
        className="mb-4 flex h-[30rem] w-full origin-[var(--radix-popover-content-transform-origin)] scale-in flex-col overflow-y-auto rounded-xs bg-neutral-900 px-1 pt-2 pb-1 outline-0 ring-4 ring-neutral-800 sm:mb-0 sm:w-96"
        id="chatBox"
        side="left"
        sideOffset={8}
      >
        <div className="flex flex-1 flex-col-reverse gap-3">
          <div className="flex-1" />
          {inverseMessages.map((message) => (
            <div
              className={cn("flex items-end", {
                "justify-end": message.isUserMessage,
              })}
              key={message.id}
            >
              <div
                className={cn(
                  "flex max-w-xs flex-col space-y-1 overflow-x-hidden text-sm",
                  {
                    "order-1 items-end": message.isUserMessage,
                    "order-2 items-start": !message.isUserMessage,
                  },
                )}
              >
                <p
                  className={cn("rounded-md px-2 py-1.5", {
                    "bg-sky-600 text-white": message.isUserMessage,
                    "bg-neutral-100 text-black": !message.isUserMessage,
                  })}
                >
                  <MarkdownLite text={message.text} />
                </p>
              </div>
            </div>
          ))}
          <p className="border-neutral-800 border-b-2 pb-1 text-center text-neutral-400 text-sm duration-300">
            Id: {chatbot_id ?? "000110111"}
          </p>
          <Popover.Close className="absolute top-1 right-2 inline-flex items-center justify-center rounded-full p-1 outline-hidden hover:bg-neutral-800">
            <svg
              aria-label="Close icon"
              height="18"
              viewBox="0 0 256 256"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
                fill="#d4d4d4"
              />
            </svg>
          </Popover.Close>
        </div>
        <ChatBotInput />
      </Popover.Content>
    </Popover.Root>
  );
}
