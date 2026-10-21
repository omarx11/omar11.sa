import { cacheLife } from "next/cache";

// Time-based values in prerendered UI must be cached, so pages stay static.
// A day of staleness is invisible for these.

export async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
