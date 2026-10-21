"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

/** Reloads the current page when clicked. */
export function ReloadButton({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      className={className}
      onClick={() => window.location.reload()}
      type="button"
    >
      {children}
    </button>
  );
}

/** Navigates to `href`, or reloads the page when it's already there. */
export function ReloadLink({
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented && pathname === href) {
          e.preventDefault();
          window.location.reload();
        }
      }}
    />
  );
}
