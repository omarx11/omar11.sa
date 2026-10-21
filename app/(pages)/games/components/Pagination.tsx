import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The page numbers to show: `visiblePages` of them, centred on `page`. */
function pageRange(page: number, pageCount: number, visiblePages: number) {
  const count = Math.min(visiblePages, pageCount);
  const first = Math.min(
    Math.max(1, page - Math.floor(count / 2)),
    pageCount - count + 1,
  );
  return Array.from({ length: count }, (_, i) => first + i);
}

/**
 * Previous / numbered / Next buttons. `children` (e.g. a note about the data)
 * sits on the other side of the row.
 */
export default function Pagination({
  page,
  pageCount,
  visiblePages,
  onPageChange,
  className,
  children,
}: {
  page: number;
  pageCount: number;
  /** How many numbered buttons to show at once. */
  visiblePages: number;
  onPageChange: (page: number) => void;
  className?: string;
  children?: ReactNode;
}) {
  const edgeButton = (disabled: boolean) =>
    cn(
      "rounded-md px-2",
      disabled
        ? "pointer-events-none text-neutral-600"
        : "bg-neutral-900 hover:bg-neutral-800",
    );

  return (
    <div
      className={cn(
        "flex w-full flex-wrap-reverse items-center justify-between gap-4 text-neutral-100 sm:flex-nowrap md:gap-0",
        className,
      )}
    >
      {children}
      <div className="flex gap-1 text-sm select-none">
        <button
          aria-label="Previous page"
          className={edgeButton(page <= 1)}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          type="button"
        >
          Previous
        </button>
        {pageRange(page, pageCount, visiblePages).map((number) => (
          <button
            aria-current={number === page ? "page" : undefined}
            aria-label={`Page ${number}`}
            className={cn(
              "rounded-xs px-2 py-0.5 underline hover:no-underline",
              number === page
                ? "cursor-default bg-emerald-700 no-underline"
                : "hover:bg-neutral-800",
            )}
            key={number}
            onClick={() => number !== page && onPageChange(number)}
            type="button"
          >
            {number}
          </button>
        ))}
        <button
          aria-label="Next page"
          className={edgeButton(page >= pageCount)}
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
