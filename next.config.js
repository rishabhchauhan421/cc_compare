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
    siteName: 'Card Swami',
    seoBaseCountry: 'India',
    seoRegion: 'New Delhi',
    supportEmail: 'help@thecustomcrow.com',
    seoSiteDescription:
      'Card Swami is a platform to explore credit cards and their benefits. We help you find the best credit card for your needs.',
  },
}

module.exports = withBundleAnalyzer(nextConfig)
