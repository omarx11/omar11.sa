import Image from "next/image";
import Link from "next/link";
import { Heading } from "../components/content/Heading";
import { anime } from "../config/anime";

export default function AnimePage() {
  return (
    <>
      <Heading name="Anime" emoji="🌟" target="#anime" />
      <h3 className="text-stone-400">
        Top <span className="underline underline-offset-2">10</span> best anime
        I've watched. 😄
      </h3>
      <div className="fade-in mt-10 max-w-[896px]" id="anime">
        {anime.map(({ name, description, image, url }, i) => (
          <Link
            key={i}
            href={url}
            target="_blank"
            className="group relative mb-4 flex h-48 items-center justify-items-start overflow-hidden rounded-lg px-4 before:absolute before:inset-0 before:z-10 before:bg-black before:opacity-0 before:transition before:duration-150 hover:before:opacity-50 sm:px-8"
          >
            <Image
              src={image}
              alt={name}
              width={1200}
              height={240}
              className="absolute left-0 top-0 h-full w-full rounded-lg object-cover transition duration-150 group-hover:scale-[1.02]"
            />
            <div className="z-20 w-full scale-95 opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100">
              <h3 className="text-3xl font-bold">
                <span className="text-stone-300">{i + 1} </span>
                {name}
              </h3>
              <p className="text-lg text-stone-200"># {description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
