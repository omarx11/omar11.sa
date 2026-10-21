"use client";

import { Suspense, startTransition, use, useOptimistic, useState } from "react";

import type { SessionUser } from "@/lib/auth/server";

import { deleteComment, saveComment } from "../actions";
import type { GuestbookEntry } from "../types";
import { GuestbookEntries } from "./GuestbookEntries";
import { GuestbookForm } from "./GuestbookForm";
import OAuthButtons from "./OAuthButtons";

// Holds the sign-in card or the comment form. Its minimum height is the
// form's, so the placeholder, the card and the form all take the same space
// and nothing below moves when the session loads or the visitor signs in.
const GUESTBOOK_SLOT = "flex min-h-[299px] w-full items-center justify-center";

// `key` keeps a posted entry's React identity stable from its optimistic
// placeholder to the saved row, so it updates in place instead of remounting.
export type PendingEntry = GuestbookEntry & { pending?: boolean; key?: string };

type OptimisticAction =
  | { type: "add"; entry: PendingEntry }
  | { type: "remove"; cid: string };

export function Guestbook({
  initialEntries,
  userPromise,
}: {
  initialEntries: GuestbookEntry[];
  userPromise: Promise<SessionUser | null>;
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
  const addEntry = (comment: string, user: SessionUser) =>
    new Promise<boolean>((resolve) => {
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
      <div className={GUESTBOOK_SLOT}>
        <Suspense fallback={<OAuthButtons placeholder />}>
          <SignInOrForm onSubmit={addEntry} userPromise={userPromise} />
        </Suspense>
      </div>
      {error && (
        <p className="mb-4 text-center text-sm text-rose-400" role="alert">
          {error}
        </p>
      )}
      <GuestbookEntries
        entries={optimisticEntries}
        onDelete={removeEntry}
        userPromise={userPromise}
      />
    </>
  );
}

function SignInOrForm({
  userPromise,
  onSubmit,
}: {
  userPromise: Promise<SessionUser | null>;
  onSubmit: (comment: string, user: SessionUser) => Promise<boolean>;
}) {
  const user = use(userPromise);
  if (!user) return <OAuthButtons />;
  return (
    <GuestbookForm
      onSubmit={(comment) => onSubmit(comment, user)}
      user={user}
    />
  );
}
