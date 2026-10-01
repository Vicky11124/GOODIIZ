import { Suspense } from 'react'
import type { Metadata } from 'next'
import { readProducts } from '../lib/db'
import { defaultProducts, Product } from '../lib/products'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'GOODIIZ Products | Nuts, Dry Fruits, Ghee & Natural Treats',
  description: 'Explore our farm-harvested selection of premium cashews, almonds, pistachios, A2 bilona ghee, raw honey, and sun-dried treats.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'GOODIIZ Products | Nuts, Dry Fruits, Ghee & Natural Treats',
    description: 'Explore our farm-harvested selection of premium cashews, almonds, pistachios, A2 bilona ghee, raw honey, and sun-dried treats.',
    url: 'https://goodiiz.com/products',
  },
}

export const revalidate = 60

export default async function ProductsPage() {
  let productsList: Product[] = defaultProducts
  try {
    const fetched = await readProducts()
    if (Array.isArray(fetched) && fetched.length > 0) {
      productsList = fetched
    }
  } catch (err) {
    console.error('Failed to load products for static render, falling back to default:', err)
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-goodiiz-cream" />}>
      <ProductsClient initialProducts={productsList} />
    </Suspense>
  )
}
