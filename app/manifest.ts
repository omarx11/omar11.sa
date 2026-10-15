import type { MetadataRoute } from "next";

import { author } from "@/app/config/meta";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: author.siteName,
    short_name: author.name,
    description: author.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    theme_color: "#171717",
    background_color: "#b6d2ff",
    icons: [192, 256, 384, 512].map((size) => ({
      src: `/icon-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
  };
}
