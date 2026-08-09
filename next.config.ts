import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "afmyqwimovvwrkllavyz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
