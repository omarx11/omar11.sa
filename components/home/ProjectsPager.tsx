"use client";

import {
  type CSSProperties,
  createContext,
  type ReactNode,
  use,
  useEffect,
  useRef,
  useState,
} from "react";

import { scramble } from "@/hooks/useScramble";
import { cn } from "@/lib/utils";

/** The page showing, and how many turns so far (only ever goes up). */
const PageTurn = createContext({ page: 0, turns: 0 });

// Page-turn timing. Each tile flips (and dips) for FLIP_MS; the wave starts
// the next tile STAGGER_MS later (STAGGER_SM_MS on phones, one column).
const FLIP_MS = 300;
const STAGGER_MS = 35;
const STAGGER_SM_MS = 25;

type Wave = "next" | "prev" | "sm";

/**
 * When cell `i` starts turning. The wave starts at the pressed arrow: bottom
 * right for next, bottom left for previous, and the bottom card on phones.
 */
function waveDelay(i: number, cells: number, wave: Wave): number {
  if (wave === "sm") return (cells - 1 - i) * STAGGER_SM_MS;
  const col = i % 3;
  const fromBottom = Math.ceil(cells / 3) - 1 - Math.floor(i / 3);
  return (
    (wave === "next" ? 2 - col : col) * STAGGER_MS + fromBottom * STAGGER_MS
  );
}

// Each tile shrinks and darkens as it turns edge-on.
const DIP: Keyframe[] = [
  { scale: "1", filter: "brightness(1)" },
  { scale: "0.9", filter: "brightness(0.55)" },
  { scale: "1", filter: "brightness(1)" },
];

/**
 * The project cards, a page at a time. Every grid cell is a two-sided tile:
 * face A shows while `turn` is even, face B while it's odd. Before a turn the
 * hidden face gets the target page, then the tiles flip (globals.css).
 * `children` sits between the arrows.
 *
 * Next.js keeps this page's state while it is hidden (Activity), so a turn's
 * one-off effects run from the click, never from state: when the page is
 * shown again, CSS animations restart and would replay them.
 */
