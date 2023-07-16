"use client";

import Link from "next/link";
import { linksInfo } from "@/app/data/navigation";
import { useRouter } from "next/navigation";
import { useNavContext } from "@/app/context/navigation";

export default function AboutMe() {
  const router = useRouter();
  const aboutPage = linksInfo.filter((e) => e.name == "About")[0];
  const { setPage, setColor } = useNavContext();

  const handleClick = (e) => {
    e.preventDefault();
    setColor(aboutPage.color);
    setPage(aboutPage.id);
    router.replace(aboutPage.href);
  };

  return (
    <Link
      href="/about"
      prefetch={false}
      className="text-zinc-400 underline-offset-2 hover:underline"
      onClick={handleClick}
    >
      about me
    </Link>
  );
}
