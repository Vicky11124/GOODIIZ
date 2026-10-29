import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { readProducts, createProduct, writeProducts } from '@/app/lib/db'
import { Product, defaultProducts } from '@/app/lib/products'
import { isAuthenticatedAdmin } from '@/app/lib/auth'

export async function GET() {
  try {
    const products = await readProducts()
    return NextResponse.json(products)
  } catch (error: any) {
    console.error('[API /api/products GET] Failed to fetch products:', error?.message || error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Admin Authorization Guard
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin login required' },
        { status: 401 }
      )
    }

    let body: any
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      )
    }

    // Input Validation
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const category = typeof body.category === 'string' ? body.category.trim() : ''
    const price = typeof body.price === 'string' ? body.price.trim() : ''

    if (!name || !category || !price) {
      return NextResponse.json(
        { error: 'Product name, category, and price are required' },
        { status: 400 }
      )
    }

    const currentProducts = await readProducts()

    // Generate unique slug ID if not provided
    const baseSlug = (body.id && typeof body.id === 'string' ? body.id : name)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'product'

    let uniqueId = baseSlug
    let counter = 1
    while (currentProducts.some(p => p.id === uniqueId)) {
      uniqueId = `${baseSlug}-${counter}`
      counter++
    }

    const newProduct: Product = {
      id: uniqueId,
      name,
      category,
      shortDescription: typeof body.shortDescription === 'string' ? body.shortDescription.trim() : '',
      fullDescription: typeof body.fullDescription === 'string' ? body.fullDescription.trim() : '',
      image: typeof body.image === 'string' ? body.image.trim() : '',
      price,
      priceRange: typeof body.priceRange === 'string' && body.priceRange.trim() ? body.priceRange.trim() : '100g - 1kg',
      features: Array.isArray(body.features)
        ? body.features.filter((f: any) => typeof f === 'string' && f.trim() !== '').map((f: string) => f.trim())
        : [],
      variants: Array.isArray(body.variants)
        ? body.variants.filter((v: any) => v && typeof v === 'object' && v.name && v.price)
        : [],
      inStock: body.inStock !== undefined ? Boolean(body.inStock) : true,
      featured: Boolean(body.featured),
      rating: body.rating ? parseFloat(String(body.rating)) || 5.0 : 5.0,
    }

    const persistedProduct = await createProduct(newProduct)

    // Revalidate Next.js cache
    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath(`/products/${persistedProduct.id}`)

    return NextResponse.json(persistedProduct, { status: 201 })
  } catch (error: any) {
    console.error('[API /api/products POST] Failed to save product:', error?.message || error)
    return NextResponse.json(
      { error: 'Failed to save product' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    // Admin Authorization Guard
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin login required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    if (body.action === 'reset') {
      await writeProducts(defaultProducts)
      revalidatePath('/')
      revalidatePath('/products')
      return NextResponse.json({ message: 'Reset to default products', products: defaultProducts })
    }
    if (Array.isArray(body.products)) {
      await writeProducts(body.products)
      revalidatePath('/')
      revalidatePath('/products')
      return NextResponse.json({ message: 'Catalog updated successfully', products: body.products })
    }
    return NextResponse.json({ error: 'Invalid bulk action' }, { status: 400 })
  } catch (error: any) {
    console.error('[API /api/products PUT] Failed bulk operation:', error?.message || error)
    return NextResponse.json({ error: 'Failed to perform bulk operation' }, { status: 500 })
  }
}
