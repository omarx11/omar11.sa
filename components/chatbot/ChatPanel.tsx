"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { assistant } from "@/config/meta";
import type { AssistantStatus, ReplyStats } from "@/lib/chatbot/events";
import { cn } from "@/lib/utils";

import { ChatComposer } from "./ChatComposer";
import { CloseIcon, NewChatIcon, StatsIcon } from "./ChatIcons";
import { ChatMessages } from "./ChatMessages";
import { useAssistantStatus } from "./useAssistantStatus";
import { useChat } from "./useChat";
import { usePanelPosition } from "./usePanelPosition";

export type ChatPanelProps = {
  open: boolean;
  /** "dismiss": an outside click or a page scroll (focus stays where it is). */
  onClose: (reason?: "dismiss") => void;
  /** A reply finished (used for the unread dot while the chat is closed). */
  onReply: () => void;
  anchorRef: RefObject<HTMLElement | null>;
  /** The assistant is switched off (`AI_ASSISTANT_ENABLED`): show a notice. */
  disabled?: boolean;
};

const isPhone = () => window.matchMedia("(max-width: 639.98px)").matches;

/**
 * The chat window: full screen on phones, a panel beside the trigger on
 * larger screens. Loaded on demand by ChatButton and kept mounted once
 * opened, so a reply keeps streaming while it's closed.
 */
export default function ChatPanel({
  open,
  onClose,
  onReply,
  anchorRef,
  disabled = false,
}: ChatPanelProps) {
  const chat = useChat({ onReply });
  // Nothing to poll when the assistant is switched off.
  const status = useAssistantStatus(open && !disabled, chat.busy);
  const position = usePanelPosition(anchorRef, open);
  const [showDetails, setShowDetails] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Focus the message box on open where there's a mouse; on phones that
  // would pop the keyboard over the conversation.
  useEffect(() => {
    if (open && window.matchMedia("(pointer: fine)").matches) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  // Esc closes it wherever focus is. It's also dismissed by a click outside
  // it (the trigger toggles it itself) or by scrolling the page on larger
  // screens. Phones are excluded from the scroll
  // rule: the chat is full screen there, and the keyboard opening scrolls.
  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return;
      onCloseRef.current("dismiss");
    };
    const onScroll = () => {
      if (!isPhone() && Math.abs(window.scrollY - startY) > 40) {
        onCloseRef.current("dismiss");
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open, anchorRef]);

  const lastStats = chat.messages.findLast((message) => message.stats)?.stats;

  return createPortal(
    <section
      aria-label={`Chat with ${assistant.name}`}
      className={cn(
        "chat-panel fixed z-50 flex flex-col overflow-hidden bg-neutral-950 text-left",
        // Phones: the whole visual viewport (above the keyboard).
        "inset-x-0 top-(--vv-top,0px) h-(--vv-height,100dvh)",
        // Larger screens: a panel beside the trigger.
        "sm:inset-x-auto sm:top-(--chat-top) sm:right-(--chat-right) sm:h-(--chat-height) sm:w-[380px] sm:rounded-2xl sm:shadow-2xl sm:ring-1 sm:shadow-black/60 sm:ring-neutral-800",
        "origin-bottom transition-[opacity,translate,scale,visibility] duration-200 ease-out motion-reduce:transition-none sm:origin-top-right",
        open
          ? "visible opacity-100 starting:translate-y-4 starting:opacity-0 sm:starting:translate-y-0 sm:starting:scale-95"
          : "invisible translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95",
      )}
      data-open={open || undefined}
      inert={!open}
      ref={panelRef}
      role="dialog"
      style={position}
    >
      <header className="flex items-center gap-3 border-b border-neutral-800/80 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 select-none sm:pt-3">
        <div className="relative grid size-9 shrink-0 place-items-center rounded-full bg-neutral-900 text-lg ring-1 ring-neutral-800 select-none">
          👾
          <StatusDot busy={chat.busy} status={status} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-neutral-100">
            {assistant.name}
          </h2>
          <p className="truncate text-xs text-neutral-500">
            {disabled ? "disabled" : statusText(status, chat.busy)}
          </p>
        </div>
        {!disabled && (
          <>
            <HeaderButton
              label="Chat details"
              onClick={() => setShowDetails((shown) => !shown)}
              pressed={showDetails}
            >
              <StatsIcon />
            </HeaderButton>
            <HeaderButton
              disabled={chat.messages.length <= 1}
              label="New chat"
              onClick={() => {
                chat.reset();
                inputRef.current?.focus({ preventScroll: true });
              }}
            >
              <NewChatIcon />
            </HeaderButton>
          </>
        )}
        <HeaderButton label="Close" onClick={() => onClose()}>
          <CloseIcon />
        </HeaderButton>
      </header>

      {disabled ? (
        <DisabledNotice />
      ) : (
        <>
          <Details open={showDetails} stats={lastStats} status={status} />

          <ChatMessages
            busy={chat.busy}
            messages={chat.messages}
            onNavigate={() => isPhone() && onClose()}
            onRetry={chat.retry}
            open={open}
          />

          <ChatComposer
            busy={chat.busy}
            inputRef={inputRef}
            onSend={chat.send}
            onStop={chat.stop}
          />
        </>
      )}
    </section>,
    document.body,
  );
}

/** What the window shows when the assistant is switched off. */
function DisabledNotice() {
  return (
    <div className="grid flex-1 place-items-center px-8 text-center">
      <div className="space-y-2">
        <p aria-hidden="true" className="text-4xl select-none">
          😴
        </p>
        <p className="text-sm font-medium text-neutral-200">
          {assistant.name} is switched off
        </p>
        <p className="text-xs text-neutral-500">
          The AI assistant is disabled on this site.
        </p>
      </div>
    </div>
  );
}

function statusText(status: AssistantStatus | null, busy: boolean) {
  if (busy) return "typing…";
  if (!status) return "connecting…";
  if (!status.online) return "offline · replies may fail";
  if (status.busySlots >= status.slots) return "busy · replies may be slow";
  return `online · ${assistant.model}`;
}

function StatusDot({
  status,
  busy,
}: {
  status: AssistantStatus | null;
  busy: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute -right-0.5 -bottom-0.5 size-3 rounded-full ring-2 ring-neutral-950 transition-colors",
        busy
          ? "animate-pulse bg-emerald-400"
          : !status
            ? "bg-neutral-500"
            : !status.online
              ? "bg-rose-500"
              : status.busySlots >= status.slots
                ? "bg-amber-400"
                : "bg-emerald-500",
      )}
    />
  );
}

