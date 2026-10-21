import { cookies } from "next/headers";

import { FIRST_VISIT_COOKIE } from "./first-visit-cookie";

/**
 * Development only: when the toolbar's "First-visit mode" is on, delays a data
 * section so its loading state is visible, as on an uncached first visit.
 *
 * In production builds `NODE_ENV` is inlined, so this returns immediately and
 * never reads cookies (pages stay prerendered).
 */
export async function simulateFirstVisit(): Promise<void> {
  if (process.env.NODE_ENV !== "development") return;
  const delay = Number((await cookies()).get(FIRST_VISIT_COOKIE)?.value);
  if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
}
