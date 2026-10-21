import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import type { RecentGame } from "../types";
import type { GameActions } from "./Games";
import { RECENT_GAME_NAME } from "./GamesSkeleton";

export default function RecentGames({
  games,
  actions,
}: {
  games: RecentGame[] | null;
  actions: GameActions;
}) {
  return (
    <>
      <h2 className="mb-4 text-lg font-bold text-neutral-300 sm:text-xl">
        <span className="text-emerald-500">#</span> Recently Played Games 🕹️
      </h2>
      {!games ? (
        <SteamUnavailable />
      ) : games.length === 0 ? (
        <p className="text-sm text-neutral-500">
          No games played in the last two weeks.
        </p>
      ) : (
        <div className="fade-in-up flex min-h-[225px] flex-row flex-wrap gap-4 sm:min-h-[308px]">
          {games.map((game) => {
            const selected = game.appid === actions.selectedAppId;
            return (
              <div key={game.appid}>
                <p className="text-sm text-emerald-500 select-none">
                  {game.hours} hrs
                </p>
                <button
                  aria-pressed={selected}
                  className="group flex flex-col text-xs sm:text-sm"
                  onClick={() => actions.select(game.appid)}
                  onFocus={() => actions.preload(game.appid)}
                  onPointerEnter={() => actions.preload(game.appid)}
                  type="button"
                >
                  <div className="mt-1 max-w-[110px] group-hover:underline sm:max-w-[160px]">
                    <Cover
                      name={game.name}
                      selected={selected}
                      src={game.cover}
                    />
                    <p
                      className={cn(
                        RECENT_GAME_NAME,
                        "line-clamp-2 text-start text-neutral-300 group-hover:text-transparent",
                        { "text-transparent": selected },
                      )}
                    >
                      {game.name}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function Cover({
  src,
  name,
  selected,
}: {
  src: string | null;
  name: string;
  selected: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      alt={name}
      blurDataURL="/static/icons/blur.svg"
      className={cn(
        "aspect-[2/3] w-40 rounded-md bg-neutral-900 object-cover ring-4 ring-transparent duration-100 group-hover:scale-105",
        selected ? "scale-95 ring-emerald-400" : "group-hover:ring-yellow-500",
      )}
      height={384}
      onError={() => setFailed(true)}
      placeholder="blur"
      src={!src || failed ? "/static/images/steam-fallback.jpg" : src}
      width={256}
    />
  );
}

export function SteamUnavailable() {
  return (
    <p className="rounded-md border border-neutral-800 bg-neutral-950 p-4 text-sm text-neutral-400">
      Steam data is unavailable right now. Please check back later.
    </p>
  );
}
