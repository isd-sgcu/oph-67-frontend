import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_LIFF_ID: process.env.NEXT_PUBLIC_LIFF_ID,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://cdn.cuopenhouse2025.com/'
      : '',
  images: {
    domains: ['cdn.cuopenhouse2025.com', 'storage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.cuopenhouse2025.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/oph-2025/**',
      },
    ],
  },
}

export default nextConfig
