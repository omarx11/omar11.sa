"use client";

import { useLanyard } from "use-lanyard";
import { relativeTime } from "@/app/lib/helpers";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Skeleton } from "./ui/Skeleton";
import { author } from "../config/meta";
import { cn } from "../lib/utils";

const discordId = author.discordId as `${bigint}`;

export default function Discord() {
  const { data, error, isLoading } = useLanyard(discordId);

  if (error) console.error("Error loading discord status");

  // Fallback for loading state
  if (!data || isLoading) {
    return (
      <Skeleton className="my-0.5 h-5 w-40 rounded-sm bg-neutral-800/75" />
    );
  } else {
    const statusText =
      data.discord_status === "dnd"
        ? "online. (do not disturb)"
        : `${data.discord_status}.`;

    // Ensure activities array is defined and not empty
    const lastActivity = data.activities[data.activities.length - 1];
    const activityName = lastActivity?.name;
    const startTime = lastActivity?.timestamps?.start;

    const playing = activityName
      ? `Playing: ${activityName}`
      : "On his desktop. not doing anything! 📡🛰️";

    const playingFor = startTime ? relativeTime(new Date(startTime)) : "";

    const onlineState =
      `${author.name} is currently ${statusText} and ${playing} ${playingFor}`.replace(
        /[.:]/g,
        ""
      );

    // Save online state to browser cookie
    if (typeof window !== "undefined") {
      document.cookie = `onlineState=${onlineState}`;
    }

    return (
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger
          href="/"
          className="flex select-none items-center gap-2 pl-[1px]"
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
          sideOffset={0}
          align="start"
          className="w-60 space-y-1 rounded-md border-4 border-dashed border-emerald-600/40 bg-zinc-800 p-2 text-sm"
        >
          <h4 className="font-semibold">Id: omarx11</h4>
          {data.discord_status !== "offline" ? (
            <>
              <p>{playing}</p>
              {startTime && (
                <p className="pt-2 text-xs text-neutral-400">{playingFor}</p>
              )}
            </>
          ) : (
            <p>Maybe {`he's`} sleeping 💤 or outside his room 🚪</p>
          )}
        </HoverCardContent>
      </HoverCard>
    );
  }
}
