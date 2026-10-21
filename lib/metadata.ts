import type { Metadata } from "next";

import { author } from "@/config/meta";

// A page that sets `openGraph`/`twitter` replaces the inherited objects, so
// the shared card from app/opengraph-image.tsx is listed explicitly.
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${author.fullName}, ${author.jobTitle} from ${author.city}, ${author.country}`,
};

/**
 * Metadata for a page: title, description, canonical URL and matching social
 * tags, all pointing at the shared card.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Route path, e.g. "/skills". */
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: author.siteName,
      locale: "en_US",
      url: path,
      title,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      creator: author.twitterHandle,
      title,
      description,
      images: [shareImage],
    },
  };
}
