import Image from "next/image";
import Link from "next/link";

export function SkillsArray({ data }) {
  return data.map(({ name, icon, url, description }, i) => (
    <div
      key={i}
      className="group flex w-full flex-row items-start gap-2 rounded-lg bg-neutral-900 px-0 py-1 duration-300 hover:bg-neutral-800 md:px-2"
    >
      <Link key={i} href={url} target="_blank" className="relative p-1">
        <Image
          src={icon}
          width={48}
          height={48}
          placeholder="blur"
          blurDataURL="/static/icons/blur.svg"
          className="min-w-[48px] bg-neutral-800 duration-150 group-hover:opacity-60"
          alt={name}
        />
      </Link>
      <p className="my-auto w-full pr-0 text-sm text-neutral-400 group-hover:text-neutral-300 md:pr-2 md:text-base">
        {description}
      </p>
    </div>
  ));
}
