"use client";

import { Children, type ReactNode, useState } from "react";

const STEP = 3;

/**
 * Shows the activity a few months at a time, like GitHub's "Show more
 * activity"; `more` (a link to the full profile) replaces the button once
 * everything is shown. New months take the container's staggered entrance.
 */
export function ActivityShowMore({
  children,
  more,
}: {
  children: ReactNode;
  more: ReactNode;
}) {
  const months = Children.toArray(children);
  const [shown, setShown] = useState(STEP);

  return (
    <div className="mt-10">
      <div className="fade-in-up space-y-8">{months.slice(0, shown)}</div>
      <div className="mt-8 flex justify-center text-sm">
        {shown < months.length ? (
          <button
            className="inline-flex h-10 items-center rounded-md bg-neutral-800 px-6 text-neutral-200 hover:underline"
            onClick={() => setShown((n) => n + STEP)}
            type="button"
          >
            Show more activity
          </button>
        ) : (
          more
        )}
      </div>
    </div>
  );
}
