"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { StatementContext } from "@/app/context/statement";
import { useContext } from "react";
import { links } from "@/app/configs/navigation";
import { cn } from "@/app/lib/utils";

function ActiveLink({ href, title, className }) {
  const router = useRouter();
  const page = links.find((a) => a.href === href);
  const { setPage, setColor } = useContext(StatementContext);

  const handleClick = (e) => {
    e.preventDefault();
    setColor(page?.color);
    setPage(page?.id);
    router.replace(href);
  };

  return (
    <Link
      href={href}
      className={cn(
        "text-neutral-400 underline-offset-2 hover:underline",
        className,
      )}
      onClick={handleClick}
    >
      {title && title}
    </Link>
  );
}

export default ActiveLink;