function HeaderButton({
  label,
  onClick,
  pressed,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  pressed?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={pressed}
      className="grid size-8 shrink-0 place-items-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100 disabled:pointer-events-none disabled:opacity-40 aria-pressed:bg-neutral-800 aria-pressed:text-emerald-400"
      disabled={disabled}
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}

/** 3734 → "3.7k"; context sizes are powers of two, so 16384 → "16k". */
const compact = (n: number) =>
  n >= 1024 && n % 1024 === 0
    ? `${n / 1024}k`
    : n >= 1000
      ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`
      : String(n);

/** Context, speed, slots and cache: what the model server reports. */
function Details({
  open,
  stats,
  status,
}: {
  open: boolean;
  stats?: ReplyStats;
  status: AssistantStatus | null;
}) {
  const contextSize = status?.online ? status.contextSize : 0;
  const used = stats ? stats.promptTokens + stats.outputTokens : 0;

  return (
    <div
      className={cn(
        "grid border-neutral-800/80 transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
        open ? "grid-rows-[1fr] border-b" : "grid-rows-[0fr]",
      )}
      inert={!open}
    >
      <div className="overflow-hidden">
        <dl className="grid grid-cols-2 gap-2 px-4 py-3 select-none">
          <Stat
            hint="tokens in memory"
            label="Context"
            meter={contextSize ? used / contextSize : undefined}
            value={
              contextSize
                ? `${used ? compact(used) : "—"} / ${compact(contextSize)}`
                : "—"
            }
          />
          <Stat
            hint="last reply"
            label="Speed"
            value={stats ? `${stats.tokensPerSecond.toFixed(1)} tok/s` : "—"}
          />
          <Stat
            hint={
              contextSize
                ? `${compact(contextSize)} context each`
                : "model server"
            }
            label="Slots"
            value={
              !status
                ? "…"
                : status.online
                  ? `${status.busySlots}/${status.slots} busy`
                  : "offline"
            }
          />
          <Stat
            hint={
              stats
                ? `prompt read in ${Math.round(stats.promptMs)} ms`
                : "prompt reuse"
            }
            label="Cache"
            value={
              stats?.promptTokens
                ? `${Math.round((stats.cachedTokens / stats.promptTokens) * 100)}% hit`
                : "—"
            }
          />
        </dl>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  meter,
}: {
  label: string;
  value: string;
  hint: string;
  meter?: number;
}) {
  return (
    <div className="rounded-xl bg-neutral-900 px-3 py-2 ring-1 ring-neutral-800/70">
      <dt className="text-[10px] tracking-wider text-neutral-500 uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 font-mono text-sm text-neutral-100 tabular-nums">
        {value}
      </dd>
      {meter !== undefined && (
        <dd className="mt-1.5 h-1 overflow-hidden rounded-full bg-neutral-800">
          <span
            className="block h-full rounded-full bg-emerald-500 transition-[width] duration-500"
            style={{ width: `${Math.min(100, Math.max(2, meter * 100))}%` }}
          />
        </dd>
      )}
      <dd className="mt-0.5 truncate text-[10px] text-neutral-600">{hint}</dd>
    </div>
  );
}
