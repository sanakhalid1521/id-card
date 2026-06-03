/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  webpack: (config) => {
    config.watchOptions = {
      ignored: /node_modules/,
    };
    return config;
  },
};

export default nextConfig;
