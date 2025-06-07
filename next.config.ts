import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'build',  // Change build output directory from .next to build
  images: {
    unoptimized: false,  // Enable image optimization since we're not doing static export
  },
};

export default nextConfig;
