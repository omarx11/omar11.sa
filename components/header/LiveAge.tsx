"use client";

import { useEffect, useRef } from "react";

import { ageInYears } from "@/lib/dates";

/**
 * A live age counter. It shows zeros until the page is interactive, then
 * starts ticking. Ticks by writing the text node directly, so only this span
 * changes and no React render runs on each tick.
 */
export default function LiveAge({ birthDate }: { birthDate: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = () => {
      if (ref.current) ref.current.textContent = ageInYears(birthDate);
    };
    const timer = setInterval(tick, 100);
    return () => clearInterval(timer);
  }, [birthDate]);

  return (
    <span
      className="inline-block w-[98px] text-sm font-bold text-emerald-400 tabular-nums"
      ref={ref}
    >
      00.000000000
    </span>
  );
}
