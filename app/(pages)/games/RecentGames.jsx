"use client";
import { StatementContext } from "@/app/context/statement";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { useContext } from "react";

export default function RecentGames({ data }) {
  const { isLoadingGame, setIsLoadingGame, setGameAppId, gameAppId } =
    useContext(StatementContext);

  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-neutral-300">
        <span className="text-emerald-500">#</span> Recently Played Games{" "}
        {data ? (
          "🧩"
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            className="inline animate-spin"
          >
            <g fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                clipRule="evenodd"
                opacity=".2"
              />
              <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
            </g>
          </svg>
        )}
      </h2>
      <div className="fade-in-up line-clamp-1 flex flex-row flex-wrap gap-4 overflow-visible">
        {data.total_count !== 0 &&
          data.games.slice(0, 5).map((game, i) => (
            <button
              key={game.appid}
              className={cn("group flex flex-col text-xs sm:text-sm", {
                "pointer-events-none": isLoadingGame,
                "pointer-events-none": game.appid === gameAppId,
              })}
              onClick={(e) => {
                setIsLoadingGame(true);
                setGameAppId(game.appid);
              }}
            >
              <p className="text-emerald-500">
                {Math.floor((game.playtime_2weeks / 60) * 10) / 10} hrs
              </p>
              <div className="mt-1 max-w-[110px] group-hover:underline sm:max-w-[160px]">
                <Image
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`}
                  width={256}
                  height={384}
                  placeholder="blur"
                  blurDataURL="/static/icons/blur.svg"
                  className={cn(
                    "drag-none w-40 select-none rounded-md bg-neutral-900 duration-150 group-hover:scale-105",
                    {
                      "opacity-50": isLoadingGame,
                      "scale-95 opacity-100 ring-4 ring-emerald-400 duration-100":
                        game.appid === gameAppId,
                      "ring-neutral-300 group-hover:ring-4 group-focus:ring-2":
                        game.appid !== gameAppId,
                    },
                  )}
                  alt=""
                />
                <p className="mt-1 line-clamp-2 text-start text-neutral-300 duration-150 group-hover:translate-y-1">
                  {game.name}
                </p>
              </div>
            </button>
          ))}
      </div>
    </>
  );
}
