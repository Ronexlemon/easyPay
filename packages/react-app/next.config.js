/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["pbs.twimg.com", "cdn-production-opera-website.operacdn.com"],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
