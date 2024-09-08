import { MetadataRoute } from "next";
import { getURL } from "@/app/lib/helpers";

export default function sitemap(): MetadataRoute.Sitemap {
  const pathname = getURL();
  return [
    {
      url: `${pathname}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${pathname}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${pathname}/skills`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${pathname}/specs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${pathname}/games`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${pathname}/anime`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${pathname}/guestbook`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${pathname}/license`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.4,
    },
  ];
}
