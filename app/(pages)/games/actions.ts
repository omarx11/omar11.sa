"use server";

import { author } from "@/app/config/meta";

const steamAPIKey = process.env.STEAM_API_KEY;
const cacheTime = 43200; // 12 hours

/**
 * GET Owned Steam Games
 * @returns An array of games.
 */
export const getAllGames = async (): Promise<{
  recentlyPlayed: RecentlyPlayedGames;
  ownedGames: OwnedGames;
}> => {
  const data = await Promise.all([
    fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${steamAPIKey}&steamid=${author.steamId}`,
      { next: { revalidate: cacheTime } }
    ).then((res) => res.json()),
    fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1?key=${steamAPIKey}&include_played_free_games=true&include_appinfo=true&format=json&steamid=${author.steamId}`
    ).then((res) => res.json()),
  ]);

  return {
    recentlyPlayed: data[0].response,
    ownedGames: data[1].response,
  };
};

/**
 * GET Owned Stats Per Game
 * @param appId - The application ID of the game.
 * @returns An array of game stats.
 */
export const getStatsPerGame = async (appId: number) => {
  const data = await Promise.all([
    fetch(
      `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1?key=${steamAPIKey}&steamid=${author.steamId}&appid=${appId}`
    ).then((res) => res.json()),
    fetch(
      `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2?key=${steamAPIKey}&appid=${appId}`
    ).then((res) => res.json()),
    fetch(
      `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2?key=${steamAPIKey}&steamid=${author.steamId}&appid=${appId}`
    ).then((res) => res.json()),
  ]);

  return data;
};
