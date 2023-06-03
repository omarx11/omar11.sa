import Link from "next/link";
import Image from "next/image";

const linksInfo = [
  {
    id: 1,
    href: "/",
    name: "Projects",
    src: "/icons/album-2-fill.svg",
    alt: "album-icon",
  },
  {
    id: 2,
    href: "/skills",
    name: "Skills",
    src: "/icons/grid-fill.svg",
    alt: "grid-icon",
  },
  {
    id: 3,
    href: "/specs",
    name: "Specs",
    src: "/icons/command-fill.svg",
    alt: "command-icon",
  },
  {
    id: 4,
    href: "/about",
    name: "About",
    src: "/icons/draw-pen.svg",
    alt: "pen-icon",
  },
  {
    id: 5,
    href: "/anime",
    name: "Anime",
    src: "/icons/star-four-fill.svg",
    alt: "anime-icon",
  },
  {
    id: 6,
    href: "/games",
    name: "Games",
    src: "/icons/grid-2-fill.svg",
    alt: "grid-icon",
  },
  {
    id: 7,
    href: "/guestbook",
    name: "Guestbook",
    src: "/icons/comment-fill.svg",
    alt: "comment-icon",
  },
];

// try to use map function
export default function Blocks() {
  return (
    <ul className="flex flex-wrap gap-4 font-bold text-stone-300">
      {linksInfo.map((link) => (
        <li
          key={link.id}
          className="rounded-md bg-stone-900 hover:bg-stone-800"
        >
          <Link
            href={link.href}
            className="flex flex-row items-center gap-1 px-2 py-[2px]"
          >
            <p>{link.name}</p>
            <Image
              src={link.src}
              width={20}
              height={20}
              className="select-none drag-none"
              alt={link.alt}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
