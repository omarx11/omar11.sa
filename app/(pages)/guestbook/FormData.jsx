"use client";
import Image from "next/image";
import { StatementContext } from "@/app/context/statement";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import SigninButton from "./SigninButton";
import { cn } from "@/app/lib/utils";

export default function FormData() {
  const { data: session, status } = useSession();
  const [comment, setComment] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [wordLimit, setWordLimit] = useState(false);
  const [isLoading, setIsLoading] = useState("");
  const { setComments } = useContext(StatementContext);

  const handleSubmit = async () => {
    setComment("");
    setIsLoading("SEND");
    if (session && session.user) {
      const data = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment }),
      });
      const content = await data.json();

      setComments((prev) => [content, ...prev]);
    }
    setIsLoading("");
  };

  useEffect(() => {
    comment.length >= 2000 ? setWordLimit(true) : setWordLimit(false);
    comment === "" ? setIsTyping(true) : setIsTyping(false);
  }, [comment]);

  if (status === "loading")
    // if (status)
    return (
      <div className="m-auto my-10 h-24 w-96 animate-pulse rounded-md bg-neutral-900"></div>
    );

  return status === "authenticated" ? (
    <div className="m-auto max-w-xl">
      <div className="mb-2 flex select-none items-end gap-2">
        <Image
          src={session.user.image}
          width={26}
          height={26}
          className="drag-none rounded-full bg-neutral-800"
          alt="user-avatar"
        />
        <p className="text-sm text-neutral-500">
          Type as - {session.user.name}
        </p>
      </div>
      <textarea
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={2000}
        placeholder="Leave a message.."
        spellCheck={false}
        className={cn(
          "h-36 w-full resize-none rounded-md border-4 border-neutral-700 bg-neutral-900 p-2 text-lg text-neutral-50 shadow-sm outline-0 ring-4 ring-neutral-700 duration-300 placeholder:text-sm placeholder:italic focus:bg-neutral-950",
          {
            "caret-rose-500 focus:ring-rose-800": wordLimit,
            "caret-emerald-500 focus:ring-emerald-600": !wordLimit,
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
          {comment.length} / 2000
        </span>
        <div className="mt-0.5 flex gap-4 text-neutral-50">
          <button
            aria-label="Post Comment"
            disabled={isTyping}
            onClick={handleSubmit}
            className="flex items-center gap-1 rounded-md bg-sky-800 px-2 py-1 text-base duration-100 hover:bg-sky-900 disabled:cursor-default disabled:select-none disabled:opacity-60"
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
            aria-label="Sign out"
            onClick={() => {
              signOut();
              setIsLoading("SignOut");
            }}
            className="flex items-center gap-1 rounded-md bg-rose-800 px-2 py-1 text-base duration-100 hover:bg-rose-900"
          >
            Sign Out
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
