import type { NextConfig } from "next";

// Static export, published to GitHub Pages at foundersillinois.org (see .github/workflows/deploy.yml).
// Pages are written as "forge.html"-style files, so old links like /forge.html keep working.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
};

export default nextConfig;
