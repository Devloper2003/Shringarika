import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    qualities: [75, 85, 90, 95],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
