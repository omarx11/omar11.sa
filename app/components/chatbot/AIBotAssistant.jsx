"use client";
import { StatementContext } from "@/app/context/statement";
import * as Popover from "@radix-ui/react-popover";
import MarkdownLite from "./MarkdownLite";
import { useContext, useEffect } from "react";
import { cn } from "@/app/lib/utils";
import ChatBotInput from "./ChatBotInput";

export default function AIBotAssistant() {
  const { botMessages, userChatBotId } = useContext(StatementContext);
  const inverseMessages = [...botMessages].reverse();

  useEffect(() => {
    const chatBoxEl = document.getElementById("chatBox");
    if (chatBoxEl) {
      if (
        chatBoxEl.scrollTop + chatBoxEl.clientHeight >=
        chatBoxEl.scrollHeight - 50
      )
        chatBoxEl.scrollTop = chatBoxEl.scrollHeight;
    }
  }, [botMessages]);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button aria-label="AI Assistant">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 2048 2048"
            className="fill-neutral-600 hover:fill-neutral-500 data-[state=open]:fill-emerald-600"
          >
            <path d="M768 1024H640V896h128zm512 0h-128V896h128zm512-128v256h-128v320q0 40-15 75t-41 61t-61 41t-75 15h-264l-440 376v-376H448q-40 0-75-15t-61-41t-41-61t-15-75v-320H128V896h128V704q0-40 15-75t41-61t61-41t75-15h448V303q-29-17-46-47t-18-64q0-27 10-50t27-40t41-28t50-10q27 0 50 10t40 27t28 41t10 50q0 34-17 64t-47 47v209h448q40 0 75 15t61 41t41 61t15 75v192zm-256-192q0-26-19-45t-45-19H448q-26 0-45 19t-19 45v768q0 26 19 45t45 19h448v226l264-226h312q26 0 45-19t19-45zm-851 462q55 55 126 84t149 30q78 0 149-29t126-85l90 91q-73 73-167 112t-198 39q-103 0-197-39t-168-112z" />
          </svg>
        </button>
      </Popover.Trigger>
      <Popover.Content
        id="chatBox"
        className="mb-4 flex h-[30rem] w-full flex-col overflow-y-auto rounded-sm bg-neutral-900 px-1 pb-1 pt-2 ring-4 ring-neutral-800 sm:mb-0 sm:w-96"
        side="left"
        align="start"
        sideOffset={8}
      >
        <div className="flex flex-1 flex-col-reverse gap-3">
          <div className="flex-1 flex-grow" />
          {inverseMessages.map((message) => {
            return (
              <div
                key={message.id}
                className={cn("flex items-end", {
                  "justify-end": message.isUserMessage,
                })}
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
            );
          })}
          <p className="border-b-2 border-neutral-800 pb-1 text-center text-sm text-neutral-400 duration-300">
            Id: {userChatBotId ?? "anonymous"}
          </p>
          <Popover.Close className="absolute right-2 top-1 inline-flex items-center justify-center rounded-full p-1 outline-none hover:bg-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 256 256"
            >
              <path
                fill="#d4d4d4"
                d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
              />
            </svg>
          </Popover.Close>
        </div>
        <ChatBotInput />
      </Popover.Content>
    </Popover.Root>
  );
}
