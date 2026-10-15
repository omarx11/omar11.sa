import { cacheLife } from "next/cache";

import { ageInYears } from "./helpers";

// Time-based values in prerendered UI must be cached, so pages stay static.
// A day of staleness is invisible for these.

export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

/** Starting value for the live age counter, before it begins ticking. */
export async function getInitialAge(birthDate: string): Promise<string> {
  "use cache";
  cacheLife("days");
  return ageInYears(birthDate);
}
