import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Heading } from "@/app/components/ui/Heading";
import { anime } from "@/app/config/anime";
import { author } from "@/app/config/meta";

export const metadata: Metadata = {
  title: "Anime Page",
  description: `${author.name}'s top favorite anime`,
  keywords: [`${author.fullName} Anime Page`],
  openGraph: {
    title: "Anime Page",
    description: `${author.name}'s top favorite anime`,
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
      <Heading emoji="🌟" name="Anime" sId="#anime" />
      <p className="mt-4 text-neutral-400">
        Top <span className="underline underline-offset-2">10</span> favorite
        anime {`I've`} watched. 😄{" "}
        <span className="text-neutral-500">I {`don't`} watch movies..</span>
      </p>
      <div className="fade-in-left mt-10 max-w-[896px]" id="anime">
        {anime.map(({ rank, name, description, image, url }) => (
          <Link
            className="group relative mb-4 flex h-36 items-center justify-items-start overflow-hidden rounded-lg px-4 duration-300 before:absolute before:inset-0 before:z-10 before:bg-black before:opacity-0 before:transition before:duration-150 hover:h-48 hover:before:opacity-50 sm:px-8"
            href={url || "#"}
            key={rank}
            target="_blank"
          >
            <Image
              alt={name}
              blurDataURL="/static/icons/blur.svg"
              className="absolute top-0 left-0 h-full w-full rounded-lg bg-neutral-900 object-cover duration-150 group-hover:scale-[1.02] sm:h-auto sm:w-auto"
              height={227}
              placeholder="blur"
              src={image}
              width={1080}
            />
            <div className="z-20 w-full scale-95 space-y-1 opacity-0 duration-300 group-hover:scale-100 group-hover:opacity-100">
              <p className="font-bold text-3xl text-neutral-50">
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

export default AnimePage;
