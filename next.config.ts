import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only Steam's portrait covers are resized remotely; other remote images
    // (avatars, Steam headers, achievement icons) load directly from their CDN.
    remotePatterns: [{ protocol: "https", hostname: "shared.steamstatic.com" }],
  },
};

export default nextConfig;
