import { useMemo } from "react";
import { cn } from "@/app/lib/utils";

const Pagination = ({
  pages,
  state,
  onPageChange,
  className,
  note,
}: PaginationProps) => {
  const { page, window } = state;

  const paginateButtons = useMemo(() => {
    const buttonsArray: JSX.Element[] = [];
    let maxLeft = page - Math.floor(window / 2);
    let maxRight = page + Math.floor(window / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = window;
    }

    if (maxRight > pages) {
      maxLeft = pages - (window - 1);
      if (maxLeft < 1) maxLeft = 1;
      maxRight = pages;
    }

    for (let i = maxLeft; i <= maxRight; i++) {
      buttonsArray.push(
        <button
          key={i}
          aria-label={`Page ${i}`}
          className={cn("rounded-sm px-2 py-0.5 underline hover:no-underline", {
            "cursor-default bg-emerald-700 no-underline": page === i,
            "hover:bg-neutral-800": page !== i,
          })}
          onClick={() => page !== i && onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Add Previous and Next buttons
    buttonsArray.unshift(
      <button
        key="prev"
        aria-label="Previous page"
        disabled={page === 1}
        className={cn(
          "rounded-md px-2",
          page === 1
            ? "pointer-events-none text-neutral-600"
            : "bg-neutral-900 hover:bg-neutral-800"
        )}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </button>
    );

    buttonsArray.push(
      <button
        key="next"
        aria-label="Next page"
        disabled={page === pages}
        className={cn(
          "rounded-md px-2",
          page === pages
            ? "pointer-events-none text-neutral-600"
            : "bg-neutral-900 hover:bg-neutral-800"
        )}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    );

    return buttonsArray;
  }, [page, window, pages, onPageChange]);

  return (
    <div
      className={cn(
        "flex w-full flex-wrap-reverse items-center justify-between gap-4 text-neutral-100 sm:flex-nowrap md:gap-0",
        className
      )}
    >
      {note && (
        <p className="text-xs text-neutral-400">
          All data comes from {`Steam's`} API. If any of those services are
          down, data will not be shown.
        </p>
      )}
      <div className="flex select-none gap-1 text-sm">{paginateButtons}</div>
    </div>
  );
};

export default Pagination;
