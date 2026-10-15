import type { MetadataRoute } from "next";

import { author } from "@/app/config/meta";

// Google ignores changefreq/priority and only trusts lastmod when it's
// accurate, so only pages with a known last change carry one.
const pages: { path: string; lastModified?: string }[] = [
  { path: "" },
  { path: "/about" },
  { path: "/skills" },
  { path: "/specs" },
  { path: "/games" },
  { path: "/anime" },
  { path: "/guestbook" },
  { path: "/license" },
  { path: "/privacy-policy", lastModified: "2026-10-15" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, lastModified }) => ({
    url: `${author.siteUrl}${path}`,
    ...(lastModified && { lastModified }),
  }));
}
