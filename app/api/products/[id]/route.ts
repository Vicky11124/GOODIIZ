import { NextResponse } from 'next/server'
import { readProducts, writeProducts } from '@/app/lib/db'
import { Product } from '@/app/lib/products'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const products = await readProducts()
    const product = products.find(p => p.id === id)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const products = await readProducts()
    const index = products.findIndex(p => p.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const updatedProduct: Product = {
      ...products[index],
      name: body.name !== undefined ? body.name.trim() : products[index].name,
      category: body.category !== undefined ? body.category.trim() : products[index].category,
      shortDescription: body.shortDescription !== undefined ? body.shortDescription.trim() : products[index].shortDescription,
      fullDescription: body.fullDescription !== undefined ? body.fullDescription.trim() : products[index].fullDescription,
      image: body.image !== undefined ? body.image : products[index].image,
      price: body.price !== undefined ? body.price.trim() : products[index].price,
      priceRange: body.priceRange !== undefined ? body.priceRange.trim() : products[index].priceRange,
      features: Array.isArray(body.features) ? body.features.filter((f: string) => f.trim() !== '') : products[index].features,
      variants: Array.isArray(body.variants) ? body.variants.filter((v: any) => v.name && v.price) : products[index].variants,
      inStock: body.inStock !== undefined ? body.inStock : products[index].inStock,
      featured: body.featured !== undefined ? body.featured : products[index].featured,
      rating: body.rating !== undefined ? parseFloat(body.rating) : products[index].rating
    }

    products[index] = updatedProduct
    await writeProducts(products)

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const products = await readProducts()
    const filtered = products.filter(p => p.id !== id)

    if (filtered.length === products.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    await writeProducts(filtered)
    return NextResponse.json({ message: 'Product deleted successfully', id })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
