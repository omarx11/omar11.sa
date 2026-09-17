"use client";

import type { User } from "@supabase/supabase-js";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { Loading } from "@/app/components/icons/Loading";
import { Skeleton } from "@/app/components/ui/Skeleton";
import { StatementContext } from "@/app/context/statement";
import type { Guestbook } from "@/app/lib/supabase/types/custom";
import { cn } from "@/app/lib/utils";

import { saveComment } from "../action";
import { signOut } from "../login/actions";

const FormData = ({ userData }: { userData: User }) => {
  const [textComment, setTextComment] = useState<string>("");
  const [wordLimit, setWordLimit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<string>("");
  const { addComment, setIsCommentLoading } = useContext(StatementContext);

  const handleSubmit = async () => {
    if (!userData || !textComment.trim()) return;
    setIsCommentLoading(true);
    setTextComment("");
    setIsLoading("send");
    try {
      const content: Guestbook = await saveComment(textComment);
      addComment(content);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsLoading("");
      setIsCommentLoading(false);
    }
  };

  useEffect(() => {
    setWordLimit(textComment.length >= 2000);
  }, [textComment]);

  return (
    <div className="my-8 w-full max-w-xl">
      <div className="mb-2 flex select-none items-end gap-2">
        {userData && (
          <>
            <Image
              alt="user-avatar"
              className="drag-none h-[26px] w-[26px] rounded-full bg-neutral-800"
              height={32}
              src={userData.user_metadata.avatar_url}
              width={32}
            />
            <p className="text-neutral-500 text-sm">
              Typing as {"->"} {userData.user_metadata.name}
            </p>
          </>
        )}
      </div>
      <textarea
        className={cn(
          "h-40 w-full rounded-md border-[6px] border-neutral-800 bg-neutral-900 p-2 text-lg text-neutral-50 shadow-sm outline-0 ring-4 ring-neutral-700 duration-300 placeholder:text-sm placeholder:italic focus:bg-neutral-950",
          wordLimit
            ? "caret-rose-500 focus:ring-rose-800"
            : "caret-emerald-500 focus:ring-neutral-600",
        )}
        maxLength={2000}
        name="textComment"
        onChange={(e) => setTextComment(e.target.value.trimStart())}
        placeholder="Leave a comment.."
        spellCheck={false}
        value={textComment}
      />
      <div className="flex flex-wrap justify-between">
        <span
          className={cn(
            "select-none text-sm",
            wordLimit ? "font-bold text-rose-600" : "text-neutral-500",
          )}
        >
          {textComment.length} / 2000
        </span>
        <div className="mt-0.5 flex gap-2 text-neutral-50">
          <button
            aria-label="Send Comment"
            className="flex items-center gap-1 rounded-md bg-sky-800 px-2 py-1 text-base duration-100 hover:bg-sky-900 disabled:cursor-not-allowed disabled:select-none disabled:bg-sky-800 disabled:opacity-60"
            disabled={!textComment.trim() || !userData}
            onClick={handleSubmit}
          >
            SEND
            {isLoading === "send" && <Loading className="animate-spin" />}
          </button>
          <form action={signOut}>
            <button
              aria-label="Sign Out"
              className="flex items-center gap-1 rounded-md bg-rose-800 px-2 py-1 text-base duration-100 hover:bg-rose-900"
              onClick={() => setIsLoading("signout")}
            >
              Sign Out
              {isLoading === "signout" && <Loading className="animate-spin" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(FormData), {
  loading: () => (
    <Skeleton className="my-[4.4rem] h-[159px] w-full rounded-md sm:w-[36rem]" />
  ),
  ssr: false,
});
