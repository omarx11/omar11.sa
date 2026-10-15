"use client";

import { type ComponentType, useState } from "react";

import { ChatIcon } from "./ChatIcon";

type ChatPopoverProps = { defaultOpen: boolean };

// Starts loading the chat (popover, messages, input) once, on first intent.
let chatModule: Promise<ComponentType<ChatPopoverProps>> | undefined;
const loadChat = () => {
  chatModule ??= import("./ChatPopover").then((m) => m.default);
  return chatModule;
};

/**
 * A lightweight stand-in button. The full chat loads on first hover, focus or
 * tap and then takes over, so pages don't ship the chat code up front.
 */
export default function AIBotAssistant() {
  const [Chat, setChat] = useState<ComponentType<ChatPopoverProps> | null>(
    null,
  );

  if (Chat) return <Chat defaultOpen />;

  const open = () => {
    loadChat().then((component) => setChat(() => component));
  };

  return (
    <button
      aria-label="AI Assistant"
      className="border-0"
      onClick={open}
      onFocus={() => loadChat()}
      onMouseEnter={open}
      type="button"
    >
      <ChatIcon />
    </button>
  );
}
