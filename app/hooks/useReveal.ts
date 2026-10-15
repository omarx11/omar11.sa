"use client";

import { useEffect, useState } from "react";

/**
 * The site's intentional "boot-up" effect: content is server-rendered (fast,
 * crawlable) but shown behind a loading state until `delay` ms after the page
 * mounts, then revealed with its entrance animation. It's the same for every
 * visitor, unlike real network loading.
 */
export function useReveal(delay = 400): boolean {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return revealed;
}
