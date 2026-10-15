import { pageMetadata } from "@/app/lib/metadata";

import Games from "./components/Games";
import { getGamesOverview } from "./data";

export const metadata = pageMetadata({
  title: "Games",
  description:
    "Omar Abdulaziz's Steam library: recently played games, his full collection, playtime, stats and achievements.",
  path: "/games",
});

export default async function GamesPage() {
  return <Games overview={await getGamesOverview()} />;
}
