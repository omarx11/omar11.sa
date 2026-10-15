import Image from "next/image";
import { useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/Tooltip";
import { cn } from "@/app/lib/utils";

import type { CollectionGame } from "../types";
import type { GameActions } from "./Games";
import Pagination from "./Pagination";
import { SteamUnavailable } from "./RecentGames";

const PER_PAGE = 22;

export default function GamesCollection({
  games,
  totalHours,
  actions,
}: {
  games: CollectionGame[] | null;
  totalHours: number;
  actions: GameActions;
}) {
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="mt-8 mb-4 flex items-center justify-between">
        <h2 className="font-bold text-neutral-300 text-xl">
          <span className="text-emerald-500">#</span> Full Games Collection 🎮
        </h2>
        {games && (
          <TooltipProvider delayDuration={0}>
            <Tooltip defaultOpen>
              <TooltipTrigger asChild>
                <p className="cursor-default text-neutral-400 text-xs sm:text-sm">
                  <span className="text-neutral-300">{games.length}</span> games
                  found
                  <svg
                    aria-hidden="true"
                    className="ml-1.5 hidden sm:inline"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5a2 2 0 0 1-1.164 1.818a1.5 1.5 0 0 0-.275-.379l-4-4A1.5 1.5 0 0 0 7 8.5V12H3a2 2 0 0 1-2-2V5Zm7.854 3.146A.5.5 0 0 0 8 8.5v6a.5.5 0 0 0 .9.3l1.35-1.8h2.25a.5.5 0 0 0 .354-.854l-4-4Z"
                      fill="currentColor"
                    />
                  </svg>
                </p>
              </TooltipTrigger>
              <TooltipContent
                className="origin-[var(--radix-tooltip-content-transform-origin)] scale-in rounded-xs bg-neutral-900 ring-2 ring-neutral-700"
                sideOffset={6}
              >
                <p>
                  Total playtime {"> "}
                  <span className="text-emerald-400">{totalHours} / hrs</span>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {games ? (
        <CollectionGrid
          actions={actions}
          games={games}
          onPageChange={setPage}
          page={page}
        />
      ) : (
        <SteamUnavailable />
      )}
    </>
  );
}

function CollectionGrid({
  games,
  page,
  onPageChange,
  actions,
}: {
  games: CollectionGame[];
  page: number;
  onPageChange: (page: number) => void;
  actions: GameActions;
}) {
  const offset = (page - 1) * PER_PAGE;
  const pageGames = games.slice(offset, offset + PER_PAGE);

  return (
    // Loaded cards appear without an entrance animation (only the skeletons
    // animate); the pagination row rises in from below.
    <div className="flex min-h-[337px] flex-row flex-wrap content-start items-start gap-3">
      <TooltipProvider delayDuration={0} disableHoverableContent>
        {pageGames.map((game, index) => {
          const { appid } = game;
          const selected = appid !== null && appid === actions.selectedAppId;
          return (
            <Tooltip key={game.id}>
              <TooltipTrigger
                aria-label={game.name}
                aria-pressed={appid === null ? undefined : selected}
                className={cn(
                  "rounded-xs ring-2 ring-neutral-700 ring-offset-black transition-[transform,box-shadow] duration-75 hover:ring-offset-2",
                  appid === null
                    ? "cursor-default hover:ring-red-500"
                    : selected
                      ? "pointer-events-none scale-95 ring-4 ring-emerald-400"
                      : "hover:ring-yellow-500",
                )}
                onClick={() => appid !== null && actions.select(appid)}
                onFocus={() => appid !== null && actions.preload(appid)}
                onPointerEnter={() => appid !== null && actions.preload(appid)}
              >
                <div className="relative">
                  {game.image ? (
                    <Image
                      alt=""
                      blurDataURL="/static/icons/blur.svg"
                      className="drag-none h-[75.27px] w-[160.6px] select-none rounded-xs bg-neutral-900 object-cover"
                      height={215}
                      placeholder="blur"
                      src={game.image}
                      // Steam's CDN already serves right-sized JPEGs fast;
                      // only local artwork goes through the optimizer.
                      unoptimized={game.image.startsWith("http")}
                      width={460}
                    />
                  ) : (
                    <span className="flex h-[75.27px] w-[160.6px] items-center justify-center rounded-xs bg-neutral-900 px-2 text-center text-neutral-400 text-xs leading-tight">
                      {game.name}
                    </span>
                  )}
                  {!selected && (
                    <p className="absolute top-0 left-0 ml-0.5 text-xs text-yellow-600">
                      #
                      <span className="font-bold text-yellow-500">
                        {offset + index + 1}
                      </span>
                    </p>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent
                align="start"
                alignOffset={-4}
                className="rounded-xs border border-neutral-400 bg-neutral-900"
                sideOffset={6}
              >
                <p className="underline decoration-neutral-300">{game.name}</p>
                <span className="block text-emerald-400 text-xs">
                  {Math.floor((game.minutes / 60) * 10) / 10} hours total
                  {appid === null && " · not on Steam"}
                </span>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
      <Pagination
        className="fade-in mt-3"
        note
        onPageChange={onPageChange}
        pages={Math.ceil(games.length / PER_PAGE)}
        state={{ page, window: 5 }}
      />
    </div>
  );
}
