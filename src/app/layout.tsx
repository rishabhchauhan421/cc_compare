import { env } from '@/env'
import '@/styles/tailwind.css'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'

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
  return (
    <html lang="en">
      <head>
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

      <GoogleTagManager gtmId={env.NEXT_PUBLIC_GOOGLE_TAG} />
      <body className="text-gray-950 antialiased">{children}</body>
    </html>
  )
}
