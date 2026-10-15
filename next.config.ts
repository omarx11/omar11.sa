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
};

export default nextConfig;
