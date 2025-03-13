import type { NextConfig } from 'next'

const noop = (..._args: unknown[]): void => {
  // Empty function
}

const nextConfig: NextConfig = {
  webpack(config) {
    if (process.env.NODE_ENV === 'production') {
      console.log = noop // Disable console.log
      console.warn = noop // Disable console.warn
      console.error = noop // Disable console.error
    }
    return config
  },
  output: 'standalone',
  env: {
    NEXT_PUBLIC_LIFF_ID: process.env.NEXT_PUBLIC_LIFF_ID,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_CDN_URL: 'https://cdn.cuopenhouse2025.com',
  },
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
    disableStaticImages: true,
    minimumCacheTTL: 60,
    unoptimized: true,
  },
}

export default nextConfig
