"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { StatementContext } from "@/app/context/statement";
import { useContext } from "react";
import { links } from "@/app/config/navigation";
import { cn } from "@/app/lib/utils";

interface ActiveLinkProps {
  href: string;
  title?: string | JSX.Element;
  className?: string;
  label?: string;
}

function ActiveLink({ href, title, className, label }: ActiveLinkProps) {
  const { setPageNo, setPageColor } = useContext(StatementContext);
  const router = useRouter();
  const pathname = usePathname();

  const page = links.find((a) => a.href === href);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (href === pathname) {
      window.location.reload();
    } else {
      setPageColor(page?.color || "");
      setPageNo(page?.id || 0);
      router.push(href);
    }
  };

  return (
    <Link
      aria-label={label || ""}
      href={href}
      className={cn(
        "text-neutral-400 underline-offset-2 hover:underline",
        className,
      )}
      onClick={handleClick}
    >
      {title}
    </Link>
  );
}

export default ActiveLink;
