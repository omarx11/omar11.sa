type RecentlyPlayedGames = {
  total_count: number;
  games: {
    appid: number;
    img_icon_url: string;
    name: string;
    playtime_2weeks: number;
    playtime_deck_forever: number;
    playtime_forever: number;
    playtime_linux_forever: number;
    playtime_mac_forever: number;
    playtime_windows_forever: number;
  }[];
};

type OwnedGames = {
  game_count: number;
  games: {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
    has_community_visible_stats: boolean;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    playtime_deck_forever: number;
    rtime_last_played: number;
    playtime_disconnected: number;
  }[];
};

type GameStats = {
  [key: number]: {
    playerstats?: {
      stats?: { name: string; value: number }[];
      achievements?: {
        apiname: string;
        achieved: number;
        unlocktime?: number;
      }[];
    };
    game?: {
      availableGameStats?: {
        achievements?: {
          name: string;
          icon: string;
          displayName: string;
          description: string;
          unlocktime?: number;
        }[];
      };
    };
  };
};

type PaginationState = {
  page: number;
  window: number;
};

type PaginationProps = {
  pages: number;
  state: PaginationState;
  onPageChange: (page: number) => void;
  className?: string;
  note?: boolean;
};
