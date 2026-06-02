import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — deployable to Cloudflare Pages and any static host.
  output: "export",
  // next/image optimization isn't available on a static export.
  images: { unoptimized: true },
  // Emit folder-style URLs (e.g. /about/index.html) for clean static routing.
  trailingSlash: true,
};

export default nextConfig;
