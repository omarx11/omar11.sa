"use client";

import { useEffect, useRef } from "react";

import { ageInYears } from "@/app/lib/helpers";

/**
 * A live age counter. Ticks by writing the text node directly, so only this
 * span changes and no React render runs on each tick.
 */
export default function Age({
  birthDate,
  initial,
}: {
  birthDate: string;
  /** Rendered on the server so the HTML shows a real value before hydration. */
  initial: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = () => {
      if (ref.current) ref.current.textContent = ageInYears(birthDate);
    };
    tick();
    const timer = setInterval(tick, 100);
    return () => clearInterval(timer);
  }, [birthDate]);

  return (
    <span
      className="inline-block w-[98px] font-bold text-emerald-400 text-sm tabular-nums"
      ref={ref}
      suppressHydrationWarning
    >
      {initial}
    </span>
  );
}
