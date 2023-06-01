import Link from "next/link";
import Image from "next/image";

const linksInfo = [
  {
    href: "/",
    name: "Projects",
    src: "/icons/project.svg",
    width: 20,
    height: 20,
    alt: "project-icon",
  },
  {
    href: "/skills",
    name: "Skills",
    src: "/icons/skills.svg",
    width: 20,
    height: 20,
    alt: "skills-icon",
  },
  {
    href: "/specs",
    name: "Specs",
    src: "/icons/pc-display-horizontal.svg",
    width: 16,
    height: 16,
    alt: "pc-icon",
  },
  {
    href: "/about",
    name: "About",
    src: "/icons/draw-pen.svg",
    width: 22,
    height: 22,
    alt: "pen-icon",
  },
  {
    href: "/anime",
    name: "Anime",
    src: "/icons/alchemy-stars.svg",
    width: 21,
    height: 21,
    alt: "anime-icon",
  },
  {
    href: "/games",
    name: "Games",
    src: "/icons/game-die.svg",
    width: 20,
    height: 20,
    alt: "game-icon",
  },
];

// try to use map function
export default function Blocks() {
  return (
    <ul className="flex flex-wrap gap-4 text-stone-300">
      {linksInfo.map((link) => (
        <li className="rounded-md bg-stone-800">
          <Link
            href={link.href}
            className="flex flex-row items-center gap-1 px-2 py-[2px]"
          >
            <p>{link.name}</p>
            <Image
              src={link.src}
              width={link.width}
              height={link.height}
              className="select-none drag-none"
              alt={link.alt}
            />
          </Link>
        </li>
      ))}

      {/* <li className="rounded-[5px] bg-[var(--tertiary-background-color)]">
        <Link
          href="/guestbook"
          className="flex flex-row items-center gap-1 px-[6px] py-1"
        >
          Guestbook
        </Link>
      </li> */}
    </ul>
  );
}
