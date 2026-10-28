import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/projects/prepwise-ai-mock-interview-platform", destination: "/#prepwise", permanent: true },
      { source: "/projects/maple-reinders-executive-analytics", destination: "/#executive-analytics", permanent: true },
      { source: "/projects/amazon-reviews-etl-pipeline", destination: "/#amazon-etl", permanent: true },
      { source: "/projects/:slug", destination: "/#work", permanent: true },
      { source: "/resume", destination: "https://drive.google.com/file/d/1Kky3GDFarvykiwOxMd8-AUv9vryx9Vrn/view?usp=sharing", permanent: false }
    ];
  }
};

export default nextConfig;
