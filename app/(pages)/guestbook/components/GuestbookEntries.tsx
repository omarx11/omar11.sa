"use client";

import Image from "next/image";
import { Suspense, use, useEffect, useState } from "react";

import { Switch, SwitchButton, switchIcon } from "@/components/ui/Switch";
import type { SessionUser } from "@/lib/auth/server";
import { formatDateTime } from "@/lib/dates";
import { cn } from "@/lib/utils";

import type { PendingEntry } from "./Guestbook";

export function GuestbookEntries({
  entries,
  userPromise,
  onDelete,
}: {
  entries: PendingEntry[];
  userPromise: Promise<SessionUser | null>;
  onDelete: (cid: string) => void;
}) {
  const [newestFirst, setNewestFirst] = useState(true);
  const shown = newestFirst ? entries : [...entries].reverse();

  return (
    <>
      <div className="-mt-2 flex w-full flex-row-reverse items-end justify-between rounded-xs border-b-8 border-neutral-900/50 pb-2 text-neutral-200 sm:flex-row">
        <div className="border-r-8 border-double border-neutral-800 pr-2 sm:border-r-0 sm:border-l-8 sm:pl-2">
          <p className="text-neutral-300">
            <span className="text-emerald-400">{entries.length}</span>{" "}
            <span className="text-neutral-400">-</span> comments
          </p>
        </div>
        <Switch label="Sort comments">
          <SwitchButton
            active={newestFirst}
            icon={NEWEST}
            onClick={() => setNewestFirst(true)}
          >
            Newest
          </SwitchButton>
          <SwitchButton
            active={!newestFirst}
            icon={OLDEST}
            onClick={() => setNewestFirst(false)}
          >
            Oldest
          </SwitchButton>
        </Switch>
      </div>
      <ul
        className={cn(
          "mt-4 flex min-h-max flex-col gap-1 sm:min-h-[480px]",
          newestFirst ? "fade-in" : "fade-in-up",
        )}
        key={newestFirst ? "newest" : "oldest"}
      >
        {shown.map((entry) => (
          <li
            className={cn(
              "flex flex-row items-start gap-3 rounded-md bg-neutral-950 px-1 py-4 transition-[opacity,background-color] duration-75 hover:bg-neutral-900 md:px-2",
              { "opacity-60": entry.pending },
            )}
            key={entry.key ?? entry.cid}
          >
            {entry.avatar ? (
              <Image
                alt=""
                className="max-h-[42px] min-h-[42px] max-w-[42px] min-w-[42px] rounded-full bg-neutral-800 ring-4 ring-cyan-950"
                height={42}
                src={entry.avatar}
                unoptimized
                width={42}
              />
            ) : (
              <div className="h-[42px] min-w-[42px] rounded-full bg-neutral-800 ring-4 ring-cyan-950" />
            )}
            <div className="w-full overflow-hidden">
              <p className="wrap-anywhere whitespace-break-spaces text-neutral-200">
                {entry.comment}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center text-sm text-neutral-500 select-none md:text-base">
                  <p>{entry.name}</p>
                  <span className="mx-0.5 text-neutral-600">/</span>
                  <p className="flex text-xs">
                    {entry.pending
                      ? "posting…"
                      : formatDateTime(entry.createdAt)}
                  </p>
                </div>
                {!entry.pending && entry.userId && (
                  // The entries render without waiting for the session; the
                  // owner's delete button appears once it's known.
                  <Suspense fallback={null}>
                    <OwnerDeleteButton
                      onConfirm={() => onDelete(entry.cid)}
                      ownerId={entry.userId}
                      userPromise={userPromise}
                    />
                  </Suspense>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

// Sort icons: lines from longest to shortest, and the reverse.
const NEWEST = switchIcon(<path d="M3 6h18M6 12h12M10 18h4" />);
const OLDEST = switchIcon(<path d="M10 6h4M6 12h12M3 18h18" />);

function OwnerDeleteButton({
  ownerId,
  userPromise,
  onConfirm,
}: {
  ownerId: string;
  userPromise: Promise<SessionUser | null>;
  onConfirm: () => void;
}) {
  const user = use(userPromise);
  return user?.id === ownerId ? <DeleteButton onConfirm={onConfirm} /> : null;
}

// Two-step delete: the first click arms it for a few seconds, the second deletes.
function DeleteButton({ onConfirm }: { onConfirm: () => void }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const timer = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(timer);
  }, [armed]);

  return (
    <div className="mr-0 min-w-max select-none sm:-mt-5 sm:mr-4">
      <button
        className={cn(
          "text-xs hover:text-red-400 sm:text-sm",
          armed ? "font-bold text-red-400" : "text-red-500/80",
        )}
        onClick={() => (armed ? onConfirm() : setArmed(true))}
        type="button"
      >
        {armed ? "< CONFIRM? >" : "< DELETE >"}
      </button>
    </div>
  );
}
