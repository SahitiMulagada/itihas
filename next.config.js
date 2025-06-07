/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  distDir: 'build',  // Change build output directory from .next to build
  images: {
    unoptimized: true,  // Disable image optimization for static export
  },
  eslint: {
    ignoreDuringBuilds: true,  // Temporarily ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true,  // Temporarily ignore TypeScript errors during build
  },
};

module.exports = nextConfig;
