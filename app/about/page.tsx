import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About GOODIIZ | Natural Food Products & Traditional Indian Foods',
  description: 'Learn about our mission to bring unadulterated nuts, A2 ghee, raw honey, and traditional superfoods direct from growers to your home.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About GOODIIZ | Natural Food Products & Traditional Indian Foods',
    description: 'Learn about our mission to bring unadulterated nuts, A2 ghee, raw honey, and traditional superfoods direct from growers to your home.',
    url: 'https://goodiiz.com/about',
  },
}

export default function AboutPage() {
  return <AboutClient />
}
