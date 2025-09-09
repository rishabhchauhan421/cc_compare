import type { NextConfig } from 'next';
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  env: {
    siteName: 'Card Swami',
    seoBaseCountry: 'India',
    seoRegion: 'New Delhi',
    supportEmail: 'help@thecustomcrow.com',
    seoSiteDescription:
      'Card Swami is a platform to explore credit cards and their benefits. We help you find the best credit card for your needs.',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.WORDPRESS_HOSTNAME}`,
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: `${process.env.WORDPRESS_URL}/wp-admin`,
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
