import { notFound } from 'next/navigation'
import { readProducts } from '@/app/lib/db'
import { defaultProducts, Product } from '@/app/lib/products'
import ProductDetailClient from './ProductDetailClient'

export const dynamic = 'force-dynamic'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let allProducts: Product[] = defaultProducts
  try {
    const fetched = await readProducts()
    if (Array.isArray(fetched) && fetched.length > 0) {
      allProducts = fetched
    }
  } catch {
    // fallback to default
  }

  const product = allProducts.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}

