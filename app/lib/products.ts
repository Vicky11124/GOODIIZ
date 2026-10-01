import productsJson from '@/data/products.json'

export interface Product {
  id: string
  name: string
  category: string
  shortDescription: string
  fullDescription: string
  image: string
  price: string
  priceRange: string
  features: string[]
  variants?: Variant[]
  inStock?: boolean
  rating?: number
  featured?: boolean
}

export interface Variant {
  name: string
  price: string
}

// Single source of truth loaded directly from data/products.json
export const defaultProducts: Product[] = productsJson as Product[]

export const products: Product[] = defaultProducts

export const categories = [
  'All',
  'Nuts',
  'Dry Fruits',
  'Healthy Malts & Powders',
  'Seeds & Staples',
  'Treats & Sweeteners',
  'Dairy',
]
