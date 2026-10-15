"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * A link to `/path#section`. Navigates normally from other pages; when already
 * on the page it always scrolls to the section (a plain Link is a no-op when
 * the URL, hash included, hasn't changed).
 */
export function SectionLink({
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { href: `${string}#${string}` }) {
  const pathname = usePathname();
  const [path, id] = href.split("#");

  return (
    <Link
      {...props}
      href={href}
      onClick={(e) => {
        onClick?.(e);
        const target = document.getElementById(id);
        if (e.defaultPrevented || pathname !== path || !target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(history.state, "", href);
      }}
    />
  );
}
