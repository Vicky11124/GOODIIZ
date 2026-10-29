import { Product, defaultProducts } from './products'
import { getSupabaseServerClient, mapProductToRow, mapRowToProduct } from './supabase'

export async function readProducts(): Promise<Product[]> {
  try {
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[DB] Supabase readProducts error:', error.message)
      return defaultProducts
    }

    if (!data || data.length === 0) {
      return defaultProducts
    }

    return data.map(mapRowToProduct)
  } catch (err: any) {
    console.error('[DB] Unexpected error in readProducts:', err?.message || err)
    return defaultProducts
  }
}

export async function createProduct(newProduct: Product): Promise<Product> {
  const supabase = getSupabaseServerClient()
  const row = mapProductToRow(newProduct)

  const { data, error } = await supabase
    .from('products')
    .insert(row)
    .select()
    .single()

  if (error) {
    console.error('[DB] Supabase createProduct error:', error.message)
    throw new Error(`Database insert failed: ${error.message}`)
  }

  return mapRowToProduct(data)
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const supabase = getSupabaseServerClient()
  
  // Prepare row updates
  const rowUpdates: Record<string, any> = {
    updated_at: new Date().toISOString()
  }

  if (updates.name !== undefined) rowUpdates.name = updates.name.trim()
  if (updates.category !== undefined) rowUpdates.category = updates.category.trim()
  if (updates.shortDescription !== undefined) rowUpdates.short_description = updates.shortDescription.trim()
  if (updates.fullDescription !== undefined) rowUpdates.full_description = updates.fullDescription.trim()
  if (updates.image !== undefined) rowUpdates.image = updates.image
  if (updates.price !== undefined) rowUpdates.price = updates.price.trim()
  if (updates.priceRange !== undefined) rowUpdates.price_range = updates.priceRange.trim()
  if (updates.features !== undefined) rowUpdates.features = updates.features
  if (updates.variants !== undefined) rowUpdates.variants = updates.variants
  if (updates.inStock !== undefined) rowUpdates.in_stock = updates.inStock
  if (updates.featured !== undefined) rowUpdates.featured = Boolean(updates.featured)
  if (updates.rating !== undefined) rowUpdates.rating = updates.rating

  const { data, error } = await supabase
    .from('products')
    .update(rowUpdates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('[DB] Supabase updateProduct error:', error.message)
    throw new Error(`Database update failed: ${error.message}`)
  }

  return mapRowToProduct(data)
}

export async function deleteProduct(id: string): Promise<void> {
  const supabase = getSupabaseServerClient()
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('[DB] Supabase deleteProduct error:', error.message)
    throw new Error(`Database delete failed: ${error.message}`)
  }
}

export async function writeProducts(products: Product[]): Promise<void> {
  const supabase = getSupabaseServerClient()
  const rows = products.map(mapProductToRow)

  const { error } = await supabase
    .from('products')
    .upsert(rows, { onConflict: 'id' })

  if (error) {
    console.error('[DB] Supabase writeProducts error:', error.message)
    throw new Error(`Database bulk upsert failed: ${error.message}`)
  }
}
