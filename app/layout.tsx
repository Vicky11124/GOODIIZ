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
  title: 'GOODIIZ - Premium Agro Nuts, Dry Fruits & Traditional Superfoods',
  description: '100% farm-sourced, naturally processed Grade W240 Cashews, Kashmiri Almonds, Vedic Bilona Ghee, Raw Forest Honey, and sun-dried treats. Direct from sustainable agro-farms.',
  keywords: 'agro products, cashew nuts, dry fruits, farm direct, organic honey, A2 cow bilona ghee, wholesale nuts, healthy snacks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <body className="bg-goodiiz-cream text-goodiiz-brown antialiased selection:bg-goodiiz-gold selection:text-white font-sans min-h-screen flex flex-col justify-between">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}

