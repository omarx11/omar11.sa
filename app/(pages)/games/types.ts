export type RecentGame = {
  appid: number;
  name: string;
  /** Hours played in the last two weeks. */
  hours: number;
  /** Portrait artwork, null when Steam has none. */
  cover: string | null;
};

export type CollectionGame = {
  id: string;
  /** null for games played outside Steam (no stats available). */
  appid: number | null;
  name: string;
  /** null when Steam has no store artwork (e.g. delisted betas). */
  image: string | null;
  minutes: number;
};

export type GamesOverview = {
  /** null when Steam couldn't be reached. */
  recent: RecentGame[] | null;
  collection: CollectionGame[] | null;
  totalHours: number;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  /** Unix seconds. */
  unlockedAt: number;
};

export type GameStats = {
  appid: number;
  name: string;
  achievements: Achievement[];
  totalAchievements: number;
  stats: { name: string; value: number }[];
};
