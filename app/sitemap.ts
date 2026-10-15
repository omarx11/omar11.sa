import type { MetadataRoute } from "next";

import { getURL } from "@/app/lib/helpers";

export default function sitemap(): MetadataRoute.Sitemap {
  const pathname = getURL();
  return [
    {
      url: `${pathname}`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${pathname}/about`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${pathname}/skills`,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${pathname}/specs`,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${pathname}/games`,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${pathname}/anime`,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${pathname}/guestbook`,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${pathname}/license`,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: `${pathname}/privacy-policy`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
