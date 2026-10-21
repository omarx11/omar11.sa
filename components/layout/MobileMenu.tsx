"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { footerPages, menuPages, pages } from "@/config/navigation";
import { cn } from "@/lib/utils";

/**
 * The pages menu on phones, in place of the navbar's tabs (which would wrap
 * onto four rows): the current page, and a button that opens every page.
 */
export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = pages.find((page) => page.href === pathname);

  // Closes after navigating, on a tap outside it, and on Esc.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative w-full" ref={rootRef}>
      <button
        aria-controls="mobile-menu"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-md bg-neutral-900 px-3 py-2 font-bold text-neutral-200"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        type="button"
      >
        <span className="flex items-center gap-2">
          {current?.name ?? "Pages"}
          {current?.icon && (
            <Image alt="" height={18} src={current.icon} width={18} />
          )}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-normal text-neutral-400">
          {open ? "Close" : "Menu"}
          <svg
            aria-hidden="true"
            fill="none"
            height="18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="18"
          >
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </span>
      </button>

      <nav
        aria-label="Pages"
        // Always mounted, so it can animate both opening and closing.
        className={cn(
          "absolute inset-x-0 top-full z-40 mt-2 origin-top rounded-lg bg-neutral-950 p-2 shadow-2xl ring-1 shadow-black ring-neutral-800",
          "transition-[opacity,translate,scale,visibility] duration-150 ease-out motion-reduce:transition-none",
          open
            ? "visible opacity-100"
            : "invisible -translate-y-1 scale-[0.98] opacity-0",
        )}
        id="mobile-menu"
        inert={!open}
      >
        <ul className="grid grid-cols-2 gap-2">
          {menuPages.map((page) => {
            const active = page.href === pathname;
            return (
              <li key={page.href}>
                <Link
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-md px-3 py-2.5 font-bold text-neutral-300",
                    !active && "bg-neutral-900 active:bg-neutral-800",
                  )}
                  href={page.href}
                  onClick={() => setOpen(false)}
                  style={active ? { backgroundColor: page.color } : undefined}
                >
                  {page.name}
                  <Image alt="" height={18} src={page.icon} width={18} />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-2 flex justify-center gap-4 border-t border-neutral-800 pt-2 text-xs text-neutral-500">
          {footerPages.map((page) => (
            <Link
              aria-current={page.href === pathname ? "page" : undefined}
              className="px-1 py-1 hover:text-neutral-300 aria-[current=page]:text-neutral-300"
              href={page.href}
              key={page.href}
              onClick={() => setOpen(false)}
            >
              {page.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
