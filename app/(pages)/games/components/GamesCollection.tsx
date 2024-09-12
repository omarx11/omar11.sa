import Image from "next/image";
import { useState, useContext, useMemo, useCallback } from "react";
import { StatementContext } from "@/app/context/statement";
import Pagination from "./Pagination";
import { Skeleton } from "@/app/components/ui/Skeleton";
import { Loading } from "@/app/components/icons/Loading";
import { nonSteamGames, playtimeToAdd } from "@/app/config/games";
import { cn } from "@/app/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/Tooltip";

export default function GamesCollection({
  ownedGames,
}: {
  ownedGames: OwnedGames | null;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    isLoadingGame,
    gameAppId,
    setIsLoadingGame,
    setGameAppId,
    setGameAppName,
  } = useContext(StatementContext);

  const itemsPerPage = 22;
  const excludedGameIds = useMemo(
    () => [
      12120, 12250, 407530, 596350, 747350, 755790, 700580, 878760, 640590,
      1449560, 34330, 371140, 342230, 431960,
    ],
    []
  );

  // Filter and sort games outside the render cycle
  const steamGamesArray = useMemo(() => {
    if (!ownedGames) return [];
    return ownedGames.games
      .filter((game) => !excludedGameIds.includes(game.appid))
      .sort((a, b) => b.playtime_forever - a.playtime_forever);
  }, [ownedGames, excludedGameIds]);

  const totalItems = steamGamesArray.length + nonSteamGames.length;
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems]
  );

  const handlePageChange = useCallback(
    (page: number) => setCurrentPage(page),
    []
  );

  // Combine Steam and Non-Steam games
  const allGamesArray = useMemo(() => {
    const allGames = [...steamGamesArray, ...nonSteamGames]
      .map((game) =>
        playtimeToAdd[game.name]
          ? {
              ...game,
              playtime_forever:
                game.playtime_forever + playtimeToAdd[game.name],
            }
          : game
      )
      .sort((a, b) => b.playtime_forever - a.playtime_forever);
    return allGames;
  }, [steamGamesArray]);

  // Get the current items based on pagination
  const currentItems = useMemo(() => {
    return allGamesArray.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [allGamesArray, currentPage, itemsPerPage]);

  // Calculate total playtime once
  const totalPlayTime = useMemo(() => {
    const steamPlaytime = steamGamesArray.reduce((total, game) => {
      const playtime = playtimeToAdd[game.name]
        ? game.playtime_forever + playtimeToAdd[game.name]
        : game.playtime_forever;
      return total + playtime;
    }, 0);

    const nonSteamPlaytime = nonSteamGames.reduce(
      (total, game) => total + game.playtime_forever,
      0
    );

    return steamPlaytime + nonSteamPlaytime;
  }, [steamGamesArray]);

  // Add playtime modifications
  const displayedItems = useMemo(
    () => [
      ...currentItems,
      ...Array(itemsPerPage - currentItems.length).fill(null),
    ],
    [currentItems, itemsPerPage]
  );

  return (
    <>
      <div className="mb-4 mt-8 flex items-center justify-between text-opacity-50">
        <h2 className="text-xl font-bold text-neutral-300">
          <span className="text-emerald-500">#</span> Full Games Collection{" "}
          {!isLoadingGame ? (
            ownedGames && "🎮"
          ) : (
            <Loading className="inline animate-spin" />
          )}
        </h2>
        {ownedGames ? (
          <TooltipProvider delayDuration={0}>
            <Tooltip defaultOpen>
              <TooltipTrigger asChild>
                <p className="cursor-default text-xs text-neutral-400 sm:text-sm">
                  <span className="text-neutral-300">{totalItems}</span> games
                  found
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="ml-1.5 hidden sm:inline"
                  >
                    <path
                      fill="currentColor"
                      d="M1 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5a2 2 0 0 1-1.164 1.818a1.5 1.5 0 0 0-.275-.379l-4-4A1.5 1.5 0 0 0 7 8.5V12H3a2 2 0 0 1-2-2V5Zm7.854 3.146A.5.5 0 0 0 8 8.5v6a.5.5 0 0 0 .9.3l1.35-1.8h2.25a.5.5 0 0 0 .354-.854l-4-4Z"
                    />
                  </svg>
                </p>
              </TooltipTrigger>
              <TooltipContent
                sideOffset={6}
                className="scale-in origin-[var(--radix-tooltip-content-transform-origin)] rounded-sm bg-neutral-900 ring-2 ring-neutral-700"
              >
                <p>
                  Total playtime {"> "}
                  <span className="text-emerald-400">
                    {Math.floor(totalPlayTime / 60)} / hrs
                  </span>
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Skeleton className="h-4 w-[93px] rounded-sm sm:h-5 sm:w-[132px]" />
        )}
      </div>
      <div
        className={cn(
          "flex min-h-[337px] flex-row flex-wrap content-start items-start gap-3",
          { "fade-in-up": !ownedGames }
        )}
      >
        {ownedGames ? (
          <TooltipProvider delayDuration={0} disableHoverableContent>
            {displayedItems.map((game, index) =>
              game ? (
                <Tooltip key={game.name}>
                  <TooltipTrigger
                    aria-label={game.name}
                    className={cn(
                      "rounded-sm ring-2 ring-offset-black transition-transform duration-75 hover:ring-offset-2",
                      {
                        "pointer-events-none opacity-50": isLoadingGame,
                        "pointer-events-none scale-95 opacity-100 ring-4 ring-emerald-400":
                          game.appid === gameAppId,
                        "hover:ring-yellow-500": game.appid !== gameAppId,
                        "cursor-default hover:ring-red-500": game.is_non_steam,
                      }
                    )}
                    onClick={() => {
                      if (game.is_non_steam) return;
                      setIsLoadingGame(true);
                      setGameAppId(game.appid);
                      setGameAppName(game.name);
                    }}
                  >
                    <div className="relative">
                      <Image
                        src={
                          game.image ||
                          `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`
                        }
                        width={256}
                        height={120}
                        placeholder="blur"
                        blurDataURL="/static/icons/blur.svg"
                        className="drag-none h-[75.27px] w-[160.6px] select-none rounded-sm bg-neutral-900"
                        alt={game.name}
                      />
                      {game.appid !== gameAppId && (
                        <p className="absolute left-0 top-0 ml-0.5 text-xs text-yellow-600">
                          #
                          <span className="font-bold text-yellow-500">
                            {index + 1}
                          </span>
                        </p>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    align="start"
                    sideOffset={6}
                    alignOffset={-4}
                    className="rounded-sm border border-neutral-400 bg-neutral-900"
                  >
                    <p className="underline decoration-neutral-300">
                      {game.name}
                    </p>
                    <span className="block text-xs text-emerald-400">
                      {Math.floor((game.playtime_forever / 60) * 10) / 10} hours
                      total
                    </span>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Skeleton
                  key={index}
                  className="rounded-sm sm:h-[75.27px] sm:w-40"
                />
              )
            )}
          </TooltipProvider>
        ) : (
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <Skeleton key={i} className="rounded-sm sm:h-[75px] sm:w-40" />
          ))
        )}
        {ownedGames && (
          <Pagination
            pages={totalPages}
            state={{ page: currentPage, window: 5 }}
            onPageChange={handlePageChange}
            className="fade-in mt-3"
            note={true}
          />
        )}
      </div>
    </>
  );
}
