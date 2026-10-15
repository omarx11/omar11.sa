import Image from "next/image";
import { useState } from "react";
import { CountUp } from "use-count-up";

import { LoadingDots } from "@/app/components/icons/LoadingDots";
import { cn } from "@/app/lib/utils";

import type { GameStats as GameStatsData } from "../types";
import Pagination from "./Pagination";

const ACHIEVEMENTS_PER_PAGE = 11;

const unlockDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

export default function GameStats({
  stats,
  loading,
  error,
  onRetry,
}: {
  stats: GameStatsData | null;
  loading: boolean;
  error: boolean;
  onRetry: () => void;
}) {
  return (
    <section aria-busy={loading} className="scroll-mt-4" id="game-stats">
      <div className="mt-10 mb-6 h-5 border-neutral-900 border-b-8 text-center sm:mt-6 sm:mb-2">
        <h2 className="inline-block bg-black px-3 text-neutral-400 sm:px-5">
          {loading || !stats ? (
            <LoadingDots className="h-8 w-8 scale-150" />
          ) : (
            <span className="line-clamp-1 text-sm sm:text-xl">
              {stats.name}
            </span>
          )}
        </h2>
      </div>
      {error ? (
        <p className="pt-6 text-center text-red-300 text-sm sm:text-base">
          Couldn&apos;t load this game&apos;s stats.{" "}
          <button
            className="text-neutral-200 underline hover:no-underline"
            onClick={onRetry}
            type="button"
          >
            Try again
          </button>
        </p>
      ) : (
        stats && (
          // Keyed by game so pagination and counters reset per game.
          <StatsBody key={stats.appid} loading={loading} stats={stats} />
        )
      )}
    </section>
  );
}

function StatsBody({
  stats,
  loading,
}: {
  stats: GameStatsData;
  loading: boolean;
}) {
  const [page, setPage] = useState(1);
  const { achievements, totalAchievements, stats: values } = stats;
  const empty = values.length === 0 && achievements.length === 0;
  const pageAchievements = achievements.slice(
    (page - 1) * ACHIEVEMENTS_PER_PAGE,
    page * ACHIEVEMENTS_PER_PAGE,
  );

  return (
    <div
      className={cn(
        "flex flex-wrap-reverse gap-10 overflow-hidden pt-6 transition-opacity duration-200 sm:max-h-[820px] sm:flex-nowrap sm:gap-2",
        { "opacity-50": loading },
      )}
    >
      <div
        className={cn("w-full overflow-y-auto overflow-x-hidden text-center", {
          "border-neutral-800 border-x-2": empty,
          "sm:w-[76.3%]": values.length > 0,
        })}
      >
        {values.length > 0 ? (
          <table className="w-full">
            <thead className="sticky top-0 bg-neutral-900 text-neutral-200 ring-1 ring-black">
              <tr>
                <th className="rounded-xs border border-neutral-600">Name</th>
                <th className="rounded-xs border border-neutral-600">Value</th>
              </tr>
            </thead>
            <tbody>
              {values.map((stat) => (
                <tr className="group hover:bg-neutral-900" key={stat.name}>
                  <td className="line-clamp-1 py-0.5 text-start text-neutral-300 group-hover:text-amber-500">
                    {stat.name}
                  </td>
                  <td className="w-auto pl-1 font-bold text-emerald-500 sm:min-w-[112px] sm:max-w-[112px]">
                    <CountUp duration={3.2} end={stat.value} isCounting />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span className="w-full text-red-300 text-sm sm:text-base">
            No stats available for this game.
          </span>
        )}
      </div>

      <div
        className={cn(
          "flex w-full flex-col justify-between gap-4 text-center",
          {
            "border-neutral-800 border-x-2": empty,
          },
        )}
      >
        {achievements.length > 0 ? (
          <>
            <div className="flex flex-col gap-2">
              <p className="text-start text-neutral-400 text-sm">
                <span className="font-bold text-emerald-400">
                  {achievements.length}
                </span>{" "}
                / {totalAchievements} achievements unlocked
              </p>
              <div className="fade-in-left flex flex-col gap-2" key={page}>
                {pageAchievements.map((achievement) => (
                  <div
                    className="group flex gap-3 rounded-md bg-neutral-900 p-1 duration-300 hover:bg-neutral-800"
                    key={achievement.id}
                  >
                    <Image
                      alt=""
                      blurDataURL="/static/icons/blur.svg"
                      className="drag-none h-10 w-10 shrink-0 select-none rounded-xs bg-neutral-800 duration-75 group-hover:scale-125 sm:h-12 sm:w-12"
                      height={48}
                      placeholder="blur"
                      src={achievement.icon}
                      unoptimized
                      width={48}
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-between text-start text-sm">
                      <p className="mt-1 flex justify-between gap-2 text-neutral-100">
                        <span className="truncate">{achievement.name}</span>
                        {achievement.unlockedAt > 0 && (
                          <span className="shrink-0 pr-1 text-neutral-500 text-xs">
                            {unlockDate.format(achievement.unlockedAt * 1000)}
                          </span>
                        )}
                      </p>
                      <p className="line-clamp-1 text-neutral-400 text-xs sm:text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Pagination
              className="mt-2 justify-end"
              note={false}
              onPageChange={setPage}
              pages={Math.ceil(achievements.length / ACHIEVEMENTS_PER_PAGE)}
              state={{ page, window: 4 }}
            />
          </>
        ) : (
          <span className="text-red-300 text-sm sm:text-base">
            No achievements are unlocked for this game.
          </span>
        )}
      </div>
    </div>
  );
}
