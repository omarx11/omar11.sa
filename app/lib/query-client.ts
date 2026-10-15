import { QueryClient } from "@tanstack/react-query";

let browserClient: QueryClient | undefined;

/**
 * One QueryClient per browser tab, shared by every feature that uses it, so
 * cached data survives navigating between pages. Each server render gets its
 * own client.
 */
export function getQueryClient() {
  if (typeof window === "undefined") return new QueryClient();
  browserClient ??= new QueryClient();
  return browserClient;
}
