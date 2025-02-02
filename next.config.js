/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
      domains: ['api.placeholder.com'],
      unoptimized: true,
    },
  }
  
  module.exports = nextConfig