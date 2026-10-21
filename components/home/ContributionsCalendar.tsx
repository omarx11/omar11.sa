"use client";

import { type PointerEvent, useMemo, useState } from "react";
import { type Activity, ActivityCalendar } from "react-activity-calendar";

// GitHub's own contribution colors (as used by react-github-calendar).
const gitHubTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const calendarProps = {
  blockMargin: 6,
  blockSize: 14,
  colorScheme: "dark",
  fontSize: 14,
  style: { color: "rgb(163,163,163)" },
  theme: gitHubTheme,
} as const;

// Activity dates are calendar days ("2026-10-14"); format them as such.
const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const describe = (count: number, date: string) => {
  const day = dayFormat.format(new Date(date));
  if (count === 0) return `No contributions on ${day}`;
  return `${count} contribution${count === 1 ? "" : "s"} on ${day}`;
};

type Hovered = { text: string; x: number; y: number };

/**
 * The contributions calendar, with a tooltip on each day (like GitHub's).
 * Without data it shows the calendar's built-in animated loading state.
 *
 * The calendar's own `tooltips` option mounts a floating tooltip on every one
 * of the ~370 days, which overloads React on load; this uses one tooltip for
 * the whole calendar instead.
 */
export default function ContributionsCalendar({ data }: { data?: Activity[] }) {
  const [hovered, setHovered] = useState<Hovered | null>(null);
  const counts = useMemo(
    () => new Map(data?.map((day) => [day.date, day.count])),
    [data],
  );

  if (!data) return <ActivityCalendar {...calendarProps} data={[]} loading />;

  const onPointerOver = (e: PointerEvent<HTMLDivElement>) => {
    const day = (e.target as Element).closest<SVGRectElement>(
      "rect[data-date]",
    );
    const date = day?.dataset.date;
    if (!day || !date) return setHovered(null);
    const box = day.getBoundingClientRect();
    const origin = e.currentTarget.getBoundingClientRect();
    setHovered({
      text: describe(counts.get(date) ?? 0, date),
      x: box.left - origin.left + box.width / 2,
      y: box.top - origin.top,
    });
  };

  return (
    <div
      className="relative"
      onPointerLeave={() => setHovered(null)}
      onPointerOver={onPointerOver}
      // On phones the calendar scrolls sideways; don't leave the tooltip behind.
      onScrollCapture={() => setHovered(null)}
    >
      <ActivityCalendar
        {...calendarProps}
        data={data}
        labels={{ totalCount: "{{count}} contributions in the last year" }}
      />
      {hovered && (
        <div
          className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full rounded-xs bg-neutral-900 px-2 py-1 text-sm whitespace-nowrap text-neutral-200 ring-2 ring-neutral-700"
          role="tooltip"
          style={{ left: hovered.x, top: hovered.y - 8 }}
        >
          {hovered.text}
        </div>
      )}
    </div>
  );
}
