import { nonSteamGames, playtimeToAdd } from "@/app/config/games";
import { author } from "@/app/config/meta";

import type {
  Achievement,
  CollectionGame,
  GameStats,
  GamesOverview,
  RecentGame,
} from "./types";

const STEAM_API = "https://api.steampowered.com";
const OVERVIEW_TTL = 3600; // 1 hour
const STATS_TTL = 43200; // 12 hours

// Tools, test builds and duplicates that shouldn't appear in the collection.
const HIDDEN_GAME_IDS = new Set([
  12120, 12250, 407530, 596350, 747350, 755790, 700580, 878760, 640590, 1449560,
  34330, 371140, 342230, 431960,
]);

const STORE_ASSETS = "https://shared.steamstatic.com/store_item_assets/";
const ART_TTL = 86400; // 1 day

type StoreArt = { header: string; cover: string };
type StoreItemsResponse = {
  response?: {
    store_items?: {
      appid?: number;
      assets?: {
        asset_url_format?: string;
        header?: string;
        library_capsule?: string;
      };
    }[];
  };
};

/** Cached Steam Web API GET. Returns null when Steam fails or has no data. */
async function steam<T>(
  path: string,
  params: Record<string, string | number | boolean>,
  revalidate: number,
): Promise<T | null> {
  const key = process.env.STEAM_API_KEY;
  if (!key) throw new Error("STEAM_API_KEY is not set.");

  const url = new URL(path, STEAM_API);
  url.searchParams.set("key", key);
  for (const [name, value] of Object.entries(params)) {
    url.searchParams.set(name, String(value));
  }

  try {
    const res = await fetch(url, { next: { revalidate } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

/**
 * Real artwork URLs from Steam's store. Newer games keep their images under
 * hashed paths, so the old fixed `/steam/apps/{id}/header.jpg` URLs 404.
 */
async function getStoreArt(appids: number[]): Promise<Map<number, StoreArt>> {
  const art = new Map<number, StoreArt>();
  const batches: number[][] = [];
  for (let i = 0; i < appids.length; i += 100) {
    batches.push(appids.slice(i, i + 100));
  }

  const results = await Promise.all(
    batches.map((ids) =>
      steam<StoreItemsResponse>(
        "/IStoreBrowseService/GetItems/v1",
        {
          input_json: JSON.stringify({
            ids: ids.map((appid) => ({ appid })),
            context: { language: "english", country_code: "US" },
            data_request: { include_assets: true },
          }),
        },
        ART_TTL,
      ),
    ),
  );

  for (const item of results.flatMap((r) => r?.response?.store_items ?? [])) {
    const assets = item.assets;
    if (!item.appid || !assets?.asset_url_format || !assets.header) continue;
    const url = (file: string) =>
      // biome-ignore lint/suspicious/noTemplateCurlyInString: Steam's literal placeholder
      STORE_ASSETS + assets.asset_url_format?.replace("${FILENAME}", file);
    art.set(item.appid, {
      header: url(assets.header),
      cover: url(assets.library_capsule ?? "library_600x900.jpg"),
    });
  }
  return art;
}

type SteamGame = { appid: number; name: string; playtime_forever: number };
type RecentResponse = {
  response?: { games?: (SteamGame & { playtime_2weeks: number })[] };
};
type OwnedResponse = { response?: { games?: SteamGame[] } };

const getOwnedGames = () =>
  steam<OwnedResponse>(
    "/IPlayerService/GetOwnedGames/v1",
    {
      steamid: author.steamId,
      include_appinfo: true,
      include_played_free_games: true,
    },
    OVERVIEW_TTL,
  ).then((data) => data?.response?.games ?? null);

export async function getGamesOverview(): Promise<GamesOverview> {
  const [recentData, owned] = await Promise.all([
    steam<RecentResponse>(
      "/IPlayerService/GetRecentlyPlayedGames/v1",
      { steamid: author.steamId, count: 5 },
      OVERVIEW_TTL,
    ),
    getOwnedGames(),
  ]);

  const recentGames = recentData?.response
    ? (recentData.response.games ?? []).slice(0, 5)
    : null;
  const art = await getStoreArt([
    ...new Set([
      ...(recentGames ?? []).map((game) => game.appid),
      ...(owned ?? []).map((game) => game.appid),
    ]),
  ]);

  const recent: RecentGame[] | null =
    recentGames?.map((game) => ({
      appid: game.appid,
      name: game.name,
      hours: Math.floor((game.playtime_2weeks / 60) * 10) / 10,
      cover: art.get(game.appid)?.cover ?? null,
    })) ?? null;

  if (!owned) return { recent, collection: null, totalHours: 0 };

  const collection: CollectionGame[] = [
    ...owned
      .filter((game) => !HIDDEN_GAME_IDS.has(game.appid))
      .map((game) => ({
        id: `steam-${game.appid}`,
        appid: game.appid,
        name: game.name,
        image: art.get(game.appid)?.header ?? null,
        minutes: game.playtime_forever,
      })),
    ...nonSteamGames.map((game) => ({
      id: `other-${game.name}`,
      appid: null,
      name: game.name,
      image: game.image,
      minutes: game.playtime_forever,
    })),
  ]
    .map((game) => ({
      ...game,
      minutes: game.minutes + (playtimeToAdd[game.name] ?? 0),
    }))
    .sort((a, b) => b.minutes - a.minutes);

  const totalMinutes = collection.reduce((sum, game) => sum + game.minutes, 0);
  return { recent, collection, totalHours: Math.floor(totalMinutes / 60) };
}

type SchemaResponse = {
  game?: {
    availableGameStats?: {
      achievements?: {
        name: string;
        displayName: string;
        description?: string;
        icon: string;
      }[];
    };
  };
};
type PlayerAchievementsResponse = {
  playerstats?: {
    achievements?: { apiname: string; achieved: number; unlocktime: number }[];
  };
};
type UserStatsResponse = {
  playerstats?: { stats?: { name: string; value: number }[] };
};

/** Returns null when the game isn't in the owner's library. */
export async function getGameStats(appid: number): Promise<GameStats | null> {
  const owned = await getOwnedGames();
  const game = owned?.find((g) => g.appid === appid);
  if (!game) return null;

  const params = { steamid: author.steamId, appid };
  const [schema, player, userStats] = await Promise.all([
    steam<SchemaResponse>(
      "/ISteamUserStats/GetSchemaForGame/v2",
      { appid },
      STATS_TTL,
    ),
    steam<PlayerAchievementsResponse>(
      "/ISteamUserStats/GetPlayerAchievements/v1",
      params,
      STATS_TTL,
    ),
    steam<UserStatsResponse>(
      "/ISteamUserStats/GetUserStatsForGame/v2",
      params,
      STATS_TTL,
    ),
  ]);

  const available = schema?.game?.availableGameStats?.achievements ?? [];
  const unlockedAt = new Map(
    (player?.playerstats?.achievements ?? [])
      .filter((a) => a.achieved)
      .map((a) => [a.apiname, a.unlocktime]),
  );

  const achievements: Achievement[] = available
    .filter((a) => unlockedAt.has(a.name))
    .map((a) => ({
      id: a.name,
      name: a.displayName,
      description: a.description ?? "",
      icon: a.icon,
      unlockedAt: unlockedAt.get(a.name) ?? 0,
    }))
    // Most recently unlocked first.
    .sort((a, b) => b.unlockedAt - a.unlockedAt);

  return {
    appid,
    name: game.name,
    achievements,
    totalAchievements: available.length,
    stats: (userStats?.playerstats?.stats ?? []).map((stat) => ({
      name: stat.name.replace(/_/g, " "),
      value: Math.round(stat.value * 100000) / 100000,
    })),
  };
}
