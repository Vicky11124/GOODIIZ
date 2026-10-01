import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goodiiz.com'),
  title: {
    default: 'GOODIIZ | Nuts, Dry Fruits & Natural Food Products',
    template: '%s | GOODIIZ',
  },
  description: 'Premium nuts, dry fruits, traditional A2 ghee, and natural food treats sourced directly from trusted agro farms.',
  keywords: [
    'dry fruits',
    'cashews',
    'almonds',
    'pistachios',
    'raisins',
    'A2 bilona ghee',
    'natural honey',
    'healthy snacks',
    'agro products',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GOODIIZ | Nuts, Dry Fruits & Natural Food Products',
    description: 'Premium nuts, dry fruits, traditional A2 ghee, and natural food treats sourced directly from trusted agro farms.',
    url: 'https://goodiiz.com',
    siteName: 'GOODIIZ',
    images: [
      {
        url: '/images/hero/agro_hero.webp',
        width: 1200,
        height: 630,
        alt: 'GOODIIZ - Natural Nuts, Dry Fruits & Treats',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GOODIIZ | Nuts, Dry Fruits & Natural Food Products',
    description: 'Premium nuts, dry fruits, traditional A2 ghee, and natural food treats sourced directly from trusted agro farms.',
    images: ['/images/hero/agro_hero.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GOODIIZ',
    url: 'https://goodiiz.com',
    logo: 'https://goodiiz.com/images/hero/agro_hero.webp',
    description: 'Nuts, Dry Fruits, Ghee & Natural Treats',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9025019480',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'ta', 'hi'],
    },
  }

  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-goodiiz-cream text-goodiiz-brown antialiased selection:bg-goodiiz-gold selection:text-white font-sans min-h-screen flex flex-col justify-between">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}

