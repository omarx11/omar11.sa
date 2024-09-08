import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { StatementContext } from "@/app/context/statement";
import Pagination from "./Pagination";
import { Skeleton } from "@/app/components/ui/Skeleton";
import { Loading } from "@/app/components/icons/Loading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/Tooltip";
import { cn } from "@/app/lib/utils";

export default function GamesCollection({
  ownedGames,
}: {
  ownedGames: OwnedGames | null;
}) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    isLoadingGame,
    gameAppId,
    totalPlayTime,
    setIsLoadingGame,
    setGameAppId,
    setTotalPlayTime,
  } = useContext(StatementContext);

  const itemsPerPage = 22;
  const targetIds = [
    12120, 12250, 407530, 596350, 747350, 755790, 700580, 878760, 640590,
    1449560, 34330, 371140, 342230, 431960,
  ]; // filter multiple games by there ids.

  // Sorting by playtime + filtered games that i don't want to show.
  const gamesArray =
    ownedGames?.games
      .sort((a, b) => b.playtime_forever - a.playtime_forever)
      .filter((item) => !targetIds.includes(item.appid)) || [];

  const totalItems = gamesArray.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const currentItems = gamesArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (!totalPlayTime) {
      // time is multiplied by 60 to display the correct time later
      const playtimeToAdd: Record<string, number> = {
        "Overwatch® 2": 126000,
        "Assassin's Creed Odyssey": 6420,
        "Far Cry New Dawn": 960,
      };

      let playedTime = 0;

      for (let i = 0; i < totalItems; i++) {
        // Add hours to the selected game.
        const game = gamesArray[i];
        if (game.name in playtimeToAdd)
          game.playtime_forever += playtimeToAdd[game.name];

        // Collect all game hours.
        playedTime += gamesArray[i].playtime_forever;
      }

      // added 382 hours from games outside steam like: Genshin Impact, etc.
      // total games hours multiplied by 60
      setTotalPlayTime(playedTime + 22920);
    }

    return () => {
      // optional cleanup logic if needed
    };
  }, []);

  return (
    <>
      <div className="mb-4 mt-8 flex items-center justify-between text-opacity-50">
        <h2 className="text-xl font-bold text-neutral-300">
          <span className="text-emerald-500">#</span> Full Games Collection{" "}
          {!isLoadingGame ? (
            ownedGames && "🕹️"
          ) : (
            <Loading className="inline animate-spin" />
          )}
        </h2>
        {ownedGames ? (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-xs text-neutral-400 sm:text-sm">
                  <span className="text-neutral-300">{totalItems}</span> game
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
              <TooltipContent className="rounded-sm bg-emerald-900 ring-2 ring-emerald-950">
                <p>
                  Total play time {"> "}
                  <span className="text-neutral-300">
                    {Math.floor((totalPlayTime ?? 0) / 60)} hours
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
          {
            "fade-in-up": !ownedGames,
          }
        )}
      >
        {ownedGames ? (
          <TooltipProvider delayDuration={0} disableHoverableContent>
            {currentItems.map((game) => (
              <Tooltip key={game.appid}>
                <TooltipTrigger
                  aria-label={game.name}
                  className={cn("rounded-sm transition-transform duration-75", {
                    "pointer-events-none opacity-50": isLoadingGame,
                    "pointer-events-none scale-95 opacity-100 ring-4 ring-emerald-400":
                      game.appid === gameAppId,
                    "ring-neutral-200 hover:ring-2 focus:ring-2":
                      game.appid !== gameAppId,
                  })}
                  onClick={() => {
                    setIsLoadingGame(true);
                    setGameAppId(game.appid);
                  }}
                >
                  <Image
                    src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`}
                    width={256}
                    height={120}
                    placeholder="blur"
                    blurDataURL="/static/icons/blur.svg"
                    className="drag-none h-[75.27px] w-[160.6px] select-none rounded-sm bg-neutral-900"
                    alt={game.name}
                  />
                </TooltipTrigger>
                <TooltipContent
                  align="start"
                  className="rounded-sm bg-neutral-800"
                >
                  <p className="underline decoration-neutral-300">
                    {game.name}
                  </p>
                  <span className="block text-xs text-emerald-300">
                    {Math.floor((game.playtime_forever / 60) * 10) / 10} hours
                    total
                  </span>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        ) : (
          [...Array(itemsPerPage)].map((_, i) => (
            <Skeleton key={i} className="rounded-sm sm:h-[75px] sm:w-40" />
          ))
        )}
      </div>
      <Pagination
        pages={totalPages}
        state={{ page: currentPage, window: 5 }}
        onPageChange={handlePageChange}
        note={true}
      />
    </>
  );
}
