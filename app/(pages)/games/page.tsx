import { Suspense } from "react";

import { author } from "@/config/meta";
import { simulateFirstVisit } from "@/lib/dev/first-visit";
import { pageMetadata } from "@/lib/metadata";

import Games from "./components/Games";
import GamesSkeleton from "./components/GamesSkeleton";
import { getGamesOverview } from "./data";

export const metadata = pageMetadata({
  title: "Games",
  description: `${author.fullName}'s Steam library: recently played games, his full collection, playtime, stats and achievements.`,
  path: "/games",
});

export default function GamesPage() {
  return (
    // The page shell renders immediately; Steam data streams in when ready.
    <Suspense fallback={<GamesSkeleton />}>
      <GamesData />
    </Suspense>
  );
}

async function GamesData() {
  await simulateFirstVisit();
  return <Games overview={await getGamesOverview()} />;
}
