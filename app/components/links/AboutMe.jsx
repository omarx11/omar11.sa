"use client";

import Link from "next/link";
import { linksInfo } from "@/app/data/navigation";
import { navigate } from "@/app/lib/setNavbar";
import { useRouter } from "next/navigation";

export default function AboutMe() {
  // const router = useRouter();
  const aboutPage = linksInfo.filter((e) => e.name == "About")[0];
  // const { setPage, setPageColor } = navigate();

  return (
    <Link
      href="/about"
      prefetch={false}
      className="text-zinc-400 underline-offset-2 hover:underline"
      onClick={(e) => {
        e.preventDefault();
        // if (window.sessionStorage.getItem("pageId"))
        // window.sessionStorage.setItem("pageId", aboutPage.id);
        // setPage(aboutPage.id);
        // router.replace(aboutPage.href);
        // router.refresh();
      }}
    >
      About me
    </Link>
  );
}
