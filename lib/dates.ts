const UNITS: [seconds: number, name: string][] = [
  [31_536_000, "year"],
  [2_592_000, "month"],
  [604_800, "week"],
  [86_400, "day"],
  [3_600, "hour"],
  [60, "minute"],
  [1, "second"],
];

/** How long ago `since` was, as a phrase: "for 2 hours", or "just now". */
export function durationSince(since: Date): string {
  const seconds = (Date.now() - since.getTime()) / 1000;
  for (const [unitSeconds, name] of UNITS) {
    if (seconds >= unitSeconds) {
      const amount = Math.floor(seconds / unitSeconds);
      return `for ${amount} ${name}${amount > 1 ? "s" : ""}`;
    }
  }
  return "just now";
}

const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

/** "Oct 19, 2026, 6:42 PM". */
export const formatDateTime = (date: Date | string): string =>
  dateTimeFormat.format(new Date(date));

const YEAR_MS = 1000 * 60 * 60 * 24 * 365.25;

/** Age in years with nine decimals, e.g. "27.006018707". */
export const ageInYears = (birthDate: string, now = Date.now()): string =>
  ((now - new Date(birthDate).getTime()) / YEAR_MS).toFixed(9);
