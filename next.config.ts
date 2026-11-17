import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    // Tailwind output is small; inlining removes the render-blocking stylesheet request (LCP).
    inlineCss: true,
  },
  // Photos are pre-built static files (scripts/images.mjs) with a content hash in each name, so
  // browsers and the CDN can keep them for a year; a new photo gets a new name.
  async headers() {
    return [{ source: "/img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }];
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
