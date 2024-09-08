import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/app/components/ui/Heading";
import { anime } from "@/app/config/anime";
import { author } from "@/app/config/meta";
import { Skeleton } from "@/app/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "Anime Page",
  description: `${author.name}'s top fav animes`,
  keywords: [`${author.fullName} Anime Page`],
  openGraph: {
    title: "Anime Page",
    description: `${author.name}'s top fav animes`,
    url: `${author.siteUrl}/anime`,
    images: [
      {
        url: author.ogImage,
      },
    ],
    type: "website",
  },
};

function AnimePage() {
  return (
    <>
      <Heading name="Anime" emoji="🌟" sId="#anime" />
      <p className="mt-4 text-neutral-400">
        Top <span className="underline underline-offset-2">10</span> of my
        favorite anime I've watched. 😄{" "}
        <span className="text-neutral-500">I don't watch movies.. sorry</span>
      </p>
      <div className="fade-in-left mt-10 max-w-[896px]" id="anime">
        {anime.map(({ rank, name, description, image, url }) => (
          <Link
            key={rank}
            href={url || "#"}
            target="_blank"
            className="group relative mb-4 flex h-36 items-center justify-items-start overflow-hidden rounded-lg px-4 duration-300 before:absolute before:inset-0 before:z-10 before:bg-black before:opacity-0 before:transition before:duration-150 hover:h-48 hover:before:opacity-50 sm:px-8"
          >
            <Image
              src={image}
              width={1080}
              height={227}
              placeholder="blur"
              blurDataURL="/static/icons/blur.svg"
              className="absolute left-0 top-0 h-full w-full rounded-lg bg-neutral-900 object-cover duration-150 group-hover:scale-[1.02] sm:h-auto sm:w-auto"
              alt={name}
            />
            <div className="z-20 w-full scale-95 space-y-1 opacity-0 duration-300 group-hover:scale-100 group-hover:opacity-100">
              <p className="text-3xl font-bold text-neutral-50">
                <span className="text-neutral-300">{rank} </span>
                {name}
              </p>
              <p className="text-base text-neutral-300 md:text-lg">
                # {description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

const AnimePageSkeleton = () => {
  return (
    <ul className="fade-in-left mt-[7.4rem] max-w-[896px]">
      {[...Array(anime.length)].map((_, i) => (
        <li key={i}>
          <Skeleton className="mb-4 flex h-36 items-center justify-items-start overflow-hidden rounded-lg px-4 sm:px-8" />
        </li>
      ))}
    </ul>
  );
};

export default dynamic(() => Promise.resolve(AnimePage), {
  loading: () => <AnimePageSkeleton />,
  ssr: false,
});
