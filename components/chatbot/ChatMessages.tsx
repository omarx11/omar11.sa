"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { assistant } from "@/config/meta";
import { cn } from "@/lib/utils";

import { ArrowDownIcon, CheckIcon, CopyIcon, RetryIcon } from "./ChatIcons";
import ChatMarkdown from "./ChatMarkdown";
import type { ChatMessage } from "./useChat";

/** How close to the bottom (px) still counts as "following" the chat. */
const STICK_THRESHOLD = 48;

export function ChatMessages({
  messages,
  busy,
  open,
  onRetry,
  onNavigate,
}: {
  messages: ChatMessage[];
  busy: boolean;
  open: boolean;
  onRetry: (id: string) => void;
  onNavigate: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [following, setFollowing] = useState(true);
  const followingRef = useRef(true);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < STICK_THRESHOLD;
    followingRef.current = atBottom;
    setFollowing(atBottom);
  };

  // New words keep the latest message in view, unless the visitor scrolled
  // up to read something: then the "latest" button appears instead.
  // Sending a message always brings the conversation back to the bottom.
  const lastUserId = messages.findLast(
    (message) => message.role === "user",
  )?.id;
  const lastUserIdRef = useRef(lastUserId);
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on every message change.
  useLayoutEffect(() => {
    if (lastUserId !== lastUserIdRef.current) {
      lastUserIdRef.current = lastUserId;
      followingRef.current = true;
      setFollowing(true);
    }
    if (followingRef.current) scrollToBottom(scrollRef.current);
  }, [messages]);

  // Opening the chat shows the latest messages.
  useEffect(() => {
    if (!open) return;
    followingRef.current = true;
    setFollowing(true);
    scrollToBottom(scrollRef.current);
  }, [open]);

  const last = messages.at(-1);

  return (
    <div className="relative min-h-0 flex-1">
      <div
        className="no-scrollbar h-full overflow-y-auto overscroll-contain px-3 py-4 sm:px-4"
        onScroll={onScroll}
        ref={scrollRef}
      >
        <ol
          aria-busy={busy}
          aria-label="Messages"
          aria-live="polite"
          className="flex flex-col gap-3"
        >
          {messages.map((message) =>
            message.role === "user" ? (
              <UserMessage key={message.id} message={message} />
            ) : (
              <AssistantMessage
                key={message.id}
                message={message}
                onNavigate={onNavigate}
                onRetry={busy ? undefined : () => onRetry(message.id)}
              />
            ),
          )}
        </ol>
      </div>

      <button
        aria-label="Scroll to the latest message"
        className={cn(
          "absolute bottom-3 left-1/2 grid size-8 -translate-x-1/2 place-items-center rounded-full bg-neutral-800 text-neutral-200 shadow-lg ring-1 shadow-black/50 ring-neutral-700 transition-all hover:bg-neutral-700",
          following
            ? "pointer-events-none translate-y-2 opacity-0"
            : "opacity-100",
        )}
        onClick={() => scrollToBottom(scrollRef.current, "smooth")}
        tabIndex={following ? -1 : 0}
        type="button"
      >
        <ArrowDownIcon />
        {!following &&
          last?.role === "assistant" &&
          last.state === "streaming" && (
            <span className="absolute -top-0.5 -right-0.5 size-2.5 animate-pulse rounded-full bg-emerald-500" />
          )}
      </button>
    </div>
  );
}

function scrollToBottom(
  el: HTMLElement | null,
  behavior: ScrollBehavior = "auto",
) {
  el?.scrollTo({ top: el.scrollHeight, behavior });
}

const time = (ms: number) =>
  new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

function UserMessage({ message }: { message: ChatMessage }) {
  return (
    <li className="flex animate-[chat-in_200ms_ease-out_both] justify-end">
      <p
        className="max-w-[85%] rounded-2xl rounded-br-md bg-emerald-700 px-3.5 py-2 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap text-white"
        dir="auto"
        title={time(message.createdAt)}
      >
        {message.text}
      </p>
    </li>
  );
}

