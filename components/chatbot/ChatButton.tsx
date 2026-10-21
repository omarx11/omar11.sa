"use client";

import { type ComponentType, useRef, useState } from "react";

import { ChatBot } from "@/components/icons/ChatBot";

import type { ChatPanelProps } from "./ChatPanel";

// Starts loading the chat window once, on first intent.
let chatModule: Promise<ComponentType<ChatPanelProps>> | undefined;
const loadChat = () => {
  chatModule ??= import("./ChatPanel").then((m) => m.default);
  return chatModule;
};

/**
 * The chat button. The chat window's code loads on first hover, focus or tap,
 * so pages don't ship it up front; it opens on click. When the assistant is
 * switched off (`AI_ASSISTANT_ENABLED`), the window opens with a notice instead.
 */
export default function ChatButton({ enabled }: { enabled: boolean }) {
  const [Panel, setPanel] = useState<ComponentType<ChatPanelProps> | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(open);
  openRef.current = open;

  const preload = () => {
    loadChat().then((component) => setPanel(() => component));
  };

  const toggle = () => {
    preload();
    setOpen((wasOpen) => !wasOpen);
    setUnread(false);
  };

  const close = (reason?: "dismiss") => {
    setOpen(false);
    // After Esc or ✕, keyboard users land back on the button; after a click
    // elsewhere, focus stays on what was clicked.
    if (reason !== "dismiss")
      triggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={
          !enabled
            ? "AI Assistant (disabled)"
            : unread
              ? "AI Assistant (new reply)"
              : "AI Assistant"
        }
        className="group relative border-0"
        data-state={open ? "open" : "closed"}
        onClick={toggle}
        onFocus={preload}
        onPointerEnter={preload}
        ref={triggerRef}
        type="button"
      >
        <ChatBot />
        {unread && (
          <span className="absolute top-0.5 right-0.5 size-2.5 animate-pulse rounded-full bg-emerald-500 ring-2 ring-black" />
        )}
      </button>
      {Panel && (
        <Panel
          anchorRef={triggerRef}
          disabled={!enabled}
          onClose={close}
          onReply={() => !openRef.current && setUnread(true)}
          open={open}
        />
      )}
    </>
  );
}
