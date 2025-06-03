import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'build',  // Change build output directory from .next to build
  output: 'export',  // Generate static HTML/CSS/JS output
  images: {
    unoptimized: true,  // Required for static export
  },
};

export default nextConfig;
