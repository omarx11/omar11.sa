import type { Metadata } from "next";

import { author } from "@/app/config/meta";

import Games from "./components/Games";
import { getGamesOverview } from "./data";

// Prerendered, then regenerated in the background at most once an hour.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Games Page",
  description: `${author.name}'s Games Collections`,
  keywords: [`${author.fullName} Games`],
  openGraph: {
    title: "Games Page",
    description: `${author.name}'s Games Collections`,
    url: `${author.siteUrl}/games`,
    images: [{ url: author.ogImage }],
    type: "website",
  },
};

export default async function GamesPage() {
  return <Games overview={await getGamesOverview()} />;
}
