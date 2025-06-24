import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  optimizeFonts: false,
  allowedDevOrigins: ['127.0.0.1', 'localhost', '*.localhost'],
};

export default nextConfig;
