import type { MetadataRoute } from "next";

import { author } from "@/config/meta";
import { pages } from "@/config/navigation";

// Google ignores changefreq/priority and only trusts lastmod when it's
// accurate, so only pages with a known last change carry one.
const lastModified: Record<string, string> = {
  "/privacy-policy": "2026-10-15",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ href }) => ({
    url: href === "/" ? author.siteUrl : `${author.siteUrl}${href}`,
    ...(lastModified[href] && { lastModified: lastModified[href] }),
  }));
}
