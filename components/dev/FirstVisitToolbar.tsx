"use client";

import { useEffect, useState } from "react";

import { FIRST_VISIT_COOKIE as COOKIE } from "@/lib/dev/first-visit-cookie";
import { cn } from "@/lib/utils";

const DELAYS = [1000, 2000, 3000, 5000];

const readDelay = () => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=(\\d+)`));
  return match ? Number(match[1]) : null;
};

const writeDelay = (delay: number | null) => {
  // Written synchronously because the page reloads right after.
  // biome-ignore lint/suspicious/noDocumentCookie: dev-only, sync write before reload
  document.cookie =
    delay === null
      ? `${COOKIE}=; path=/; max-age=0`
      : `${COOKIE}=${delay}; path=/; max-age=31536000; samesite=lax`;
};

/** A full reload from the top: fresh client state, entrance animations, cold data. */
const replay = () => {
  window.scrollTo(0, 0);
  window.location.reload();
};

/**
 * Development-only toolbar to preview what a first-time visitor sees: every
 * data section waits the chosen delay, so skeletons, streaming and entrance
 * animations play on load and on navigation.
 */
export default function FirstVisitToolbar() {
  const [delay, setDelay] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => setDelay(readDelay()), []);

  const enabled = delay !== null;
  const apply = (next: number | null) => {
    writeDelay(next);
    setDelay(next);
    replay();
  };

  return (
    <div className="fixed right-4 bottom-4 z-[9999] font-sans text-xs">
      {open ? (
        <div className="w-60 space-y-3 rounded-lg border border-neutral-700 bg-neutral-950/95 p-3 text-neutral-300 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="font-bold text-neutral-100">First-visit mode</span>
            <button
              aria-label="Close dev toolbar"
              className="px-1 text-neutral-500 hover:text-neutral-200"
              onClick={() => setOpen(false)}
              type="button"
            >
              ✕
            </button>
          </div>
          <label className="flex cursor-pointer items-center justify-between">
            <span>Simulate a new visitor</span>
            <button
              aria-checked={enabled}
              className={cn(
                "relative h-5 w-9 rounded-full transition-colors",
                enabled ? "bg-emerald-600" : "bg-neutral-700",
              )}
              onClick={() => apply(enabled ? null : 2000)}
              role="switch"
              type="button"
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform",
                  enabled && "translate-x-4",
                )}
              />
            </button>
          </label>
          <div
            className={cn(
              "space-y-1.5",
              !enabled && "pointer-events-none opacity-40",
            )}
          >
            <span className="text-neutral-400">Data delay</span>
            <div className="grid grid-cols-4 gap-1">
              {DELAYS.map((ms) => (
                <button
                  className={cn(
                    "rounded-md py-1",
                    delay === ms
                      ? "bg-emerald-700 text-white"
                      : "bg-neutral-800 hover:bg-neutral-700",
                  )}
                  key={ms}
                  onClick={() => apply(ms)}
                  type="button"
                >
                  {ms / 1000}s
                </button>
              ))}
            </div>
          </div>
          <button
            className="w-full rounded-md bg-neutral-800 py-1.5 hover:bg-neutral-700"
            onClick={replay}
            type="button"
          >
            ↻ Replay this page
          </button>
          <p className="text-[10px] leading-snug text-neutral-500">
            For cold images too, tick “Disable cache” in DevTools → Network.
          </p>
        </div>
      ) : (
        <button
          className={cn(
            "rounded-full border px-3 py-1.5 shadow-lg",
            enabled
              ? "border-emerald-600 bg-emerald-950 text-emerald-300"
              : "border-neutral-700 bg-neutral-950 text-neutral-400",
          )}
          onClick={() => setOpen(true)}
          type="button"
        >
          First visit: {enabled ? `ON · ${(delay ?? 0) / 1000}s` : "OFF"}
        </button>
      )}
    </div>
  );
}
