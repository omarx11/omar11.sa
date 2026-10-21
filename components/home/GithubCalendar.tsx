import { author } from "@/config/meta";
import { simulateFirstVisit } from "@/lib/dev/first-visit";
import { getContributions } from "@/lib/github";

import ContributionsCalendar from "./ContributionsCalendar";

/**
 * GitHub contributions, rendered from server-fetched data so the calendar is
 * part of the page from the first paint (no client fetch, no pop-in).
 */
export default async function GithubCalendar() {
  await simulateFirstVisit();
  const contributions = await getContributions(author.githubUsername);

  // The calendar forces `width: max-content` inline; containing its inline size
  // stops it from widening the page on small screens (it scrolls instead).
  return (
    <div className="mt-11 w-full contain-inline-size">
      {/* If the API is unavailable, the calendar keeps its placeholder. */}
      <ContributionsCalendar data={contributions ?? undefined} />
    </div>
  );
}

/** Same size as the calendar, using its built-in animated loading state. */
export function GithubCalendarSkeleton() {
  // On phones the loaded footer wraps to two lines; reserve that height.
  return (
    <div
      className="mt-11 w-full contain-inline-size max-sm:min-h-[212px]"
      data-page-loading
    >
      <ContributionsCalendar />
    </div>
  );
}
