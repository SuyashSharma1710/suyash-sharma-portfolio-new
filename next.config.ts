import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["gsap"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  // Silence false-positive workspace root detection caused by a parent
  // package-lock.json at C:\Users\priya\
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
