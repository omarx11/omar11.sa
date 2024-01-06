import { cn } from "@/app/lib/utils";
import { useEffect, useState } from "react";

const Pagination = ({ pages, state, onPageChange, className, note }) => {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    paginateButtons();
  }, [pages, state]);

  const paginateButtons = () => {
    let maxLeft = state.page - Math.floor(state.window / 2);
    let maxRight = state.page + Math.floor(state.window / 2);

    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = state.window;
    }

    if (maxRight > pages) {
      maxLeft = pages - (state.window - 1);

      if (maxLeft < 1) maxLeft = 1;
      maxRight = pages;
    }

    const buttonsArray = [];

    for (let page = maxLeft; page <= maxRight; page++) {
      buttonsArray.push(
        <button
          key={page}
          value={page}
          className={cn(
            "rounded-sm px-2 py-0.5 underline hover:no-underline",
            {
              "cursor-default bg-emerald-700 no-underline": state.page === page,
            },
            {
              "hover:bg-neutral-800": state.page !== page,
            },
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>,
      );
    }

    if (state.page !== 1) {
      buttonsArray.unshift(
        <button
          key="prev"
          value={state.page - 1}
          className="rounded-md bg-neutral-900 px-2 hover:bg-neutral-800"
          onClick={() => onPageChange(state.page - 1)}
        >
          Previous
        </button>,
      );
    } else {
      buttonsArray.unshift(
        <button
          key="prev"
          value={state.page - 1}
          className="pointer-events-none px-2 text-neutral-600"
        >
          Previous
        </button>,
      );
    }

    if (state.page !== pages) {
      buttonsArray.push(
        <button
          key="next"
          value={state.page + 1}
          className="rounded-md bg-neutral-900 px-2 hover:bg-neutral-800"
          onClick={() => onPageChange(state.page + 1)}
        >
          Next
        </button>,
      );
    } else {
      buttonsArray.push(
        <button
          key="next"
          value={state.page + 1}
          className="pointer-events-none px-2 text-neutral-600"
        >
          Next
        </button>,
      );
    }

    setButtons(buttonsArray);
  };

  return (
    <div
      className={cn(
        "mt-6 flex flex-wrap-reverse items-center justify-between gap-4 text-neutral-100 md:gap-0",
        className,
      )}
    >
      {note && (
        <p className="text-xs text-neutral-400">
          All data comes from Steams API's. If any of those services are down,
          data with not be shown.
        </p>
      )}
      <div className="flex select-none gap-1 text-sm">{buttons}</div>
    </div>
  );
};

export default Pagination;
