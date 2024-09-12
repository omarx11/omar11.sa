import Image from "next/image";
import { useContext } from "react";
import { StatementContext } from "@/app/context/statement";
import { Skeleton } from "@/app/components/ui/Skeleton";
import { Loading } from "@/app/components/icons/Loading";
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
      <p className="mb-4 text-xl font-bold text-neutral-300">
        <span className="text-emerald-500">#</span> Recently Played Games{" "}
        {recentGames ? "🕹️" : <Loading className="inline animate-spin" />}
      </p>
      <div className="fade-in-up line-clamp-1 flex min-h-[225px] flex-row flex-wrap gap-4 overflow-visible sm:min-h-[308px]">
        {recentGames
          ? recentGames.games.slice(0, 5).map((game) => (
              <div key={game.appid}>
                <p
                  className={cn("select-none text-sm text-emerald-500", {
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
                      key={game.appid}
                      src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`}
                      width={256}
                      height={384}
                      placeholder="blur"
                      blurDataURL="/static/icons/blur.svg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.srcset = "/static/images/steam_error.jpg";
                      }}
                      className={cn(
                        "drag-none w-40 select-none rounded-md bg-neutral-900 ring-4 ring-transparent duration-100 group-hover:scale-105",
                        {
                          "opacity-150 scale-95 ring-emerald-400":
                            game.appid === gameAppId,
                          "group-hover:ring-yellow-500":
                            game.appid !== gameAppId,
                        }
                      )}
                      alt={game.name}
                    />
                    <p
                      className={cn(
                        "line-clamp-2 pt-1 text-start text-neutral-300 text-opacity-100 group-hover:text-opacity-0",
                        {
                          "line-clamp-2 text-opacity-0":
                            game.appid === gameAppId,
                        }
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
                key={i}
                className="mt-5 h-[165px] w-[110px] rounded-md sm:h-60 sm:w-40"
              />
            ))}
      </div>
    </>
  );
}
