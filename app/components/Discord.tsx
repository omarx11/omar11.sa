"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { useEffect } from "react";
import { useLanyard } from "use-lanyard";

import { relativeTime } from "@/app/lib/helpers";

import { author } from "../config/meta";
import { cn } from "../lib/utils";
import { Skeleton } from "./ui/Skeleton";

const discordId = author.discordId as `${bigint}`;

export default function Discord() {
  // Returns undefined until the first presence arrives.
  const data = useLanyard(discordId);

  const statusText =
    data?.discord_status === "dnd"
      ? "online. (do not disturb)"
      : `${data?.discord_status}.`;

  const lastActivity = data?.activities.at(-1);
  const activityName = lastActivity?.name;
  const startTime = lastActivity?.timestamps?.start;

  const playing = activityName
    ? `Playing: ${activityName}`
    : "On his desktop. not doing anything! 📡🛰️";

  const playingFor = startTime ? relativeTime(new Date(startTime)) : "";

  // The chatbot prompt reads this cookie on the server to answer status questions.
  const onlineState = data
    ? `${author.name} is currently ${statusText} and ${playing} ${playingFor}`.replace(
        /[.:]/g,
        "",
      )
    : null;

  useEffect(() => {
    if (onlineState) {
      window.cookieStore?.set("onlineState", onlineState).catch(() => {});
    }
  }, [onlineState]);

  if (!data) {
    return (
      <Skeleton className="my-0.5 h-5 w-40 rounded-xs bg-neutral-800/75" />
    );
  }
  return (
    <HoverCard closeDelay={0} openDelay={0}>
      <HoverCardTrigger
        className="flex select-none items-center gap-2 pl-[1px]"
        href="/"
      >
        <span
          className={cn("relative mx-[2px] h-3 w-3 rounded-full", {
            "ping-online border-red-300 bg-[#1db954]":
              data.discord_status === "online",
            "ping-idle border-yellow-300 bg-yellow-400":
              data.discord_status === "idle",
            "ping-offline border-[3px] border-neutral-300 bg-transparent":
              data.discord_status === "offline",
            "ping-dnd border-rose-300 bg-rose-400":
              data.discord_status === "dnd",
          })}
        ></span>
        <p>currently {statusText}</p>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        className="w-60 space-y-1 rounded-md border-4 border-emerald-600/40 border-dashed bg-zinc-800 p-2 text-sm"
        sideOffset={0}
      >
        <h4 className="font-semibold">Id: {author.discordUsername}</h4>
        {data.discord_status !== "offline" ? (
          <>
            <p>{playing}</p>
            {startTime && (
              <p className="pt-2 text-neutral-400 text-xs">{playingFor}</p>
            )}
          </>
        ) : (
          <p>Maybe {`he's`} sleeping 💤 or outside his room 🚪</p>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
