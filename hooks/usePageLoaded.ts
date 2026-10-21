"use client";

import { useEffect, useState } from "react";

// Loading placeholders (the pages' Suspense fallbacks) carry this attribute.
const isLoading = () => document.querySelector("[data-page-loading]") !== null;

/**
 * True once the page has loaded: it has hydrated and none of its sections
 * still shows a loading placeholder. Lets the navbar finish its own loading
 * state together with the page's content, on any page.
 */
export function usePageLoaded(): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading()) {
      setLoaded(true);
      return;
    }
    const done = () => {
      observer.disconnect();
      clearTimeout(timer);
      setLoaded(true);
    };
    // Streamed sections replace their placeholders as they arrive.
    const observer = new MutationObserver(() => !isLoading() && done());
    observer.observe(document.body, { childList: true, subtree: true });
    // Never keep the navigation hidden if a section is unusually slow.
    const timer = setTimeout(done, 10_000);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return loaded;
}
