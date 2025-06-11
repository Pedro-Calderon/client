import type { NextConfig } from "next";

const nextConfig: NextConfig = {
reactStrictMode: true,
  env: {
    SHOW_DEV_TOOLS: process.env.NODE_ENV === "development" ? "true" : "false",
  },
};

export default nextConfig;
