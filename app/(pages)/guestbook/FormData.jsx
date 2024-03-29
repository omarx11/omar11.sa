"use client";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { StatementContext } from "@/app/context/statement";
import { signOut, useSession } from "next-auth/react";
import { postComment } from "@/app/lib/fetchRequests";
import SigninButton from "./SigninButton";
import { cn } from "@/app/lib/utils";

export default function FormData() {
  const { data: session, status } = useSession();
  const [textComment, setTextComment] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [wordLimit, setWordLimit] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const { setComments, setIsCommentLoading } = useContext(StatementContext);

  const handleSubmit = async () => {
    setIsCommentLoading(true);
    setTextComment("");
    setIsLoading("SEND");
    if (session && session.user) {
      const content = await postComment(textComment);
      setComments((prev) => [content, ...prev]);
    }
    setIsLoading("");
    setIsCommentLoading(false);
  };

  useEffect(() => {
    textComment.length >= 2000 ? setWordLimit(true) : setWordLimit(false);
    textComment === "" ? setIsTyping(true) : setIsTyping(false);
  }, [textComment]);

  if (status === "loading")
    return (
      <div className="my-[4.4rem] h-[116px] w-full animate-pulse rounded-md bg-neutral-900 sm:w-[28rem]"></div>
    );

  return status === "authenticated" ? (
    <div className="my-8 w-full max-w-xl">
      <div className="mb-2 flex select-none items-end gap-2">
        <Image
          src={session.user.image}
          width={32}
          height={32}
          className="drag-none h-[26px] w-[26px] rounded-full bg-neutral-800"
          alt="user-avatar"
        />
        <p className="text-sm text-neutral-500">
          Type as {">"} {session.user.name}
        </p>
      </div>
      <textarea
        name="textComment"
        value={textComment}
        onChange={(e) => setTextComment(e.target.value)}
        maxLength={2000}
        placeholder="Leave a comment.."
        spellCheck={false}
        className={cn(
          "h-40 w-full resize-none rounded-md border-[6px] border-neutral-800 bg-neutral-900 p-2 text-lg text-neutral-50 shadow-sm outline-0 ring-4 ring-neutral-700 duration-300 placeholder:text-sm placeholder:italic focus:bg-neutral-950",
          {
            "caret-rose-500 focus:ring-rose-800": wordLimit,
            "caret-emerald-500 focus:ring-neutral-600": !wordLimit,
          },
        )}
      />
      <div className="flex flex-wrap justify-between">
        <span
          className={cn("select-none text-sm", {
            "font-bold text-rose-600": wordLimit,
            "text-neutral-500": !wordLimit,
          })}
        >
          {textComment.length} / 2000
        </span>
        <div className="mt-0.5 flex gap-2 text-neutral-50">
          <button
            aria-label="Send Comment"
            disabled={isTyping}
            onClick={handleSubmit}
            className="flex items-center gap-1 rounded-md bg-sky-800 px-2 py-1 text-base duration-100 hover:bg-sky-900 disabled:cursor-not-allowed disabled:select-none disabled:bg-sky-800 disabled:opacity-60"
          >
            SEND
            {isLoading === "SEND" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="animate-spin"
              >
                <g fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                    clipRule="evenodd"
                    opacity=".2"
                  />
                  <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
                </g>
              </svg>
            )}
          </button>
          <button
            aria-label="Sign-Out"
            onClick={() => {
              signOut();
              setIsLoading("SignOut");
            }}
            className="flex items-center gap-1 rounded-md bg-rose-800 px-2 py-1 text-base duration-100 hover:bg-rose-900"
          >
            Sign-Out
            {isLoading === "SignOut" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="animate-spin"
              >
                <g fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                    clipRule="evenodd"
                    opacity=".2"
                  />
                  <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
                </g>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <SigninButton />
  );
}
