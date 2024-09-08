"use client";

import Image from "next/image";
import { useEffect, useContext, useState, useCallback } from "react";
import { StatementContext } from "@/app/context/statement";
import { deleteComment, getAllComments } from "../action";
import { dateStyle } from "@/app/lib/helpers";
import { LoadingDots } from "@/app/components/icons/LoadingDots";
import { User } from "@supabase/supabase-js";
import { Guestbook } from "@/app/lib/supabase/types/custom";
import { cn } from "@/app/lib/utils";
import { Skeleton } from "@/app/components/ui/Skeleton";

export function GuestbookMessages({ userData }: { userData: User | null }) {
  const [isNewest, setIsNewest] = useState<boolean>(true);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );
  const {
    comments,
    isCommentLoading,
    setComments,
    removeComment,
    setIsCommentLoading,
  } = useContext(StatementContext);

  useEffect(() => {
    (async () => {
      try {
        const data: Guestbook[] = (await getAllComments()) ?? [];
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    })();
  }, []);

  const handleDeleteComment = useCallback(
    async (cid: string) => {
      try {
        setDeletingCommentId(cid);
        setIsCommentLoading(true);
        await deleteComment(cid);
        removeComment(cid);
      } catch (error) {
        console.error("Error deleting comment:", error);
      } finally {
        setIsCommentLoading(false);
        setDeletingCommentId(null);
      }
    },
    [removeComment, setIsCommentLoading]
  );

  return (
    <>
      <div className="-mt-2 flex w-full flex-row-reverse items-end justify-between rounded-sm border-b-8 border-neutral-900/50 pb-2 text-neutral-200 sm:flex-row">
        <div className="border-r-8 border-double border-neutral-800 pr-2 sm:border-l-8 sm:border-r-0 sm:pl-2">
          <p className="text-neutral-300">
            {comments && !isCommentLoading ? (
              <span className="text-emerald-400">{comments.length}</span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="-ml-1 inline animate-spin"
              >
                <g fill="rgb(16, 185, 129)">
                  <path
                    fillRule="evenodd"
                    d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                    clipRule="evenodd"
                    opacity=".2"
                  />
                  <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
                </g>
              </svg>
            )}{" "}
            <span className="text-neutral-400">-</span> comments
          </p>
        </div>
        <div
          className={cn(
            "flex select-none gap-2 rounded-md border border-neutral-700/80 bg-neutral-900 p-1 text-sm",
            {
              "pointer-events-none opacity-70": !comments,
            }
          )}
        >
          <button
            className="rounded-md px-1.5 py-0.5 hover:bg-neutral-800 disabled:bg-neutral-700 disabled:text-emerald-300"
            disabled={isNewest}
            onClick={() => setIsNewest(true)}
          >
            Newest
          </button>
          <button
            className="rounded-md px-1.5 py-0.5 hover:bg-neutral-800 disabled:bg-neutral-700 disabled:text-emerald-300"
            disabled={!isNewest}
            onClick={() => setIsNewest(false)}
          >
            Oldest
          </button>
        </div>
      </div>
      <ul
        className={cn(
          "fade-in mt-4 flex min-h-max flex-col gap-1 sm:min-h-[480px]",
          {
            "fade-in-up flex-col-reverse justify-end": !isNewest,
          }
        )}
      >
        {comments ? (
          comments.map((user) => (
            <li
              key={user.cid}
              className="flex flex-row items-start gap-3 rounded-md bg-neutral-950 px-1 py-4 duration-100 hover:bg-neutral-900 md:px-2"
            >
              <Image
                src={user.avatar ?? ""}
                width={48}
                height={48}
                className="drag-none max-h-[42px] min-h-[42px] min-w-[42px] max-w-[42px] select-none rounded-full bg-neutral-800 ring-4 ring-cyan-950"
                alt=""
              />
              <div className="w-full overflow-hidden">
                <p className="whitespace-break-spaces break-all text-neutral-200 sm:break-normal">
                  {user.comment}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex select-none flex-wrap items-center text-sm text-neutral-500 md:text-base">
                    <p>{user.name ? user.name : "anon"}</p>
                    <span className="mx-0.5 text-neutral-600">/</span>
                    <p className="flex text-xs">
                      {user.inserted_at ? dateStyle(user.inserted_at) : "N/A"}
                    </p>
                  </div>
                  {userData && userData.id === user.user_id && (
                    <div className="mr-0 min-w-max select-none sm:-mt-5 sm:mr-4">
                      {deletingCommentId !== user.cid ? (
                        <button
                          className="text-xs text-red-500/80 hover:text-red-400 sm:text-sm"
                          onClick={() =>
                            user.cid && handleDeleteComment(user.cid)
                          }
                        >{`< DELETE >`}</button>
                      ) : (
                        <LoadingDots className="mr-4 scale-[1.6] text-red-500 sm:mr-5 sm:scale-[2]" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <ul className="my-4 w-full list-none space-y-0.5">
            {[...Array(6)].map((_, i) => (
              <li key={i}>
                <Skeleton className="inline-block w-full rounded-md py-8" />
              </li>
            ))}
          </ul>
        )}
      </ul>
    </>
  );
}
