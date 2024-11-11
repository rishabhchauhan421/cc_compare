const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  env: {
    siteName: 'The Custom Crow',
    seoBaseCountry: 'India',
  },
}

module.exports = withBundleAnalyzer(nextConfig)
