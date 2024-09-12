"use client";

import Image from "next/image";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { StatementContext } from "@/app/context/statement";
import { getStatsPerGame } from "../actions";
import Pagination from "./Pagination";
import { CountUp } from "use-count-up";
import { LoadingDots } from "@/app/components/icons/LoadingDots";
import { cn } from "@/app/lib/utils";

export default function GameStats() {
  const { gameAppId, gameAppName, isLoadingGame, setIsLoadingGame } =
    useContext(StatementContext);
  const [achievementPage, setAchievementPage] = useState<number>(1);
  const [gameStats, setGameStats] = useState<GameStats | null>(null);

  const achievementPerPage = 11;

  useEffect(() => {
    if (gameAppId) {
      (async () => {
        const data = await getStatsPerGame(gameAppId);
        setGameStats(data);

        setAchievementPage(1);

        if (isLoadingGame) {
          setTimeout(() => {
            document.getElementById("gameStats")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 50);
          setIsLoadingGame(false);
        }
      })();
    }
  }, [gameAppId, isLoadingGame, setIsLoadingGame]);

  const achievements = useMemo(() => {
    return (
      gameStats?.[1]?.game?.availableGameStats?.achievements
        ?.filter((app1) =>
          gameStats?.[0]?.playerstats?.achievements?.some(
            (app2) => app2.achieved !== 0 && app1.name === app2.apiname
          )
        )
        .map((achievement) => {
          const match = gameStats?.[0]?.playerstats?.achievements?.find(
            (stat) => stat.apiname === achievement.name
          );
          if (match) achievement.unlocktime = match.unlocktime;
          return achievement;
        }) || []
    );
  }, [gameStats]);

  const gameDetails = useMemo(
    () => gameStats?.[2]?.playerstats?.stats || [],
    [gameStats]
  );

  const achievementsLength = achievements.length;
  const totalAchievementPages = useMemo(
    () => Math.ceil(achievementsLength / achievementPerPage),
    [achievementsLength]
  );

  const currentAchievementPage = useMemo(() => {
    return achievements.slice(
      (achievementPage - 1) * achievementPerPage,
      achievementPage * achievementPerPage
    );
  }, [achievements, achievementPage, achievementPerPage]);

  const handlePageChange = useCallback(
    (page: number) => setAchievementPage(page),
    []
  );

  if (!gameStats) return null;

  return (
    <>
      <div className="mb-6 mt-10 h-5 border-b-8 border-neutral-900 text-center sm:mb-2 sm:mt-6">
        <span className="inline-block bg-black px-3 text-neutral-400 sm:px-5">
          {!isLoadingGame ? (
            <span className="line-clamp-1 text-sm sm:text-xl">
              {gameAppName}
            </span>
          ) : (
            <LoadingDots className="h-8 w-8 scale-150" />
          )}
        </span>
      </div>
      <div
        className="flex flex-wrap-reverse gap-10 overflow-hidden pt-6 sm:max-h-[780px] sm:flex-nowrap sm:gap-2"
        id="gameStats"
      >
        {/* Game Stats Table */}
        <div
          className={cn(
            "w-full overflow-y-auto overflow-x-hidden text-center",
            {
              "border-x-2 border-neutral-800":
                !gameDetails.length && !achievementsLength,
              "sm:w-[76.3%]": gameDetails.length > 0,
            }
          )}
        >
          {gameDetails.length > 0 ? (
            <table className="w-full overflow-y-auto">
              <thead className="sticky top-0 bg-neutral-900 text-neutral-200 ring-1 ring-black">
                <tr>
                  <th className="rounded-sm border border-neutral-600">Name</th>
                  <th className="rounded-sm border border-neutral-600">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {gameDetails.map((stat) => (
                  <tr key={stat.name} className="group hover:bg-neutral-900">
                    <td className="line-clamp-1 py-0.5 text-start text-neutral-300 group-hover:text-amber-500">
                      {stat.name.replace(/_/g, " ")}
                    </td>
                    <td className="w-auto pl-1 font-bold text-emerald-500 sm:min-w-[112px] sm:max-w-[112px]">
                      <CountUp
                        isCounting
                        end={Math.round(stat.value * 100000) / 100000}
                        duration={3.2}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span className="w-full text-sm text-red-300 sm:text-base">
              No stats available for this game.
            </span>
          )}
        </div>

        {/* Achievements Section */}
        <div
          className={cn(
            "flex w-full flex-col justify-between gap-4 text-center",
            {
              "border-x-2 border-neutral-800":
                !gameDetails.length && !achievementsLength,
            }
          )}
        >
          {achievementsLength > 0 ? (
            <>
              <div className="fade-in-left flex flex-col gap-2">
                {currentAchievementPage.map((achievement) => (
                  <div
                    key={achievement.name}
                    className="group flex gap-3 rounded-md bg-neutral-900 p-1 duration-300 hover:bg-neutral-800"
                  >
                    <Image
                      src={achievement.icon}
                      width={48}
                      height={48}
                      placeholder="blur"
                      blurDataURL="/static/icons/blur.svg"
                      className="drag-none h-10 w-10 select-none rounded-sm bg-neutral-800 duration-75 group-hover:scale-125 sm:h-12 sm:w-12"
                      alt={`${achievement.displayName} icon`}
                    />
                    <div className="flex flex-col justify-between text-start text-sm">
                      <p className="mt-1 text-neutral-100">
                        {achievement.displayName}
                      </p>
                      <p className="line-clamp-1 text-xs text-neutral-400 sm:text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                pages={totalAchievementPages}
                state={{ page: achievementPage, window: 4 }}
                onPageChange={handlePageChange}
                className="mt-2 justify-end"
                note={false}
              />
            </>
          ) : (
            <span className="text-sm text-red-300 sm:text-base">
              No achievements are unlocked for this game.
            </span>
          )}
        </div>
      </div>
    </>
  );
}
