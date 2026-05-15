import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.lenskart.com",
        pathname: "/media/owndays/img/**",
      },
    ],
  },
};

export default nextConfig;
