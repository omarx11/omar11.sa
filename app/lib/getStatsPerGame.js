"use server";
import { author } from "../configs/meta";

export const getAllGames = async () => {
  const steamAPIKey = process.env.STEAM_API_KEY;

  const data = await Promise.all([
    fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${steamAPIKey}&steamid=${author.steamId}`,
    ).then((res) => res.json()),
    fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1?key=${steamAPIKey}&include_played_free_games=true&include_appinfo=true&format=json&steamid=${author.steamId}`,
    ).then((res) => res.json()),
  ]);

  return data;
};

export const getStatsPerGame = async (appId) => {
  const data = await Promise.all([
    fetch(
      `https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1?key=94AEDF4E76A9FA48E0087C4DE2A4EB4F&steamid=76561198965877925&appid=${appId}`,
    ).then((res) => res.json()),
    fetch(
      `https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2?key=94AEDF4E76A9FA48E0087C4DE2A4EB4F&appid=${appId}`,
    ).then((res) => res.json()),
    fetch(
      `https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2?key=94AEDF4E76A9FA48E0087C4DE2A4EB4F&steamid=76561198965877925&appid=${appId}`,
    ).then((res) => res.json()),
  ]);

  return data;
};
