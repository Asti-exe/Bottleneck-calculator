/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ['framer-motion'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['i.imgur.com', 'images.pexels.com']
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;