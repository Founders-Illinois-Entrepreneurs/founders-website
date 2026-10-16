import type { NextConfig } from "next";

// Static export for GitHub Pages on the custom domain foundersillinois.org.
// The site is served from the domain root, so no basePath or assetPrefix is needed.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Keep "events.html"-style files so old links like /forge.html and /teams.html keep working.
  trailingSlash: false,
  reactStrictMode: true,
};

export default nextConfig;
