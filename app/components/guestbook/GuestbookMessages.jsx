"use client";
import Image from "next/image";
import Link from "next/link";
import { StatementContext } from "@/app/context/statement";
import { getMessages } from "@/app/lib/fetchRequest";
import { dateStyle } from "@/app/lib/dateFormat";
import { useEffect, useContext } from "react";

export default function GuestbookMessages() {
  const { comments, setComments } = useContext(StatementContext);

  useEffect(() => {
    (async () => {
      const data = await getMessages();
      setComments(data);
    })();
  }, []);

  return (
    <ul
      className="fade-in w-full border-t-[16px] border-double border-neutral-900 px-0 pt-8 md:px-2"
      id="guestbook"
    >
      {comments ? (
        comments.map(
          ({ name, profile, comment, avatar, created_at }, index) => (
            <li
              key={index}
              className="flex flex-row items-start gap-3 rounded-lg px-1 py-4 duration-100 hover:bg-neutral-800 hover:drop-shadow-md md:px-2"
            >
              {profile ? (
                <Link href={profile} target="_blank">
                  <Image
                    src={avatar}
                    width={42}
                    height={42}
                    className="drag-none min-w-[42px] select-none rounded-full bg-neutral-500 ring-violet-600 duration-150 hover:ring-4"
                    alt={name + " avatar"}
                  />
                </Link>
              ) : (
                <Image
                  src={avatar}
                  width={42}
                  height={42}
                  className="drag-none select-none rounded-full bg-neutral-500"
                  alt={name + " avatar"}
                />
              )}
              <div className="overflow-hidden">
                <p className="whitespace-pre-wrap text-stone-200">{comment}</p>
                <div className="flex select-none flex-wrap items-center text-sm md:text-base">
                  <p className="text-neutral-400">{name}</p>
                  <span className="mx-1 text-neutral-700">/</span>
                  <div className="flex text-sm text-neutral-500">
                    {dateStyle(created_at)}
                  </div>
                </div>
              </div>
            </li>
          ),
        )
      ) : (
        <ul className="fade-in w-full list-none space-y-2 px-4">
          {[...Array(6).keys()].map((i) => (
            <li key={i}>
              <span
                className="inline-block h-16 w-full animate-pulse rounded-md bg-neutral-800"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animationDirection: "1s",
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
}
