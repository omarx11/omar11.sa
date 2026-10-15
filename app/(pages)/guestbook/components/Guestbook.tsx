"use client";

import { startTransition, useOptimistic, useState } from "react";

import type { SessionUser } from "@/app/lib/auth/server";

import { deleteComment, saveComment } from "../actions";
import type { GuestbookEntry } from "../types";
import { GuestbookEntries } from "./GuestbookEntries";
import { GuestbookForm } from "./GuestbookForm";
import OAuthButtons from "./OAuthButtons";

// `key` keeps a posted entry's React identity stable from its optimistic
// placeholder to the saved row, so it updates in place instead of remounting.
export type PendingEntry = GuestbookEntry & { pending?: boolean; key?: string };

type OptimisticAction =
  | { type: "add"; entry: PendingEntry }
  | { type: "remove"; cid: string };

export function Guestbook({
  initialEntries,
  user,
}: {
  initialEntries: GuestbookEntry[];
  user: SessionUser | null;
}) {
  const [entries, setEntries] = useState<PendingEntry[]>(initialEntries);
  const [error, setError] = useState<string | null>(null);
  const [optimisticEntries, applyOptimistic] = useOptimistic(
    entries,
    (state, action: OptimisticAction) =>
      action.type === "add"
        ? [action.entry, ...state]
        : state.filter((entry) => entry.cid !== action.cid),
  );

  // Returns false when the server rejected the comment.
  const addEntry = (comment: string) =>
    new Promise<boolean>((resolve) => {
      if (!user) return resolve(false);
      setError(null);
      const key = `local-${crypto.randomUUID()}`;
      startTransition(async () => {
        applyOptimistic({
          type: "add",
          entry: {
            key,
            cid: key,
            userId: user.id,
            name: user.name,
            avatar: user.image,
            comment,
            createdAt: new Date().toISOString(),
            pending: true,
          },
        });
        try {
          const saved = await saveComment(comment);
          startTransition(() =>
            setEntries((prev) => [{ ...saved, key }, ...prev]),
          );
          resolve(true);
        } catch {
          setError("Your comment couldn't be posted. Please try again.");
          resolve(false);
        }
      });
    });

  const removeEntry = (cid: string) => {
    setError(null);
    startTransition(async () => {
      applyOptimistic({ type: "remove", cid });
      try {
        await deleteComment(cid);
        startTransition(() =>
          setEntries((prev) => prev.filter((entry) => entry.cid !== cid)),
        );
      } catch {
        setError("That comment couldn't be deleted. Please try again.");
      }
    });
  };

  return (
    <>
      <div className="flex w-full items-center justify-center">
        {user ? (
          <GuestbookForm onSubmit={addEntry} user={user} />
        ) : (
          <OAuthButtons />
        )}
      </div>
      {error && (
        <p className="mb-4 text-center text-rose-400 text-sm" role="alert">
          {error}
        </p>
      )}
      <GuestbookEntries
        entries={optimisticEntries}
        onDelete={removeEntry}
        userId={user?.id ?? null}
      />
    </>
  );
}
