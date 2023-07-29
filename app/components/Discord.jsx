"use client";

import { useLanyard } from "use-lanyard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

function Colors({ status, className }) {
  let color = "";
  if (status == "online") {
    color = `bg-[#1db954] animate-online border-green-300 ${className}`;
  } else if (status == "idle") {
    color = `bg-yellow-400 border-yellow-300 ${className}`;
  } else if (status == "offline") {
    color = `bg-transparent border-[3px] border-stone-300 ${className}`;
  } else if (status == "dnd") {
    color = `bg-rose-400 border-rose-300 ${className}`;
  }

  return <span className={color}></span>;
}

export default function Discord({ id }) {
  const { data } = useLanyard(id);
  if (data === undefined)
    return (
      <span className="h-4 w-36 animate-pulse rounded-sm bg-stone-700"></span>
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
      activitie === undefined ? "on desktop" : `Playing: ${activitie}`;

    return (
      <>
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger
            href="/"
            className="flex select-none items-center gap-2 pl-[1px]"
          >
            <Colors
              status={data.discord_status}
              className="relative mx-[2px] h-3 w-3 rounded-full"
            />
            <p>currently {status}</p>
          </HoverCardTrigger>
          <HoverCardContent
            sideOffset={0}
            align="start"
            className="w-60 rounded-md bg-stone-700 p-2"
          >
            <div className="space-y-1 text-sm">
              <h4 className="font-semibold">Omar#0135</h4>
              {data.discord_status !== "offline" ? (
                <>
                  <p>{playing}</p>
                  <div className="pt-2 text-xs">for 21 minutes</div>
                </>
              ) : (
                <p>Maybe he's sleeping 💤 or outside his room 🚪</p>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      </>
    );
  } else return <></>;
}
