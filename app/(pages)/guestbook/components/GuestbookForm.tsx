"use client";

import Image from "next/image";
import { type KeyboardEvent, useState } from "react";
import { useFormStatus } from "react-dom";

import { Loading } from "@/app/components/icons/Loading";
import type { SessionUser } from "@/app/lib/auth/server";
import { cn } from "@/app/lib/utils";

import { signOut } from "../actions";

const MAX_LENGTH = 2000;

export function GuestbookForm({
  user,
  onSubmit,
}: {
  user: SessionUser;
  onSubmit: (comment: string) => Promise<boolean>;
}) {
  const [text, setText] = useState("");
  const atLimit = text.length >= MAX_LENGTH;

  const submit = async () => {
    const comment = text.trim();
    if (!comment) return;
    setText("");
    // Put the text back if the server rejected it, so nothing typed is lost.
    if (!(await onSubmit(comment))) setText(comment);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="my-8 w-full max-w-xl">
      <div className="mb-2 flex select-none items-end gap-2">
        {user.image ? (
          <Image
            alt=""
            className="drag-none h-[26px] w-[26px] rounded-full bg-neutral-800"
            height={26}
            src={user.image}
            unoptimized
            width={26}
          />
        ) : (
          <div className="h-[26px] w-[26px] rounded-full bg-neutral-800" />
        )}
        <p className="text-neutral-500 text-sm">
          Typing as {"->"} {user.name}
        </p>
      </div>
      <textarea
        aria-label="Your comment"
        className={cn(
          "h-40 w-full rounded-md border-[6px] border-neutral-800 bg-neutral-900 p-2 text-lg text-neutral-50 shadow-xs outline-0 ring-4 ring-neutral-700 duration-300 placeholder:text-sm placeholder:italic focus:bg-neutral-950",
          atLimit
            ? "caret-rose-500 focus:ring-rose-800"
            : "caret-emerald-500 focus:ring-neutral-600",
        )}
        maxLength={MAX_LENGTH}
        name="comment"
        onChange={(e) => setText(e.target.value.trimStart())}
        onKeyDown={onKeyDown}
        placeholder="Leave a comment.. (Ctrl + Enter to send)"
        spellCheck={false}
        value={text}
      />
      <div className="flex flex-wrap justify-between">
        <span
          className={cn(
            "select-none text-sm",
            atLimit ? "font-bold text-rose-600" : "text-neutral-500",
          )}
        >
          {text.length} / {MAX_LENGTH}
        </span>
        <div className="mt-0.5 flex gap-2 text-neutral-50">
          <button
            className="flex items-center gap-1 rounded-md bg-sky-800 px-2 py-1 text-base duration-100 hover:bg-sky-900 disabled:cursor-not-allowed disabled:select-none disabled:bg-sky-800 disabled:opacity-60"
            disabled={!text.trim()}
            onClick={submit}
            type="button"
          >
            SEND
          </button>
          <form action={signOut}>
            <SignOutButton />
          </form>
        </div>
      </div>
    </div>
  );
}

function SignOutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="flex items-center gap-1 rounded-md bg-rose-800 px-2 py-1 text-base duration-100 hover:bg-rose-900 disabled:opacity-70"
      disabled={pending}
      type="submit"
    >
      Sign Out
      {pending && <Loading className="animate-spin" />}
    </button>
  );
}
