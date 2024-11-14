import { env } from '@/env'
import '@/styles/tailwind.css'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import Script from 'next/script'
import type { Organization, WebSite } from 'schema-dts'

export const metadata: Metadata = {
  title: {
    template: '%s - CreditSwami',
    default: 'CreditSwami - Smarter choice for your wallet',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const websiteSchema: WebSite = {
    '@type': 'WebSite',
    url: env.NEXT_PUBLIC_BASE_URL,
    name: env.NEXT_PUBLIC_siteName,
    description: env.NEXT_PUBLIC_seoSiteDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${env.NEXT_PUBLIC_BASE_URL}/search?q={search_term_string}`,
    },
  }

  const organisation: Organization = {
    '@type': 'Organization',
    name: env.NEXT_PUBLIC_siteName,
    url: env.NEXT_PUBLIC_BASE_URL,
    address: {
      '@type': 'PostalAddress',
      addressCountry: env.NEXT_PUBLIC_seoBaseCountry,
      addressRegion: env.NEXT_PUBLIC_seoRegion,
    },
  }

  return (
    <html lang="en">
      <head>
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        ></Script>
        <Script
          id="organisation-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
        ></Script>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="The Radiant Blog"
          href="/blog/feed.xml"
        />
      </head>
      <meta
        name="google-site-verification"
        content="Sa-JDpuOdp1UJSTb4Q-rjdQ7gc3eClWba2A4TClDbj4"
      />
      <GoogleTagManager gtmId={env.NEXT_PUBLIC_GOOGLE_TAG} />
      <body className="text-gray-950 antialiased">{children}</body>
    </html>
  )
}
