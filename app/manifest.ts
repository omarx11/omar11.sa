import type { MetadataRoute } from "next";

import { author } from "@/config/meta";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: author.siteName,
    short_name: author.name,
    description: author.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    // The site is dark-only (same as the viewport theme colour in the layout).
    theme_color: "#000000",
    background_color: "#000000",
    icons: [192, 256, 384, 512].map((size) => ({
      src: `/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
  };
}
