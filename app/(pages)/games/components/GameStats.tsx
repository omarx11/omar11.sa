"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { StatementContext } from "@/app/context/statement";
import { getStatsPerGame } from "../actions";
import Pagination from "./Pagination";
import { CountUp } from "use-count-up";

export default function GameStats() {
  const { gameAppId, setIsLoadingGame, isLoadingGame } =
    useContext(StatementContext);
  const [achievementPage, setAchievementPage] = useState<number>(1);
  const [gameStats, setGameStats] = useState<GameStats | null>(null);

  const achievementPerPage = 11;

  useEffect(() => {
    if (gameAppId) {
      (async () => {
        const data = await getStatsPerGame(gameAppId);
        setGameStats(data);

        if (achievementPage !== 1) setAchievementPage(1);

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
  }, [gameAppId]);

  if (!gameStats) return null;

  const achievements =
    gameStats[1].game?.availableGameStats?.achievements?.filter((app1) =>
      gameStats[0].playerstats?.achievements?.some(
        (app2) => app2.achieved !== 0 && app1.name === app2.apiname
      )
    ) || [];

  const achievementsLength = achievements.length;

  achievements.forEach((achievement) => {
    const isMatch = gameStats[0].playerstats?.achievements?.find(
      (e) => e.apiname === achievement.name
    );

    if (isMatch) {
      achievement.unlocktime = isMatch.unlocktime;
    }
  });

  const gameDetails = gameStats[2].playerstats?.stats || [];
  const totalAchievementsPages = Math.ceil(
    achievementsLength / achievementPerPage
  );
  const currentAchievementPage = achievements.slice(
    (achievementPage - 1) * achievementPerPage,
    achievementPage * achievementPerPage
  );

  const handlePageChange = (page: number) => setAchievementPage(page);

  return (
    <div
      className="mt-10 flex flex-wrap-reverse gap-10 overflow-hidden border-t-8 border-neutral-900 pt-6 sm:max-h-[780px] sm:flex-nowrap sm:gap-2"
      id="gameStats"
    >
      <div className="w-full overflow-auto sm:w-[76.3%]">
        <table className="w-full border-separate text-neutral-200">
          <thead>
            <tr className="bg-neutral-900">
              <th className="border border-neutral-700">Name</th>
              <th className="border border-neutral-700">Value</th>
            </tr>
          </thead>
          <tbody>
            {gameDetails.length > 0 ? (
              gameDetails.map((value) => (
                <tr
                  key={value.name}
                  className="hover:bg-neutral-900 hover:text-neutral-50"
                >
                  <td className="line-clamp-1 py-0.5">
                    {value.name.replace(/_/g, " ")}
                  </td>
                  <td className="w-auto pl-1 font-bold text-emerald-500 sm:min-w-[112px] sm:max-w-[112px]">
                    <CountUp isCounting end={value.value} duration={3.2} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-2 text-sm text-red-300">
                  No Stats For The Game..
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex w-full flex-col justify-between gap-4">
        {achievementsLength > 0 ? (
          <>
            <div className="flex flex-col gap-2">
              {currentAchievementPage.map((app) => (
                <div
                  key={app.name}
                  className="flex gap-3 rounded-md bg-neutral-900 p-1 duration-75 hover:scale-105 hover:bg-neutral-800"
                >
                  <Image
                    src={app.icon}
                    width={48}
                    height={48}
                    placeholder="blur"
                    blurDataURL="/static/icons/blur.svg"
                    className="drag-none h-10 w-10 select-none rounded-sm bg-neutral-800 sm:h-12 sm:w-12"
                    alt=""
                  />
                  <div className="flex flex-col justify-between text-sm">
                    <p className="mt-1 text-neutral-100">{app.displayName}</p>
                    <p className="line-clamp-1 text-xs text-neutral-400 sm:text-sm">
                      {app.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              pages={totalAchievementsPages}
              state={{ page: achievementPage, window: 4 }}
              onPageChange={handlePageChange}
              className="mt-2 justify-end"
              note={false}
            />
          </>
        ) : (
          <p className="p-2 text-red-300">No Achievements For The Game..</p>
        )}
      </div>
    </div>
  );
}
