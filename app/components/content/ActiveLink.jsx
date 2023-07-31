"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StatementContext } from "@/app/context/statement";
import { useContext } from "react";
import { links } from "@/app/config/navigation";

function ActiveLink({ href, title }) {
  const router = useRouter();
  const page = links.filter((e) => e.href == href)[0];
  const { setPage, setColor } = useContext(StatementContext);

  const handleClick = (e) => {
    e.preventDefault();
    setColor(page.color);
    setPage(page.id);
    router.replace(page.href);
  };

  return (
    <Link
      href={href}
      prefetch={false}
      className="text-neutral-400 underline-offset-2 hover:underline"
      onClick={handleClick}
    >
      {title ? title : "go back"}
    </Link>
  );
}

export default ActiveLink;
