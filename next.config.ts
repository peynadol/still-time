import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    return config;
  },
};

export default nextConfig;
