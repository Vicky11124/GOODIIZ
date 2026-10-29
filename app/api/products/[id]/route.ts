import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { readProducts, updateProduct, deleteProduct } from '@/app/lib/db'
import { isAuthenticatedAdmin } from '@/app/lib/auth'

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
  } catch (error: any) {
    console.error(`[API /api/products/[id] GET] Error:`, error?.message || error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Admin Authorization Guard
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 })
    }

    const { id } = await context.params
    const body = await request.json()

    const updatedProduct = await updateProduct(id, body)

    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath(`/products/${id}`)

    return NextResponse.json(updatedProduct)
  } catch (error: any) {
    console.error(`[API /api/products/[id] PUT] Error:`, error?.message || error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Admin Authorization Guard
    if (!isAuthenticatedAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized: Admin login required' }, { status: 401 })
    }

    const { id } = await context.params
    await deleteProduct(id)

    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath(`/products/${id}`)

    return NextResponse.json({ message: 'Product deleted successfully', id })
  } catch (error: any) {
    console.error(`[API /api/products/[id] DELETE] Error:`, error?.message || error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
