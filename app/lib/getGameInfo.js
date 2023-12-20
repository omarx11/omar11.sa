"use server";
import { author } from "../config/meta";

const steamAPIKey = process.env.STEAM_API_KEY;
const cacheTime = 43200; // 12 hours

/**
 * GET Owned Steam Games
 * @returns An array of Games.
 */
export const getAllGames = async () => {
  const data = await Promise.all([
    fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${steamAPIKey}&steamid=${author.steamId}`,
      { next: { revalidate: cacheTime } },
    ).then((res) => res.json()),
    fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1?key=${steamAPIKey}&include_played_free_games=true&include_appinfo=true&format=json&steamid=${author.steamId}`,
    ).then((res) => res.json()),
  ]);

  return data;
};

/**
 * GET Owned Stats Per Game
 * @returns An array of Game Stats.
 */
export const getStatsPerGame = async (appId) => {
  const data = await Promise.all([
    fetch(
      `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1?key=${steamAPIKey}&steamid=${author.steamId}&appid=${appId}`,
    ).then((res) => res.json()),
    fetch(
      `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2?key=${steamAPIKey}&appid=${appId}`,
    ).then((res) => res.json()),
    fetch(
      `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2?key=${steamAPIKey}&steamid=${author.steamId}&appid=${appId}`,
    ).then((res) => res.json()),
  ]);

  return data;
};
