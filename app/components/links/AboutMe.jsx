"use client";

import Link from "next/link";
import { useSessionStorage } from "@/app/lib/setNavbar";
import { useRouter } from "next/navigation";

export default function AboutMe() {
  const router = useRouter();
  const handleClick = (e) => {
    const { setSelectedLink, setFormerColor } = useSessionStorage();
    e.preventDefault();
    window.sessionStorage.setItem("pageId", 3);
    setSelectedLink(3);
    setFormerColor("rgba(245 158 11, 0.3)");
    router.refresh();
    router.replace("/about");
  };
  return (
    <Link
      href="/about"
      prefetch={false}
      className="text-zinc-400 underline-offset-2 hover:underline"
      onClick={(e) => handleClick(e)}
    >
      About me
    </Link>
  );
}
