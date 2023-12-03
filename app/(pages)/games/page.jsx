import Image from "next/image";
import Link from "next/link";
import GamesCol from "./GamesCol";
import { author } from "@/app/configs/meta";
import dynamic from "next/dynamic";
import { getAllGames } from "@/app/lib/getStatsPerGame";

const GameDetails = dynamic(() => import("./GameDetails"));

export const metadata = {
  title: "Games Page",
  description: `List of games for ${author.name}`,
  keywords: [`${author.fullName} Games`],
  openGraph: {
    title: "Games Page",
    description: `List of games for ${author.name}`,
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
      <h2 className="mb-4 text-xl font-bold text-neutral-300">
        <span className="text-emerald-500">#</span> Recently Played Games{" "}
        {recentGames ? (
          "🧩"
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            className="inline animate-spin"
          >
            <g fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                clipRule="evenodd"
                opacity=".2"
              />
              <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
            </g>
          </svg>
        )}
      </h2>
      <div className="line-clamp-1 flex flex-row flex-wrap gap-4 overflow-visible">
        {recentGames.total_count !== 0 &&
          recentGames.games.slice(0, 5).map((game, i) => (
            <div className="flex flex-col text-sm" key={i}>
              <p className="text-emerald-500">
                {Math.floor((game.playtime_2weeks / 60) * 10) / 10} hrs
              </p>
              <Link
                href={`https://store.steampowered.com/app/${game.appid}`}
                target="_blank"
                className="mt-1 max-w-[160px] hover:underline"
              >
                <Image
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/library_600x900.jpg`}
                  width={160}
                  height={240}
                  placeholder="blur"
                  blurDataURL="/static/icons/blur.svg"
                  className="drag-none w-40 select-none rounded-md bg-neutral-800 ring-emerald-800 duration-300 hover:scale-105"
                  alt=""
                />
                <p className="mt-1 line-clamp-2 text-neutral-300">
                  {game.name}
                </p>
              </Link>
            </div>
          ))}
      </div>
      <GamesCol data={allGames} />
      <GameDetails />
    </>
  );
}
