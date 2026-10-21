"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

import { Skeleton } from "@/components/ui/Skeleton";
import { menuPages } from "@/config/navigation";
import { usePageLoaded } from "@/hooks/usePageLoaded";
import { cn } from "@/lib/utils";

import { MobileMenu } from "./MobileMenu";

type Indicator = { x: number; y: number; w: number; h: number; color: string };

export default function Navbar() {
  const pathname = usePathname();
  // Highlight a clicked tab immediately, before the navigation finishes.
  const [pending, setPending] = useState<string | null>(null);
  // Any completed navigation (tab, avatar, in-text link, back button) makes
  // the URL the source of truth again.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setPending(null);
  }
  const activeHref = pending ?? pathname;
  // On a fresh page load the bar shows a skeleton until the page's content has
  // loaded, then the tabs fade in together with it.
  const revealed = usePageLoaded();

  const navRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState<Indicator | null>(null);
  // Skip the slide on first placement; animate only later moves.
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const active = menuPages.find((link) => link.href === activeHref);
    const el = active
      ? nav?.querySelector<HTMLElement>(`[data-href="${active.href}"]`)
      : null;
    if (!nav || !active || !el) {
      setIndicator(null);
      return;
    }
    const place = () =>
      setIndicator({
        x: el.offsetLeft,
        y: el.offsetTop,
        w: el.offsetWidth,
        h: el.offsetHeight,
        color: active.color,
      });
    place();
    // Tabs wrap onto new rows as the viewport changes.
    const observer = new ResizeObserver(place);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [activeHref]);

  useLayoutEffect(() => {
    if (indicator && !animate) {
      const frame = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(frame);
    }
  }, [indicator, animate]);

  return (
    <div
      className={cn(
        "relative mt-4 flex min-h-[28px] items-center justify-between border-t-8 pt-4 select-none",
        // The separator line stays hidden while the skeleton shows.
        revealed ? "border-neutral-900" : "border-black",
      )}
    >
      {!revealed && (
        <Skeleton
          aria-hidden="true"
          className="absolute inset-x-0 top-4 bottom-0 rounded-xs bg-neutral-800/75"
        />
      )}
      {/* Phones: one row with a menu, instead of tabs wrapping onto four rows. */}
      <div
        className={cn(
          // Above the page content below, which the open menu covers.
          "relative z-40 w-full sm:hidden",
          revealed ? "fade-in-up" : "invisible",
        )}
      >
        <MobileMenu />
      </div>
      <nav
        aria-label="Pages"
        className={cn(
          "relative font-bold text-neutral-300 max-sm:hidden",
          !revealed && "invisible",
        )}
        ref={navRef}
      >
        {/* The entrance animation lives on this wrapper: an animated transform
            on the indicator itself would override its inline position. */}
        <div className={cn("flex flex-wrap gap-4", revealed && "fade-in")}>
          {menuPages.map((link) => {
            const active = link.href === activeHref;
            return (
              <Link
                aria-current={link.href === pathname ? "page" : undefined}
                className={cn(
                  "flex flex-row items-center gap-1 rounded-md bg-neutral-900 px-2 py-[2px]",
                  active ? "pointer-events-none" : "hover:bg-neutral-800",
                )}
                data-href={link.href}
                href={link.href}
                key={link.href}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
                    return;
                  }
                  setPending(link.href);
                }}
                // Before the indicator is measured, tint the active tab directly
                // so the server-rendered HTML already shows the right state.
                style={
                  active && !indicator
                    ? { boxShadow: `inset 0 0 0 100px ${link.color}` }
                    : undefined
                }
              >
                {link.name}
                <Image alt="" height={20} src={link.icon} width={20} />
              </Link>
            );
          })}
        </div>
        {indicator && (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-0 left-0 rounded-md",
              animate &&
                "transition-[transform,width,height,background-color] duration-400 ease-[cubic-bezier(0.3,1.3,0.5,1)]",
            )}
            style={{
              transform: `translate(${indicator.x}px, ${indicator.y}px)`,
              width: indicator.w,
              height: indicator.h,
              backgroundColor: indicator.color,
              // On reveal, fade in on the same beat as its tab (the tabs are
              // staggered 50ms apart by `fade-in`).
              ...(revealed && {
                animation: `fade-opacity-only 0.3s ${
                  (menuPages.findIndex((l) => l.href === activeHref) + 1) * 0.05
                }s both`,
              }),
            }}
          />
        )}
      </nav>
      <div
        className={cn(
          "flex items-center text-neutral-500 max-sm:hidden sm:gap-1.5",
          revealed ? "fade-in-up" : "invisible",
        )}
      >
        <svg
          aria-hidden="true"
          height="1.8rem"
          viewBox="0 0 24 24"
          width="1.8rem"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
        <p className="text-right sm:w-max">Select Pages</p>
      </div>
    </div>
  );
}