function AssistantMessage({
  message,
  onRetry,
  onNavigate,
}: {
  message: ChatMessage;
  onRetry?: () => void;
  onNavigate: () => void;
}) {
  const { state, text } = message;

  return (
    <li className="group flex animate-[chat-in_200ms_ease-out_both] items-start gap-2">
      <span
        aria-hidden="true"
        className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-neutral-900 text-sm ring-1 ring-neutral-800 select-none"
      >
        👾
      </span>
      <div className="max-w-[85%] min-w-0">
        <div
          className={cn(
            "rounded-2xl rounded-tl-md px-3.5 py-2 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap text-neutral-100 ring-1",
            state === "error"
              ? "bg-rose-950/30 ring-rose-900/50"
              : "bg-neutral-900 ring-neutral-800/70",
          )}
          dir="auto"
          title={time(message.createdAt)}
        >
          {state === "waiting" ? (
            <Waiting progress={message.progress} />
          ) : (
            <>
              {text && <ChatMarkdown onNavigate={onNavigate} text={text} />}
              {state === "streaming" && (
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-0.75 animate-[chat-caret_1s_steps(1)_infinite] bg-emerald-400"
                />
              )}
              {state === "error" && (
                <span className={cn("block text-rose-300", text && "mt-1.5")}>
                  {message.error ?? "Something went wrong."}
                </span>
              )}
            </>
          )}
        </div>
        <MessageMeta message={message} onRetry={onRetry} />
      </div>
    </li>
  );
}

/** Typing dots, or how much of the prompt is read after a cold start. */
function Waiting({ progress }: { progress?: ChatMessage["progress"] }) {
  // A warm cache reads only the newest message: too quick for a bar.
  const reading = progress && progress.total - progress.processed > 64;
  if (!reading) {
    return (
      <span
        aria-label={`${assistant.name} is typing`}
        className="flex h-5 items-center gap-1"
        role="status"
      >
        {[0, 1, 2].map((dot) => (
          <span
            className="size-1.5 animate-[chat-dot_1.2s_ease-in-out_infinite] rounded-full bg-neutral-400"
            key={dot}
            style={{ animationDelay: `${dot * 150}ms` }}
          />
        ))}
      </span>
    );
  }
  const percent = Math.round((progress.processed / progress.total) * 100);
  return (
    <span className="block w-44 py-0.5" role="status">
      <span className="flex justify-between font-mono text-[11px] text-neutral-400">
        <span>Booting my brain…</span>
        <span>{percent}%</span>
      </span>
      <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-neutral-800">
        <span
          className="block h-full rounded-full bg-emerald-500 transition-[width] duration-500"
          style={{ width: `${percent}%` }}
        />
      </span>
    </span>
  );
}

/** Speed and size of a finished reply, plus copy and retry. */
function MessageMeta({
  message,
  onRetry,
}: {
  message: ChatMessage;
  onRetry?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const { state, stats, text } = message;
  if (state === "waiting" || state === "streaming") return null;

  const copy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  };

  const details = [
    stats && `${stats.tokensPerSecond.toFixed(1)} tok/s`,
    stats && `${stats.outputTokens} tokens`,
    stats && `${((stats.promptMs + stats.generationMs) / 1000).toFixed(1)}s`,
    state === "stopped" && "stopped",
    stats?.truncated && "cut off",
  ].filter(Boolean);

  return (
    <div className="mt-1 flex min-h-5 items-center gap-1 pl-1 font-mono text-[10px] text-neutral-600 select-none">
      {details.length > 0 && <span>{details.join(" · ")}</span>}
      {text && (stats || state === "stopped") && (
        <MetaButton label={copied ? "Copied" : "Copy reply"} onClick={copy}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </MetaButton>
      )}
      {(state === "error" || state === "stopped") && onRetry && (
        <MetaButton label="Try again" onClick={onRetry} visible>
          <RetryIcon />
          <span>retry</span>
        </MetaButton>
      )}
    </div>
  );
}

function MetaButton({
  label,
  onClick,
  visible = false,
  children,
}: {
  label: string;
  onClick: () => void;
  visible?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      className={cn(
        "flex items-center gap-1 rounded px-1 py-0.5 text-neutral-500 transition hover:bg-neutral-800 hover:text-neutral-200 focus-visible:opacity-100",
        // Shown on hover where there's a mouse; always on touch screens.
        !visible &&
          "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100",
      )}
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}
