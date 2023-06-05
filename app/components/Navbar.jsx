"use client";

import Link from "next/link";
import Image from "next/image";
import useSessionStorage from "@/lib/setNavbar";
import * as motion from "@/lib/setMoition";

const colorOpacity = 0.3;

const linksInfo = [
  {
    id: 0,
    href: "/",
    name: "Projects",
    src: "/icons/album-2-fill.svg",
    alt: "album-icon",
    color: `rgba(139, 92, 246, ${colorOpacity})`,
  },
  {
    id: 1,
    href: "/skills",
    name: "Skills",
    src: "/icons/grid-fill.svg",
    alt: "grid-icon",
    color: `rgba(244, 63, 94, ${colorOpacity})`,
  },
  {
    id: 2,
    href: "/specs",
    name: "Specs",
    src: "/icons/command-fill.svg",
    alt: "command-icon",
    color: `rgba(14, 165, 233, ${colorOpacity})`,
  },
  {
    id: 3,
    href: "/about",
    name: "About",
    src: "/icons/draw-pen.svg",
    alt: "pen-icon",
    color: `rgba(245 158 11, ${colorOpacity})`,
  },
  {
    id: 4,
    href: "/anime",
    name: "Anime",
    src: "/icons/star-four-fill.svg",
    alt: "anime-icon",
    color: `rgba(244, 114, 182, ${colorOpacity})`,
  },
  {
    id: 5,
    href: "/games",
    name: "Games",
    src: "/icons/grid-2-fill.svg",
    alt: "grid-icon",
    color: `rgba(34, 197, 94, ${colorOpacity})`,
  },
  {
    id: 6,
    href: "/guestbook",
    name: "Guestbook",
    src: "/icons/comment-fill.svg",
    alt: "comment-icon",
    color: `rgba(209 213 219, ${colorOpacity})`,
  },
];

export default function Blocks() {
  const [selectedLink, setSelectedLink, formerColor, setFormerColor] =
    useSessionStorage();
  return (
    <ul className="flex flex-wrap gap-4 font-bold text-stone-300">
      {linksInfo.map((link) => (
        <motion.li
          key={link.id}
          className="relative rounded-md"
          onTap={() => {
            sessionStorage.setItem("pageId", link.id);
            setSelectedLink(link.id);
            setFormerColor(linksInfo[selectedLink].color);
          }}
        >
          <Link
            href={link.href}
            className={
              link.id === selectedLink
                ? "pointer-events-none flex flex-row items-center gap-1 bg-stone-900 px-2 py-[2px]"
                : "flex flex-row items-center gap-1 bg-stone-900 px-2 py-[2px] hover:bg-stone-800"
            }
          >
            <p className="z-10">{link.name}</p>
            <Image
              src={link.src}
              width={20}
              height={20}
              className="z-10 select-none drag-none"
              alt={link.alt}
            />
          </Link>
          {link.id === selectedLink && (
            <motion.div
              className="absolute left-0 top-0 h-full w-full rounded-md"
              layoutId="selected"
              initial={{ backgroundColor: formerColor }}
              animate={{ backgroundColor: link.color }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.li>
      ))}
    </ul>
  );
}
