"use client";

import { useEffect, useState } from "react";
import { getAllGames } from "../actions";
import RecentGames from "./RecentGames";
import GamesCollection from "./GamesCollection";
import GameStats from "./GameStats";

export default function Games() {
  const [recentlyPlayedArr, setRecentlyPlayedArr] =
    useState<RecentlyPlayedGames | null>(null);
  const [ownedGamesArr, setOwnedGamesArr] = useState<OwnedGames | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { recentlyPlayed, ownedGames } = await getAllGames();
        setRecentlyPlayedArr(recentlyPlayed);
        setOwnedGamesArr(ownedGames);
      } catch (error) {
        console.error("Failed to fetch games data:", error);
      }
    })();
  }, []);

  return (
    <>
      <RecentGames recentGames={recentlyPlayedArr} />
      <GamesCollection ownedGames={ownedGamesArr} />
      <GameStats />
    </>
  );
}
