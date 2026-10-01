import type { Metadata } from 'next'
import { readProducts } from './lib/db'
import { defaultProducts, Product } from './lib/products'
import AgroHomeClient from './components/AgroHomeClient'

export const metadata: Metadata = {
  title: 'GOODIIZ | Nuts, Dry Fruits & Natural Food Products',
  description: 'Shop premium grade cashews, almonds, pistachios, pure Vedic Bilona A2 ghee, raw honey, and sun-cured dry fruits direct from sustainable agro farms.',
  alternates: {
    canonical: '/',
  },
}

export const revalidate = 60

export default async function Home() {
  let allProducts: Product[] = defaultProducts
  try {
    const fetched = await readProducts()
    if (Array.isArray(fetched) && fetched.length > 0) {
      allProducts = fetched
    }
  } catch (err) {
    console.error('Database load error, using default agro products:', err)
  }

  return <AgroHomeClient initialProducts={allProducts} />
}

