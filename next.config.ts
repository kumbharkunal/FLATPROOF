import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    // Tailwind output is small; inlining removes the render-blocking stylesheet request (LCP).
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit quality allowlist.
    qualities: [60, 70, 75, 80, 85],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [64, 128, 256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
