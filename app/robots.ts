import type { MetadataRoute } from "next";

import { author } from "@/app/config/meta";

export default function robots(): MetadataRoute.Robots {
  return {
    // Everything public is crawlable; API and OAuth endpoints aren't pages.
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/auth/"] },
    sitemap: `${author.siteUrl}/sitemap.xml`,
    host: author.siteUrl,
  };
}
