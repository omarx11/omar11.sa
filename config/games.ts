type NonSteamGame = {
  name: string;
  /** Playtime in minutes. */
  minutes: number;
  image: string;
};

/** Games played outside Steam, shown in the collection with the Steam ones. */
export const nonSteamGames: NonSteamGame[] = [
  {
    name: "Minecraft Java Edition",
    minutes: 300000,
    image: "/static/images/games/minecraft-java.png",
  },
  {
    name: "Genshin Impact",
    minutes: 12000,
    image: "/static/images/games/genshin_impact.png",
  },
  {
    name: "Fortnite",
    minutes: 294,
    image: "/static/images/games/fortnite.png",
  },
  {
    name: "Rocket League®",
    minutes: 146,
    image: "/static/images/games/rocket_league.png",
  },
  {
    name: "Far Cry® 5",
    minutes: 2334,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/552520/header.jpg",
  },
  {
    name: "Far Cry® 6",
    minutes: 362,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/header.jpg",
  },
  {
    name: "Assassin's Creed® Valhalla",
    minutes: 7705,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg",
  },
  {
    name: "Tom Clancy's The Division 2",
    minutes: 1059,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2221490/header.jpg",
  },
  {
    name: "Immortals Fenyx Rising",
    minutes: 1923,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2221920/header.jpg",
  },
  {
    name: "The Crew™ 2",
    minutes: 1141,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/646910/header.jpg",
  },
];

/** Minutes played outside Steam, added to a Steam game's playtime. */
export const extraPlaytime: Record<string, number> = {
  "Overwatch® 2": 126000,
  "Assassin's Creed Odyssey": 6472,
  "Borderlands 3": 14010,
  "Far Cry New Dawn": 1007,
};
