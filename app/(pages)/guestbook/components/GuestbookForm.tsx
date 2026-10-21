"use client";

import Image from "next/image";
import { type ChangeEvent, type KeyboardEvent, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import TextareaAutosize from "react-textarea-autosize";

import { Loading } from "@/components/icons/Loading";
import type { SessionUser } from "@/lib/auth/server";
import { cn } from "@/lib/utils";

import { signOut } from "../actions";
import { tidyComment, tidyWhitespace } from "../tidy";

const MAX_LENGTH = 2000;

export function GuestbookForm({
  user,
  onSubmit,
}: {
  user: SessionUser;
  onSubmit: (comment: string) => Promise<boolean>;
}) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const length = text.length;
  const canSend = tidyComment(text).length > 0;

  // Extra blank lines and spaces are dropped as they're typed or pasted. The
  // box is corrected in place, in the same keystroke, so the cursor stays
  // where it was and React finds nothing left to change.
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const box = e.target;
    const tidied = tidyWhitespace(box.value);
    if (tidied !== box.value) {
      // The cursor goes where the text before it ends up. Spaces typed right
      // before a line break are removed, so it can't go past them.
      const before = tidyWhitespace(box.value.slice(0, box.selectionStart));
      let caret = 0;
      while (caret < before.length && before[caret] === tidied[caret]) caret++;
      box.value = tidied;
      box.setSelectionRange(caret, caret);
    }
    setText(tidied);
  };

  const submit = async () => {
    const comment = tidyComment(text);
    if (!comment) return;
    setText("");
    // Back to the box after clicking Send, ready for the next message.
    inputRef.current?.focus();
    // If the server rejected it, put it back so nothing typed is lost (unless
    // a new message was started in the meantime).
    if (!(await onSubmit(comment))) {
      setText((current) => current || comment);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="my-8 w-full max-w-xl">
      <div className="mb-2 flex items-center gap-2 select-none">
        {user.image ? (
          <Image
            alt=""
            className="h-[26px] w-[26px] rounded-full bg-neutral-800"
            height={26}
            src={user.image}
            unoptimized
            width={26}
          />
        ) : (
          <div className="h-[26px] w-[26px] rounded-full bg-neutral-800" />
        )}
        <p className="min-w-0 flex-1 truncate text-sm text-neutral-500">
          Typing as {"->"} <span className="text-neutral-300">{user.name}</span>
        </p>
        {/* Away from Send, so it can't be hit by mistake. */}
        <form action={signOut}>
          <SignOutButton />
        </form>
      </div>

      <div
        className={cn(
          "rounded-lg border-4 bg-neutral-900 ring-4 transition-[color,background-color,border-color,box-shadow] duration-200 focus-within:bg-neutral-950",
          length >= MAX_LENGTH
            ? "border-rose-700 ring-rose-900/40 focus-within:border-rose-500 focus-within:ring-rose-800/50"
            : "border-neutral-800 ring-neutral-800/60 focus-within:border-emerald-700 focus-within:ring-emerald-900/40",
        )}
      >
        <TextareaAutosize
          aria-label="Your comment"
          className={cn(
            "no-scrollbar block w-full resize-none bg-transparent px-3 pt-3 pb-1 text-base leading-6 text-neutral-50 outline-none placeholder:text-neutral-600",
            length >= MAX_LENGTH ? "caret-rose-500" : "caret-emerald-500",
          )}
          maxLength={MAX_LENGTH}
          maxRows={12}
          minRows={4}
          name="comment"
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Leave a comment.."
          ref={inputRef}
          spellCheck={false}
          value={text}
        />
        <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-2">
          <div className="flex min-w-0 items-center gap-3 text-xs">
            <span
              className={cn(
                "font-mono tabular-nums select-none",
                length >= MAX_LENGTH
                  ? "font-bold text-rose-500"
                  : length >= MAX_LENGTH * 0.9
                    ? "text-amber-500"
                    : "text-neutral-600",
              )}
            >
              {length} / {MAX_LENGTH}
            </span>
            <span className="hidden truncate text-neutral-600 select-none [@media(pointer:fine)]:inline">
              Ctrl + Enter to send
            </span>
          </div>
          <button
            className="flex shrink-0 items-center gap-1.5 rounded-md bg-emerald-700 px-3 py-1 text-sm font-medium text-neutral-50 transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
            disabled={!canSend}
            onClick={submit}
            type="button"
          >
            SEND
            <svg
              aria-hidden="true"
              fill="none"
              height="14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              width="14"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function SignOutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="flex items-center gap-1 rounded-md bg-rose-800 px-2.5 py-1 text-xs font-medium text-neutral-50 transition-colors hover:bg-rose-700 disabled:opacity-70"
      disabled={pending}
      type="submit"
    >
      Sign out
      {pending && <Loading className="size-3 animate-spin" />}
    </button>
  );
}
