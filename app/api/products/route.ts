import { NextResponse } from 'next/server'
import { readProducts, writeProducts } from '@/app/lib/db'
import { Product, defaultProducts } from '@/app/lib/products'

export async function GET() {
  try {
    const products = await readProducts()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.name || !body.category || !body.price) {
      return NextResponse.json(
        { error: 'Product name, category, and price are required' },
        { status: 400 }
      )
    }

    const currentProducts = await readProducts()

    // Generate slug ID if not provided
    const slugId = body.id
      ? body.id.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : body.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')

    let uniqueId = slugId
    let counter = 1
    while (currentProducts.some(p => p.id === uniqueId)) {
      uniqueId = `${slugId}-${counter}`
      counter++
    }

    const newProduct: Product = {
      id: uniqueId,
      name: body.name.trim(),
      category: body.category.trim(),
      shortDescription: body.shortDescription?.trim() || '',
      fullDescription: body.fullDescription?.trim() || '',
      image: body.image || '',
      price: body.price.trim(),
      priceRange: body.priceRange?.trim() || '100g - 1kg',
      features: Array.isArray(body.features) ? body.features.filter((f: string) => f.trim() !== '') : [],
      variants: Array.isArray(body.variants) ? body.variants.filter((v: any) => v.name && v.price) : [],
      inStock: body.inStock !== undefined ? body.inStock : true,
      featured: Boolean(body.featured),
      rating: body.rating ? parseFloat(body.rating) : 5.0
    }

    const updated = [newProduct, ...currentProducts]
    await writeProducts(updated)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to save product' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  // Support reset / bulk update
  try {
    const body = await request.json()
    if (body.action === 'reset') {
      await writeProducts(defaultProducts)
      return NextResponse.json({ message: 'Reset to default products', products: defaultProducts })
    }
    if (Array.isArray(body.products)) {
      await writeProducts(body.products)
      return NextResponse.json({ message: 'Catalog updated successfully', products: body.products })
    }
    return NextResponse.json({ error: 'Invalid bulk action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to perform bulk operation' }, { status: 500 })
  }
}
