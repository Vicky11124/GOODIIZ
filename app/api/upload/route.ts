import { NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/app/lib/supabase'

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || ''
    const supabase = getSupabaseServerClient()

    let buffer: Buffer
    let mimeType = 'image/webp'
    let originalName = 'product'

    // Support JSON base64 payloads or FormData multipart
    if (contentType.includes('application/json')) {
      const { dataUrl, filename = 'product' } = await request.json()

      if (!dataUrl || typeof dataUrl !== 'string') {
        return NextResponse.json({ error: 'No image data provided' }, { status: 400 })
      }

      // Format: data:image/webp;base64,....
      const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
      if (!matches || matches.length !== 3) {
        return NextResponse.json({ error: 'Invalid data URL format' }, { status: 400 })
      }

      mimeType = matches[1]
      const base64Data = matches[2]
      buffer = Buffer.from(base64Data, 'base64')
      originalName = filename
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('file') as File

      if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
      }

      const bytes = await file.arrayBuffer()
      buffer = Buffer.from(bytes)
      mimeType = file.type || 'image/webp'
      originalName = file.name
    } else {
      return NextResponse.json({ error: 'Unsupported media type' }, { status: 415 })
    }

    const ext = mimeType.includes('png')
      ? 'png'
      : mimeType.includes('jpeg') || mimeType.includes('jpg')
      ? 'jpg'
      : 'webp'
    const cleanName = originalName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)
    const uniqueFileName = `${cleanName}-${Date.now()}.${ext}`

    // Upload to Supabase Storage bucket 'product-images'
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(uniqueFileName, buffer, {
        contentType: mimeType,
        upsert: true,
      })

    if (uploadError) {
      console.error('[Upload] Supabase Storage upload error:', uploadError.message)
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
    }

    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(uniqueFileName)

    return NextResponse.json({
      url: publicUrlData.publicUrl,
      filename: uniqueFileName,
      size: buffer.length,
    })
  } catch (error: any) {
    console.error('[Upload] Unexpected error:', error?.message || error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
