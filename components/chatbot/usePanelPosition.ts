"use client";

import { type RefObject, useLayoutEffect, useState } from "react";

const PANEL_MAX_HEIGHT = 640;
const PANEL_MIN_HEIGHT = 420;
const MARGIN = 12;

/**
 * CSS variables that place the panel. Phones: the visual viewport, so the
 * full-screen chat shrinks above the on-screen keyboard instead of hiding
 * under it. Larger screens: beside the trigger, as tall as fits.
 */
export function usePanelPosition(
  anchorRef: RefObject<HTMLElement | null>,
  open: boolean,
) {
  const [vars, setVars] = useState<Record<string, string>>({});

  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const viewport = window.visualViewport;
      const next: Record<string, string> = {
        "--vv-top": `${viewport?.offsetTop ?? 0}px`,
        "--vv-height": `${viewport?.height ?? window.innerHeight}px`,
      };
      const rect = anchorRef.current?.getBoundingClientRect();
      if (rect) {
        // Level with the trigger, moved up only if that leaves too little room.
        const top = Math.max(
          MARGIN,
          Math.min(rect.top, window.innerHeight - MARGIN - PANEL_MIN_HEIGHT),
        );
        const height = Math.min(
          PANEL_MAX_HEIGHT,
          window.innerHeight - top - MARGIN,
        );
        next["--chat-top"] = `${top}px`;
        next["--chat-right"] =
          `${Math.max(MARGIN, window.innerWidth - rect.left + 8)}px`;
        next["--chat-height"] = `${height}px`;
      }
      setVars(next);
    };
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
  }, [anchorRef, open]);

  return vars;
}
