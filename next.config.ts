import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.lenskart.com",
        pathname: "/media/owndays/img/**",
      },
      {
        protocol: "https",
        hostname: "www.owndays.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
