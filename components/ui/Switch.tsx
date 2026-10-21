import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A small segmented switch (e.g. Projects / Activity, Newest / Oldest): a
 * group of SwitchButtons, one of them active.
 */
export function Switch({
  label,
  className,
  children,
}: {
  /** What the switch chooses, for screen readers. */
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <fieldset
      className={cn(
        "flex shrink-0 rounded-md bg-neutral-800 p-0.5 text-xs select-none",
        className,
      )}
    >
      <legend className="sr-only">{label}</legend>
      {children}
    </fieldset>
  );
}

export function SwitchButton({
  active,
  icon,
  onClick,
  children,
}: {
  active: boolean;
  icon?: ReactNode;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-2 py-1 transition-colors",
        active
          ? "bg-neutral-700 text-neutral-100"
          : "text-neutral-400 hover:text-neutral-200",
      )}
      onClick={onClick}
      type="button"
    >
      {icon}
      {children}
    </button>
  );
}

/** A 12px line icon for a SwitchButton. */
export const switchIcon = (paths: ReactNode) => (
  <svg
    aria-hidden={true}
    fill="none"
    height="12"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="12"
    xmlns="http://www.w3.org/2000/svg"
  >
    {paths}
  </svg>
);
