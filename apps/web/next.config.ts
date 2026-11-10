import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: [
    "@drivenet/ui",
    "@drivenet/i18n",
    "@drivenet/api-client",
    "@drivenet/schemas",
  ],
};

export default nextConfig;
