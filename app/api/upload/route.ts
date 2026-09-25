import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || ''

    // Support JSON base64 payloads or FormData multipart
    if (contentType.includes('application/json')) {
      const { dataUrl, filename = 'product' } = await request.json()

      if (!dataUrl) {
        return NextResponse.json({ error: 'No image data provided' }, { status: 400 })
      }

      // Format is data:image/webp;base64,.... or similar
      const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
      if (!matches || matches.length !== 3) {
        return NextResponse.json({ error: 'Invalid data URL format' }, { status: 400 })
      }

      const mimeType = matches[1]
      const base64Data = matches[2]
      const buffer = Buffer.from(base64Data, 'base64')

      const ext = mimeType.includes('webp') ? 'webp' : 'jpg'
      const cleanName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)
      const uniqueFileName = `${cleanName}-${Date.now()}.${ext}`

      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      await fs.mkdir(uploadDir, { recursive: true })

      const filePath = path.join(uploadDir, uniqueFileName)
      await fs.writeFile(filePath, buffer)

      const publicPath = `/uploads/${uniqueFileName}`
      return NextResponse.json({
        url: publicPath,
        filename: uniqueFileName,
        size: buffer.length
      })
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      const file = formData.get('file') as File

      if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      await fs.mkdir(uploadDir, { recursive: true })

      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const filePath = path.join(uploadDir, safeName)
      await fs.writeFile(filePath, buffer)

      return NextResponse.json({
        url: `/uploads/${safeName}`,
        filename: safeName,
        size: buffer.length
      })
    }

    return NextResponse.json({ error: 'Unsupported media type' }, { status: 415 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
