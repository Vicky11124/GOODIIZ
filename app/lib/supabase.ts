import { createClient } from '@supabase/supabase-js'
import { Product } from './products'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ncatminnzfmgetfzwmtv.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Public client for browser / anon operations
export const supabasePublic = createClient(supabaseUrl, supabaseAnonKey || supabaseServiceKey)

// Server client with service role for admin API routes
export const getSupabaseServerClient = () => {
  const key = supabaseServiceKey || supabaseAnonKey
  if (!key) {
    throw new Error('Supabase API key is missing')
  }
  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    shortDescription: row.short_description || '',
    fullDescription: row.full_description || '',
    image: row.image || '',
    price: row.price,
    priceRange: row.price_range || '100g - 1kg',
    features: Array.isArray(row.features) ? row.features : [],
    variants: Array.isArray(row.variants) ? row.variants : [],
    inStock: row.in_stock !== false,
    featured: Boolean(row.featured),
    rating: row.rating !== undefined && row.rating !== null ? parseFloat(row.rating) : 5.0,
  }
}

export function mapProductToRow(product: Product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    short_description: product.shortDescription || '',
    full_description: product.fullDescription || '',
    image: product.image || '',
    price: product.price,
    price_range: product.priceRange || '100g - 1kg',
    features: product.features || [],
    variants: product.variants || [],
    in_stock: product.inStock !== false,
    featured: Boolean(product.featured),
    rating: product.rating !== undefined && product.rating !== null ? parseFloat(String(product.rating)) : 5.0,
    updated_at: new Date().toISOString(),
  }
}
