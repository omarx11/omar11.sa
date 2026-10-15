"use client";

import {
  keepPreviousData,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

import { getQueryClient } from "@/app/lib/query-client";

import type { GameStats as GameStatsData, GamesOverview } from "../types";
import GameStats from "./GameStats";
import GamesCollection from "./GamesCollection";
import RecentGames from "./RecentGames";

const statsQuery = (appid: number) => ({
  queryKey: ["game-stats", appid],
  queryFn: async (): Promise<GameStatsData> => {
    const res = await fetch(`/api/games/${appid}/stats`);
    if (!res.ok) throw new Error(`Failed to load stats (${res.status})`);
    return res.json();
  },
  // The server refreshes stats every 12 hours; nothing to refetch per visit.
  staleTime: Number.POSITIVE_INFINITY,
});

export type GameActions = {
  selectedAppId: number | null;
  select: (appid: number) => void;
  /** Warms the stats cache, e.g. on hover, so selecting feels instant. */
  preload: (appid: number) => void;
  /** True while a newly selected game's stats are loading. */
  loadingStats: boolean;
};

export default function Games({ overview }: { overview: GamesOverview }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <GamesView overview={overview} />
    </QueryClientProvider>
  );
}

function GamesView({ overview }: { overview: GamesOverview }) {
  const queryClient = useQueryClient();
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);
  const scrollOnLoad = useRef(false);

  const { data, isFetching, isError, refetch } = useQuery({
    ...statsQuery(selectedAppId ?? 0),
    enabled: selectedAppId !== null,
    placeholderData: keepPreviousData,
  });

  const select = useCallback((appid: number) => {
    scrollOnLoad.current = true;
    setSelectedAppId(appid);
  }, []);

  const preload = useCallback(
    (appid: number) => {
      queryClient.prefetchQuery(statsQuery(appid));
    },
    [queryClient],
  );

  // Bring the stats into view once the selected game's data is ready.
  const loadedAppId = data?.appid;
  useEffect(() => {
    if (scrollOnLoad.current && loadedAppId === selectedAppId) {
      scrollOnLoad.current = false;
      document
        .getElementById("game-stats")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loadedAppId, selectedAppId]);

  const loadingStats = isFetching && data?.appid !== selectedAppId;
  const actions: GameActions = { selectedAppId, select, preload, loadingStats };

  return (
    <>
      <RecentGames actions={actions} games={overview.recent} />
      <GamesCollection
        actions={actions}
        games={overview.collection}
        totalHours={overview.totalHours}
      />
      {selectedAppId !== null && (
        <GameStats
          error={isError && !isFetching}
          loading={loadingStats}
          onRetry={() => refetch()}
          stats={data ?? null}
        />
      )}
    </>
  );
}
