import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static shells + `use cache` for data; enables instant navigations.
  cacheComponents: true,
  // Links prefetch each route's static shell; dynamic parts stream in.
  partialPrefetching: true,
  images: {
    // Only Steam's portrait covers are resized remotely; other remote images
    // (avatars, Steam headers, achievement icons) load directly from their CDN.
    remotePatterns: [{ protocol: "https", hostname: "shared.steamstatic.com" }],
  },
  async redirects() {
    return [
      // The CV's old public URL (shared links, search results): send people
      // to the bot-checked "Download CV" button instead.
      {
        source: "/static/files/omar_abdulaziz_cv_en.pdf",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

// Proxies BotID's challenge script and API through this domain.
export default withBotId(nextConfig);
