import { ActivityCalendar } from "react-activity-calendar";

import { getContributions } from "@/app/lib/github";

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

/**
 * GitHub contributions, rendered from server-fetched data so the calendar is
 * part of the page from the first paint (no client fetch, no pop-in).
 */
export default async function GithubCal() {
  const contributions = await getContributions("omarx11");

  // The calendar forces `width: max-content` inline; containing its inline size
  // stops it from widening the page on small screens (it scrolls instead).
  return (
    <div className="mt-12 w-full contain-inline-size">
      {contributions ? (
        <ActivityCalendar
          {...calendarProps}
          data={contributions}
          labels={{
            totalCount: "{{count}} contributions in the last year",
          }}
        />
      ) : (
        // API unavailable: the calendar's built-in placeholder state.
        <ActivityCalendar {...calendarProps} data={[]} loading />
      )}
    </div>
  );
}
