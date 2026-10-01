import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { readProducts } from '@/app/lib/db'
import { defaultProducts, Product } from '@/app/lib/products'
import ProductDetailClient from './ProductDetailClient'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const products = await readProducts()
    return products.map((product) => ({
      id: product.id,
    }))
  } catch {
    return defaultProducts.map((product) => ({
      id: product.id,
    }))
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  let allProducts: Product[] = defaultProducts
  try {
    const fetched = await readProducts()
    if (Array.isArray(fetched) && fetched.length > 0) {
      allProducts = fetched
    }
  } catch {
    // fallback
  }

  const product = allProducts.find((p) => p.id === id)
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const title = `${product.name} | GOODIIZ`
  const description = product.shortDescription || product.fullDescription || `Shop authentic ${product.name} from GOODIIZ.`
  const imageUrl = product.image || '/images/hero/agro_hero.webp'

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://goodiiz.com/products/${product.id}`,
      images: [
        {
          url: imageUrl,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

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

  // Product Structured Data Schema (JSON-LD)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.fullDescription || product.shortDescription,
    image: product.image ? `https://goodiiz.com${product.image}` : undefined,
    category: product.category,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      offerCount: product.variants?.length || 1,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 5.0,
      reviewCount: 24,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  )
}
