type NonSteamGamesProps = {
  name: string;
  playtime_forever: number;
  image: string;
  is_non_steam?: boolean;
}[];

// Array of non-Steam games with playtime in minutes
export const nonSteamGames: NonSteamGamesProps = [
  {
    name: "Minecraft Java Edition",
    playtime_forever: 300000,
    image: "/static/images/games/minecraft-java.png",
    is_non_steam: true,
  },
  {
    name: "Genshin Impact",
    playtime_forever: 12000,
    image: "/static/images/games/genshin_impact.png",
    is_non_steam: true,
  },
  {
    name: "Fortnite",
    playtime_forever: 294,
    image: "/static/images/games/fortnite.png",
    is_non_steam: true,
  },
  {
    name: "Rocket League®",
    playtime_forever: 146,
    image: "/static/images/games/rocket_league.png",
    is_non_steam: true,
  },
  {
    name: "Far Cry® 5",
    playtime_forever: 2334,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/552520/header.jpg",
    is_non_steam: true,
  },
  {
    name: "Far Cry® 6",
    playtime_forever: 362,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/header.jpg",
    is_non_steam: true,
  },
  {
    name: "Assassin's Creed® Valhalla",
    playtime_forever: 7705,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg",
    is_non_steam: true,
  },
  {
    name: "Tom Clancy's The Division 2",
    playtime_forever: 1059,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2221490/header.jpg",
    is_non_steam: true,
  },
  {
    name: "Immortals Fenyx Rising",
    playtime_forever: 1923,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2221920/header.jpg",
    is_non_steam: true,
  },
  {
    name: "The Crew™ 2",
    playtime_forever: 1141,
    image:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/646910/header.jpg",
    is_non_steam: true,
  },
];

// Additional playtime for games outside of Steam
export const playtimeToAdd: Record<string, number> = {
  "Overwatch® 2": 126000,
  "Assassin's Creed Odyssey": 6472,
  "Borderlands 3": 14010,
  "Far Cry New Dawn": 1007,
};
