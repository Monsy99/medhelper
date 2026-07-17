import type { NextConfig } from "next";

// GitHub Pages serves the site from https://<user>.github.io/<repo>/, so
// every asset/link needs that repo name as a basePath. GITHUB_REPOSITORY is
// set automatically in GitHub Actions ("owner/repo"); locally there's no
// basePath so `npm run dev` still serves from `/`.
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = process.env.GITHUB_ACTIONS && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
