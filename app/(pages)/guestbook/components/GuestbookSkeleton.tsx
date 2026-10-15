import { Skeleton } from "@/app/components/ui/Skeleton";

import OAuthButtons from "./OAuthButtons";

// Holds the sign-in card or the comment form. Its minimum height is the
// form's, so the skeleton, the card and the form all take the same space and
// nothing below moves when the page loads or the visitor signs in.
export const GUESTBOOK_SLOT =
  "flex min-h-[299px] w-full items-center justify-center";

// Enough rows to reach past the bottom of the screen, so extra loaded entries
// only grow the page out of view.
const ROWS = ["a", "b", "c", "d", "e", "f", "g", "h"];

/**
 * Shown while the guestbook loads: the real header with a spinner in place
 * of the comment count, dimmed sort buttons, and pulsing rows. Each part has
 * the loaded part's exact size, so nothing moves when the content arrives.
 */
export default function GuestbookSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading guestbook"
      data-page-loading
      role="status"
    >
      <div className={GUESTBOOK_SLOT}>
        <OAuthButtons placeholder />
      </div>
      <div className="-mt-2 flex w-full flex-row-reverse items-end justify-between rounded-xs border-neutral-900/50 border-b-8 pb-2 text-neutral-200 sm:flex-row">
        <div className="border-neutral-800 border-r-8 border-double pr-2 sm:border-r-0 sm:border-l-8 sm:pl-2">
          <p className="text-neutral-300">
            <svg
              aria-hidden="true"
              className="-ml-1 inline animate-spin"
              height="22"
              viewBox="0 0 24 24"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="rgb(16, 185, 129)">
                <path
                  clipRule="evenodd"
                  d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
                  fillRule="evenodd"
                  opacity=".2"
                />
                <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
              </g>
            </svg>{" "}
            <span className="text-neutral-400">-</span> comments
          </p>
        </div>
        <div className="pointer-events-none flex select-none gap-2 rounded-md border border-neutral-700/80 bg-neutral-900 p-1 text-sm opacity-70">
          <span className="rounded-md bg-neutral-700 px-1.5 py-0.5 text-emerald-300">
            Newest
          </span>
          <span className="rounded-md px-1.5 py-0.5">Oldest</span>
        </div>
      </div>
      {/* Same list and row layout as GuestbookEntries, with one-line comments. */}
      <ul className="mt-4 flex min-h-max flex-col gap-1 sm:min-h-[480px]">
        {ROWS.map((key) => (
          <li key={key}>
            <Skeleton className="flex flex-row items-start gap-3 px-1 py-4 *:invisible md:px-2">
              <div className="h-[42px] min-w-[42px]" />
              <div>
                <p>&nbsp;</p>
                <p className="text-sm md:text-base">&nbsp;</p>
              </div>
            </Skeleton>
          </li>
        ))}
      </ul>
    </div>
  );
}
