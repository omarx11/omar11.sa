"use client";

import type { ReactNode } from "react";

import { useReveal } from "@/app/hooks/useReveal";
import { cn } from "@/app/lib/utils";

/**
 * The boot-up effect for a block: its (server-rendered) children stay hidden
 * behind `skeleton` until `delay` ms after the page mounts, then fade in one
 * after another (`fade-in` staggers direct children).
 */
export function Reveal({
  delay = 300,
  skeleton,
  className,
  children,
}: {
  delay?: number;
  skeleton: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const revealed = useReveal(delay);
  return (
    <div
      className={cn(
        "relative",
        className,
        revealed ? "fade-in" : "[&>:not([data-reveal-skeleton])]:invisible",
      )}
    >
      {!revealed && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          data-reveal-skeleton
        >
          {skeleton}
        </div>
      )}
      {children}
    </div>
  );
}
