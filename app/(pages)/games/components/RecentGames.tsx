import Image from "next/image";
import { useContext } from "react";

import { Loading } from "@/app/components/icons/Loading";
import { Skeleton } from "@/app/components/ui/Skeleton";
import { StatementContext } from "@/app/context/statement";
import { cn } from "@/app/lib/utils";

export default function RecentGames({
  recentGames,
}: {
  recentGames: RecentlyPlayedGames | null;
}) {
  const {
    gameAppId,
    isLoadingGame,
    setGameAppId,
    setGameAppName,
    setIsLoadingGame,
  } = useContext(StatementContext);

  return (
    <>
      <p className="mb-4 font-bold text-neutral-300 text-xl">
        <span className="text-emerald-500">#</span> Recently Played Games{" "}
        {recentGames ? "🕹️" : <Loading className="inline animate-spin" />}
      </p>
      <div className="fade-in-up line-clamp-1 flex min-h-[225px] flex-row flex-wrap gap-4 overflow-visible sm:min-h-[308px]">
        {recentGames
          ? recentGames.games.slice(0, 5).map((game) => (
              <div key={game.appid}>
                <p
                  className={cn("select-none text-emerald-500 text-sm", {
                    "select-none text-opacity-50": isLoadingGame,
                  })}
                >
                  {Math.floor((game.playtime_2weeks / 60) * 10) / 10} hrs
                </p>
                <button
                  className={cn("group flex flex-col text-xs sm:text-sm", {
                    "pointer-events-none opacity-50": isLoadingGame,
                    "pointer-events-none select-none": game.appid === gameAppId,
                  })}
                  onClick={() => {
                    setIsLoadingGame(true);
                    setGameAppId(game.appid);
                    setGameAppName(game.name);
                  }}
                >
                  <div className="mt-1 max-w-[110px] group-hover:underline sm:max-w-[160px]">
                    <Image
                      alt={game.name}
                      blurDataURL="/static/icons/blur.svg"
                      className={cn(
                        "drag-none w-40 select-none rounded-md bg-neutral-900 ring-4 ring-transparent duration-100 group-hover:scale-105",
                        {
                          "scale-95 opacity-150 ring-emerald-400":
                            game.appid === gameAppId,
                          "group-hover:ring-yellow-500":
                            game.appid !== gameAppId,
                        },
                      )}
                      height={384}
                      key={game.appid}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.srcset = "/static/images/steam_error.jpg";
                      }}
                      placeholder="blur"
                      src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`}
                      width={256}
                    />
                    <p
                      className={cn(
                        "line-clamp-2 pt-1 text-start text-neutral-300 text-opacity-100 group-hover:text-opacity-0",
                        {
                          "line-clamp-2 text-opacity-0":
                            game.appid === gameAppId,
                        },
                      )}
                    >
                      {game.name}
                    </p>
                  </div>
                </button>
              </div>
            ))
          : [...Array(4)].map((_, i) => (
              <Skeleton
                className="mt-5 h-[165px] w-[110px] rounded-md sm:h-60 sm:w-40"
                key={i}
              />
            ))}
      </div>
    </>
  );
}
