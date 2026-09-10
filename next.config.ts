import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Silence false-positive workspace root detection caused by a parent
  // package-lock.json at C:\Users\priya\
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
