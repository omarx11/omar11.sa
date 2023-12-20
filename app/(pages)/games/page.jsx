import RecentGames from "./RecentGames";
import GamesCollection from "./GamesCollection";
import { author } from "@/app/config/meta";
import dynamic from "next/dynamic";
import { getAllGames } from "@/app/lib/getGameInfo";

const GameStats = dynamic(() => import("./GameStats"));

export const metadata = {
  title: "Games Page",
  description: `Games played by ${author.name}`,
  keywords: [`${author.fullName} Games`],
  openGraph: {
    title: "Games Page",
    description: `Games played by ${author.name}`,
    url: `${author.siteUrl}/games`,
    images: [
      {
        url: author.ogImage,
      },
    ],
    type: "website",
  },
};

export default async function GamesPage() {
  const data = await getAllGames();

  const recentGames = data[0].response;
  const allGames = data[1].response;

  return (
    <>
      <RecentGames data={recentGames && recentGames} />
      <GamesCollection data={allGames && allGames} />
      <GameStats />
    </>
  );
}
