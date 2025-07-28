import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'images.unsplash.com'
      }
    ]
  }
};

export default nextConfig;
