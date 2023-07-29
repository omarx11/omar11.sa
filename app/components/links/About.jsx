"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StatementContext } from "@/app/context/statement";
import { useContext } from "react";
import { linksInfo } from "@/app/data/navigation";

export default function AboutMe() {
  const router = useRouter();
  const aboutPage = linksInfo.filter((e) => e.name == "About")[0];
  const { setPage, setColor } = useContext(StatementContext);

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
      className="text-neutral-400 underline-offset-2 hover:underline"
      onClick={handleClick}
    >
      about me
    </Link>
  );
}
