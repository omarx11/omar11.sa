"use client";
import { useLanyard } from "use-lanyard";
import { relativeTime } from "@/app/lib/relativeTime";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { cn } from "../lib/utils";
import { author } from "../config/meta";

export default function Discord() {
  const { data } = useLanyard(author.discordId);

  if (data === undefined)
    return (
      <span className="my-1 h-4 w-40 animate-pulse rounded-sm bg-neutral-800/75"></span>
    );

  if (data) {
    const status =
      data.discord_status == "dnd" ? (
        <>
          online. <span className="text-sm text-red-500">(do not disturb)</span>
        </>
      ) : (
        data.discord_status + "."
      );

    let activitie = data.activities[0]?.name;

    const playing =
      activitie === undefined
        ? "On his desktop. not doing anything! 📡🛰️"
        : `Playing: ${activitie}`;

    const playingFor = relativeTime(
      new Date(data.activities[0]?.timestamps?.start),
    );

    const onlineState =
      `${author.name} is currently ${status} and ${playing} ${playingFor}`.replace(
        /[.:]/g,
        "",
      );

    // save my online state to browser cookie for later use
    if (typeof window !== "undefined")
      window.document.cookie = `onlineState=${onlineState}`;

    return (
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger
          href="/"
          className="flex select-none items-center gap-2 pl-[1px]"
        >
          <span
            className={cn("online relative mx-[2px] h-3 w-3 rounded-full", {
              "border-red-300 bg-[#1db954]": data.discord_status == "online",
              "border-yellow-300 bg-yellow-400": data.discord_status == "idle",
              "border-[3px] border-neutral-300 bg-transparent":
                data.discord_status == "offline",
              "border-rose-300 bg-rose-400": data.discord_status == "dnd",
            })}
          ></span>
          <p>currently {status}</p>
        </HoverCardTrigger>
        <HoverCardContent
          sideOffset={0}
          align="start"
          className="w-60 space-y-1 rounded-md border-4 border-dashed border-emerald-600/40 bg-zinc-800 p-2 text-sm"
        >
          <h4 className="font-semibold">Id: Omar#0135</h4>
          {data.discord_status !== "offline" ? (
            <>
              <p>{playing}</p>
              {data.activities.length !== 0 && (
                <p className="pt-2 text-xs text-neutral-400">{playingFor}</p>
              )}
            </>
          ) : (
            <p>Maybe he's sleeping 💤 or outside his room 🚪</p>
          )}
        </HoverCardContent>
      </HoverCard>
    );
  } else return <></>;
}