export function ProjectsPager({
  pages,
  children,
}: {
  pages: ReactNode[][];
  children: ReactNode;
}) {
  const [view, setView] = useState({
    page: 0,
    turn: 0,
    faces: [0, Math.min(1, pages.length - 1)],
    dir: "next" as "next" | "prev",
    // Unlike `turn` (which goes back down on "previous"), counts every turn.
    turns: 0,
  });
  const grid = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const cells = pages[0]?.length ?? 0;

  // A turn must finish before the next one starts: a new turn refills the
  // hidden faces, and tiles late in the wave would still be showing them.
  // So presses during a turn are queued, one page each (net, and never past
  // the first or last page), and play one turn at a time. The page lives in
  // a ref too, for the queued turns.
  const currentPage = useRef(0);
  const busyUntil = useRef(0);
  const queued = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  useEffect(
    () => () => {
      clearTimeout(timer.current);
      queued.current = 0;
    },
    [],
  );

  const turnPage = (step: 1 | -1) => {
    const target = currentPage.current + step;
    if (target < 0 || target >= pages.length) return;
    currentPage.current = target;
    const dir = step > 0 ? "next" : "prev";
    setView((v) => {
      const turn = v.turn + step;
      const faces = [...v.faces];
      faces[turn & 1] = target; // `& 1` is 1 for negative odd numbers too.
      return { page: target, turn, faces, dir, turns: v.turns + 1 };
    });

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wave = matchMedia("(min-width: 768px)").matches ? dir : "sm";
    let last = 0;
    grid.current
      ?.querySelectorAll<HTMLElement>(".project-flip")
      .forEach((tile, i) => {
        const delay = waveDelay(i, cells, wave);
        last = Math.max(last, delay);
        if (!reduced) {
          tile.animate(DIP, {
            duration: FLIP_MS,
            delay,
            easing: "ease-in-out",
          });
        }
      });

    const duration = reduced ? 0 : last + FLIP_MS;
    busyUntil.current = performance.now() + duration;
    timer.current = window.setTimeout(() => {
      if (queued.current === 0) return;
      const next = queued.current > 0 ? 1 : -1;
      queued.current -= next;
      turnPage(next);
    }, duration);
  };

  const go = (step: 1 | -1) => {
    if (performance.now() >= busyUntil.current) return turnPage(step);
    // Keep the queued pages within the first and last page.
    const at = currentPage.current;
    queued.current = Math.min(
      pages.length - 1 - at,
      Math.max(-at, queued.current + step),
    );
  };

  return (
    <PageTurn value={{ page: view.page, turns: view.turns }}>
      <div
        className="md:fade-in mt-10 grid gap-5 md:grid-cols-3"
        data-dir={view.dir}
        id="projects"
        // Swipe sideways on touch screens to turn the page.
        onTouchEnd={(e) => {
          const start = touch.current;
          const end = e.changedTouches[0];
          if (!start || !end) return;
          const dx = end.clientX - start.x;
          const dy = end.clientY - start.y;
          if (Math.abs(dx) > 60 && Math.abs(dx) > 1.5 * Math.abs(dy)) {
            go(dx < 0 ? 1 : -1);
          }
        }}
        onTouchStart={(e) => {
          const t = e.touches[0];
          touch.current = t ? { x: t.clientX, y: t.clientY } : null;
        }}
        ref={grid}
        style={{ "--flip-ms": `${FLIP_MS}ms` } as CSSProperties}
      >
        {Array.from({ length: cells }, (_, i) => {
          const cell = {
            "--delay-next": `${waveDelay(i, cells, "next")}ms`,
            "--delay-prev": `${waveDelay(i, cells, "prev")}ms`,
            "--delay-sm": `${waveDelay(i, cells, "sm")}ms`,
          } as CSSProperties;
          return (
            <div
              className={cn(
                // The hovered card sits above its neighbours, so its status
                // tooltip isn't covered by the next card.
                "relative hover:z-10",
                // One card per row on phones: drop the last page's empty
                // cells there instead of leaving tall gaps (the 3-column
                // grid keeps them, so it doesn't change height).
                !pages[view.page]?.[i] && "max-md:hidden",
              )}
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed grid cells
              key={i}
              style={cell}
            >
              <div className="project-flip">
                <div
                  className="project-flip-inner"
                  style={{ transform: `rotateY(${view.turn * 180}deg)` }}
                >
                  {view.faces.map((page, face) => (
                    <div
                      className="project-face"
                      inert={(view.turn & 1) !== face}
                      // biome-ignore lint/suspicious/noArrayIndexKey: the two faces
                      key={face}
                    >
                      {pages[page]?.[i]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-center gap-3">
        <PageArrow
          dir="prev"
          disabled={view.page === 0}
          label={`Previous projects, page ${view.page} of ${pages.length}`}
          onClick={() => go(-1)}
        />
        {children}
        <PageArrow
          dir="next"
          disabled={view.page === pages.length - 1}
          label={`Next projects, page ${view.page + 2} of ${pages.length}`}
          onClick={() => go(1)}
        />
      </div>
    </PageTurn>
  );
}

/** An arrow button beside "view all projects"; `label` names its target page. */
export function PageArrow({
  dir,
  disabled,
  label,
  onClick,
}: {
  dir: "prev" | "next";
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={
        (!disabled && label) ||
        (dir === "next" ? "Next projects" : "Previous projects")
      }
      className="group/arrow inline-flex size-10 items-center justify-center rounded-md bg-neutral-800 text-neutral-300 transition-opacity hover:text-neutral-50 disabled:cursor-default disabled:opacity-35"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <svg
        aria-hidden={true}
        className={cn(
          "transition-transform group-enabled/arrow:group-hover/arrow:translate-x-0.5",
          dir === "prev" &&
            "rotate-180 group-enabled/arrow:group-hover/arrow:-translate-x-0.5",
        )}
        height="1.2rem"
        viewBox="0 0 24 24"
        width="1.2rem"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m9 5 7 7-7 7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}

// Half-width katakana and digits, as in The Matrix's code rain.

/**
 * A card title that decodes from random glyphs when its page turns into
 * view, locking in left to right once the card faces the viewer.
 */
export function ScrambleText({ text, page }: { text: string; page: number }) {
  const { page: current, turns } = use(PageTurn);
  const [shown, setShown] = useState(text);
  // The last turn this title has handled. Effects re-run when Next.js shows
  // the page again, and only a new turn should decode. A title mounted by a
  // turn (its card was just loaded onto the turning face) hasn't handled it
  // yet; only the first page's titles, on load, start as handled.
  const seenTurns = useRef(turns === 0 ? 0 : -1);

  useEffect(() => {
    if (turns === seenTurns.current) return;
    if (page !== current) {
      seenTurns.current = turns;
      return;
    }
    // The turn counts as handled only once the decode has finished, so a
    // decode cut short (React re-running the effect) starts again.
    const cancel = scramble(text, (frame) => {
      setShown(frame);
      if (frame === text) seenTurns.current = turns;
    });
    return () => {
      cancel();
      setShown(text);
    };
  }, [turns, current, page, text]);

  return (
    <>
      <span aria-hidden={true}>{shown}</span>
      <span className="sr-only">{text}</span>
    </>
  );
}
