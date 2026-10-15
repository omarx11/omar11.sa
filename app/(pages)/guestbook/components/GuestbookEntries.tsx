"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { dateStyle } from "@/app/lib/helpers";
import { cn } from "@/app/lib/utils";

import type { PendingEntry } from "./Guestbook";

export function GuestbookEntries({
  entries,
  userId,
  onDelete,
}: {
  entries: PendingEntry[];
  userId: string | null;
  onDelete: (cid: string) => void;
}) {
  const [newestFirst, setNewestFirst] = useState(true);
  const shown = newestFirst ? entries : [...entries].reverse();

  return (
    <>
      <div className="-mt-2 flex w-full flex-row-reverse items-end justify-between rounded-xs border-neutral-900/50 border-b-8 pb-2 text-neutral-200 sm:flex-row">
        <div className="border-neutral-800 border-r-8 border-double pr-2 sm:border-r-0 sm:border-l-8 sm:pl-2">
          <p className="text-neutral-300">
            <span className="text-emerald-400">{entries.length}</span>{" "}
            <span className="text-neutral-400">-</span> comments
          </p>
        </div>
        <div className="flex select-none gap-2 rounded-md border border-neutral-700/80 bg-neutral-900 p-1 text-sm">
          <SortButton active={newestFirst} onClick={() => setNewestFirst(true)}>
            Newest
          </SortButton>
          <SortButton
            active={!newestFirst}
            onClick={() => setNewestFirst(false)}
          >
            Oldest
          </SortButton>
        </div>
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
                className="drag-none max-h-[42px] min-h-[42px] min-w-[42px] max-w-[42px] select-none rounded-full bg-neutral-800 ring-4 ring-cyan-950"
                height={42}
                src={entry.avatar}
                unoptimized
                width={42}
              />
            ) : (
              <div className="h-[42px] min-w-[42px] rounded-full bg-neutral-800 ring-4 ring-cyan-950" />
            )}
            <div className="w-full overflow-hidden">
              <p className="whitespace-break-spaces break-all text-neutral-200 sm:break-normal">
                {entry.comment}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex select-none flex-wrap items-center text-neutral-500 text-sm md:text-base">
                  <p>{entry.name}</p>
                  <span className="mx-0.5 text-neutral-600">/</span>
                  <p className="flex text-xs">
                    {entry.pending ? "posting…" : dateStyle(entry.createdAt)}
                  </p>
                </div>
                {userId && userId === entry.userId && !entry.pending && (
                  <DeleteButton onConfirm={() => onDelete(entry.cid)} />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function SortButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-pressed={active}
      className="rounded-md px-1.5 py-0.5 hover:bg-neutral-800 disabled:bg-neutral-700 disabled:text-emerald-300"
      disabled={active}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
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
