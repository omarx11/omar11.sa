"use client";

import Link from "next/link";
import { linksInfo } from "@/app/data/navigation";
import { useRouter } from "next/navigation";
import { useNavContext } from "@/app/components/context/Navigation";

export default function AboutMe() {
  const router = useRouter();
  const aboutPage = linksInfo.filter((e) => e.name == "About")[0];
  const { setPage, setColor } = useNavContext();

  return (
    <Link
      href="/about"
      prefetch={false}
      className="text-zinc-400 underline-offset-2 hover:underline"
      onClick={(e) => {
        e.preventDefault();
        setColor(aboutPage.color);
        setPage(aboutPage.id);
        router.replace(aboutPage.href);
      }}
    >
      about me
    </Link>
  );
}
