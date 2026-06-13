import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "<your-project-id>.supabase.co",
      },
    ],
  },
};

export default nextConfig;
