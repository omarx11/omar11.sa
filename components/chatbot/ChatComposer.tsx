"use client";

import { type KeyboardEvent, type RefObject, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { assistant } from "@/config/meta";
import { cn } from "@/lib/utils";

import { SendIcon, StopIcon } from "./ChatIcons";

/** The API accepts up to 1,000 characters per message. */
const MAX_LENGTH = 1000;

export function ChatComposer({
  busy,
  onSend,
  onStop,
  inputRef,
}: {
  busy: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
  inputRef: RefObject<HTMLTextAreaElement | null>;
}) {
  const [text, setText] = useState("");
  const canSend = !busy && text.trim().length > 0;

  const send = () => {
    if (!canSend) return;
    onSend(text);
    setText("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter adds a line. `isComposing`: Enter that confirms
    // a word in an input method (e.g. some Arabic or CJK keyboards) mustn't send.
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  };

  return (
    <form
      className="border-t border-neutral-800/80 bg-neutral-950 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4"
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
    >
      <div className="flex items-end gap-2 rounded-2xl bg-neutral-900 py-1.5 pr-1.5 pl-3.5 ring-1 ring-neutral-800 transition-shadow focus-within:ring-neutral-600">
        <TextareaAutosize
          aria-label={`Message ${assistant.name}`}
          // 16px on phones: smaller text makes iOS zoom in on focus.
          className="no-scrollbar flex-1 resize-none bg-transparent py-1.5 text-base leading-5 text-neutral-100 caret-emerald-400 outline-none placeholder:text-neutral-500 sm:text-sm"
          enterKeyHint="send"
          maxLength={MAX_LENGTH}
          maxRows={5}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={`Message ${assistant.name}…`}
          ref={inputRef}
          rows={1}
          value={text}
        />
        {busy ? (
          <button
            aria-label="Stop the reply"
            className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-200 text-neutral-900 transition-colors hover:bg-white"
            onClick={onStop}
            title="Stop"
            type="button"
          >
            <StopIcon />
          </button>
        ) : (
          <button
            aria-label="Send message"
            className={cn(
              "grid size-8 shrink-0 place-items-center rounded-full transition-colors",
              canSend
                ? "bg-emerald-600 text-white hover:bg-emerald-500"
                : "bg-neutral-800 text-neutral-500",
            )}
            disabled={!canSend}
            type="submit"
          >
            <SendIcon />
          </button>
        )}
      </div>
      <p className="mt-1.5 flex justify-between gap-2 px-1 text-[10px] text-neutral-600">
        <span className="[@media(pointer:fine)]:hidden">
          {assistant.name} can be wrong. Check what matters.
        </span>
        {text.length > MAX_LENGTH * 0.8 && (
          <span
            className={cn(
              "font-mono",
              text.length >= MAX_LENGTH && "text-rose-400",
            )}
          >
            {text.length}/{MAX_LENGTH}
          </span>
        )}
      </p>
    </form>
  );
}
