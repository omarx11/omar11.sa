import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/app/components/ui/Heading";
import { anime } from "@/app/config/anime";
import { author } from "@/app/config/meta";

export const metadata = {
  title: "Anime Page",
  description: `Top favorite anime for ${author.name}`,
  keywords: [`${author.fullName} Anime Page`],
  openGraph: {
    title: "Anime Page",
    description: `Top favorite anime for ${author.name}`,
    url: `${author.siteUrl}/anime`,
    images: [
      {
        url: author.ogImage,
      },
    ],
    type: "website",
  },
};

export default function AnimePage() {
  return (
    <>
      <Heading name="Anime" emoji="🌟" scrollTo="#anime" />
      <h3 className="text-neutral-400">
        Top <span className="underline underline-offset-2">10</span> of my
        favorite anime I've watched. 😄{" "}
        <span className="text-neutral-500">I don't watch movies.. sorry</span>
      </h3>
      <div className="fade-in-left mt-10 max-w-[896px]" id="anime">
        {anime.map(({ name, description, image, url }, i) => (
          <Link
            key={i}
            href={url}
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
                <span className="text-neutral-300">{i + 1} </span>
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
