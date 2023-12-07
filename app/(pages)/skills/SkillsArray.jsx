import Image from "next/image";
import Link from "next/link";

export function SkillsArray({ data }) {
  return data.map(({ name, icon, url, description }, i) => (
    <div
      key={i}
      className="group flex min-h-[64px] w-full flex-row items-center gap-2 rounded-lg bg-neutral-900 px-0 py-1 duration-300 hover:bg-neutral-800 md:px-2"
    >
      <Link key={i} href={url} target="_blank" className="relative p-1">
        <Image
          src={icon}
          width={48}
          height={48}
          placeholder="blur"
          blurDataURL="/static/icons/blur.svg"
          className="min-h-[48px] min-w-[48px] rounded-md bg-neutral-800 duration-150 group-hover:opacity-60"
          alt={name}
        />
      </Link>
      <p className="line-clamp-1 w-full pr-0 text-justify text-sm text-neutral-400 group-hover:line-clamp-none group-hover:text-neutral-300 md:pr-2 md:text-base">
        {description}
      </p>
    </div>
  ));
}
