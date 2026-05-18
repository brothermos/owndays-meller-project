import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.owndays.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
