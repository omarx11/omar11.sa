import type { Metadata } from "next";
import { author } from "@/app/config/meta";
import Games from "./components/Games";

export const metadata: Metadata = {
  title: "Games Page",
  description: `${author.name}'s Games Collections`,
  keywords: [`${author.fullName} Games`],
  openGraph: {
    title: "Games Page",
    description: `${author.name}'s Games Collections`,
    url: `${author.siteUrl}/games`,
    images: [
      {
        url: author.ogImage,
      },
    ],
    type: "website",
  },
};

export default function GamesPage() {
  return <Games />;
}
