"use client";
import { CnoUp } from "@/app/hooks/useCountUp";
import Image from "next/image";
import Pagination from "./Pagination";
import { useContext, useEffect, useState } from "react";
import { getStatsPerGame } from "../../lib/getStatsPerGame";
import { StatementContext } from "@/app/context/statement";

export default function GameDetails() {
  const { gameAppId, setIsLoadingGame, isLoadingGame } =
    useContext(StatementContext);
  const [achievementPage, setAchievementPage] = useState(1);
  const [gameStats, setGameStats] = useState(null);
  const achievementPerPage =
    gameStats &&
    gameStats[2].playerstats?.stats?.length &&
    gameStats[2].playerstats?.stats?.length > 20
      ? gameStats[2].playerstats.stats.length / 2
      : 11;

  useEffect(() => {
    if (gameAppId)
      (async () => {
        const data = await getStatsPerGame(gameAppId);
        setGameStats(data);
        setIsLoadingGame(false);

        setTimeout(() => {
          document.getElementById("gameStats")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      })();
  }, [gameAppId]);

  if (gameStats) {
    const achievements =
      gameStats[1].game.availableGameStats?.achievements?.filter((app1) =>
        gameStats[0].playerstats.achievements.some(
          (app2) => app2.achieved !== 0 && app1.name === app2.apiname,
        ),
      );

    const achievementsLength = achievements?.length;

    for (let i = 0; i < achievementsLength; i++) {
      const achievement = achievements[i];

      const isMatch = gameStats[0].playerstats.achievements.find(
        (e) => e.apiname === achievement.name,
      );

      if (isMatch) {
        achievement.unlocktime = isMatch.unlocktime;
      }
    }

    const gameDetails = gameStats[2].playerstats?.stats;

    const totalAchievementsPages = Math.ceil(
      achievementsLength / achievementPerPage,
    );

    const handlePageChange = (page) => setAchievementPage(page);

    const currentAchievementPage = achievements?.slice(
      (achievementPage - 1) * achievementPerPage,
      achievementPage * achievementPerPage,
    );

    return (
      <div
        className="mt-10 flex flex-wrap gap-2 border-t-2 border-neutral-600 pt-6 sm:flex-nowrap"
        id="gameStats"
      >
        <div className="w-full sm:w-[76.3%]">
          <div className="mb-4 flex items-center gap-4">
            <p className="max-w-max rounded-sm bg-emerald-700 px-1 text-xl font-bold text-neutral-100">
              My Game Stats
            </p>
            {!isLoadingGame ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 512 512"
              >
                <rect
                  width="48"
                  height="160"
                  x="64"
                  y="320"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  rx="8"
                  ry="8"
                />
                <rect
                  width="48"
                  height="256"
                  x="288"
                  y="224"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  rx="8"
                  ry="8"
                />
                <rect
                  width="48"
                  height="368"
                  x="400"
                  y="112"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  rx="8"
                  ry="8"
                />
                <rect
                  width="48"
                  height="448"
                  x="176"
                  y="32"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  rx="8"
                  ry="8"
                />
              </svg>
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
          </div>
          <table className="w-full border-separate overflow-hidden border-2 border-neutral-800 text-neutral-200">
            <thead>
              <tr className="bg-neutral-900">
                <th className="border border-neutral-700">Name</th>
                <th className="border border-neutral-700">Value</th>
              </tr>
            </thead>
            <tbody>
              {gameDetails && gameDetails.length !== 0 ? (
                gameDetails.map((value) => (
                  <tr
                    key={value.name}
                    className="hover:bg-neutral-900 hover:text-neutral-50"
                  >
                    <td className="line-clamp-1 py-0.5">
                      {value.name.replace(/_/g, " ")}
                    </td>
                    <td className="w-auto pl-1 font-bold text-emerald-500 sm:min-w-[112px] sm:max-w-[112px]">
                      <CnoUp isCounting end={value.value} duration={3.2} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2 text-sm text-red-300">
                    There is No Stats For The Game..
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full">
          <div className="mb-4 flex flex-wrap items-end justify-between">
            <div className="flex items-center gap-4">
              <p className="max-w-max rounded-sm bg-emerald-700 px-1 text-xl font-bold text-neutral-100">
                Game Achievements Owned
              </p>
              {!isLoadingGame ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M220 96a92 92 0 1 0-152 69.69V240a12 12 0 0 0 17.37 10.73L128 229.42l42.64 21.31A12 12 0 0 0 188 240v-74.31A91.86 91.86 0 0 0 220 96ZM60 96a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68Zm104 124.59l-30.64-15.32a12 12 0 0 0-10.74 0L92 220.58v-39.92a92 92 0 0 0 72 0ZM128 148a52 52 0 1 0-52-52a52.06 52.06 0 0 0 52 52Zm0-80a28 28 0 1 1-28 28a28 28 0 0 1 28-28Z"
                  />
                </svg>
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
            </div>
            <p className="text-sm text-neutral-400">
              {achievementsLength} item
            </p>
          </div>
          {achievements && achievementsLength !== 0 ? (
            <div className="flex flex-col gap-2">
              {currentAchievementPage.map((app) => (
                <div
                  key={app.name}
                  className="flex gap-3 rounded-md bg-neutral-900 p-1 duration-150 hover:scale-105 hover:bg-neutral-800"
                >
                  <Image
                    src={app.icon}
                    width={48}
                    height={48}
                    placeholder="blur"
                    blurDataURL="/static/icons/blur.svg"
                    className="drag-none h-12 w-12 select-none rounded-sm bg-neutral-800"
                    alt=""
                  />
                  <div className="flex flex-col justify-between text-sm">
                    <p className="mt-1">{app.displayName}</p>
                    <p className="line-clamp-1 text-neutral-400">
                      {app.description}
                    </p>
                  </div>
                </div>
              ))}
              <Pagination
                pages={totalAchievementsPages}
                state={{ page: achievementPage, window: 4 }}
                onPageChange={handlePageChange}
                className="justify-end"
                note={false}
              />
            </div>
          ) : (
            <p className="p-2 text-red-300">
              There is No Achievements For The Game..
            </p>
          )}
        </div>
      </div>
    );
  }
}
