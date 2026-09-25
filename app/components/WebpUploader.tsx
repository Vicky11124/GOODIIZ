'use client'

import React, { useState, useRef } from 'react'

interface WebpUploaderProps {
  currentImage?: string
  productName?: string
  onImageUploaded: (url: string) => void
}

export default function WebpUploader({
  currentImage = '',
  productName = 'product',
  onImageUploaded,
}: WebpUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage)
  const [isConverting, setIsConverting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [quality, setQuality] = useState<number>(85)
  const [originalStats, setOriginalStats] = useState<{
    name: string
    size: number
    type: string
  } | null>(null)
  const [convertedStats, setConvertedStats] = useState<{
    size: number
    dataUrl: string
  } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const [customUrl, setCustomUrl] = useState('')
  const [uploadedUrl, setUploadedUrl] = useState<string>(currentImage)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const originalImageObjRef = useRef<HTMLImageElement | null>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const convertImageToWebP = (
    image: HTMLImageElement,
    qualityPercent: number,
    originalFile?: File
  ) => {
    setIsConverting(true)
    try {
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth || image.width
      canvas.height = image.naturalHeight || image.height

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        setIsConverting(false)
        return
      }

      // Draw original image on canvas
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

      // Convert to WebP data URL with specified quality
      const qualityFactor = qualityPercent / 100
      const webpDataUrl = canvas.toDataURL('image/webp', qualityFactor)

      // Approximate size from base64 string
      const head = 'data:image/webp;base64,'
      const base64Length = webpDataUrl.length - head.length
      const approximateBytes = Math.round((base64Length * 3) / 4)

      setConvertedStats({
        size: approximateBytes,
        dataUrl: webpDataUrl,
      })
      setPreviewUrl(webpDataUrl)
    } catch (err) {
      console.error('WebP conversion failed:', err)
    } finally {
      setIsConverting(false)
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WEBP, etc.)')
      return
    }

    setOriginalStats({
      name: file.name,
      size: file.size,
      type: file.type || 'image',
    })
    setUploadSuccess(false)

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        originalImageObjRef.current = img
        convertImageToWebP(img, quality, file)
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality)
    if (originalImageObjRef.current) {
      convertImageToWebP(originalImageObjRef.current, newQuality)
    }
  }

  const handleUploadWebp = async () => {
    if (!convertedStats?.dataUrl) return

    setIsUploading(true)
    try {
      const filename = `${productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-goodiiz`
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataUrl: convertedStats.dataUrl,
          filename: filename,
        }),
      })

      if (!res.ok) throw new Error('Upload failed')

      const data = await res.json()
      setUploadedUrl(data.url)
      onImageUploaded(data.url)
      setUploadSuccess(true)
    } catch (error) {
      console.error('Failed to upload WebP:', error)
      alert('Failed to upload converted image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleApplyUrl = () => {
    if (!customUrl.trim()) return
    setPreviewUrl(customUrl.trim())
    setUploadedUrl(customUrl.trim())
    onImageUploaded(customUrl.trim())
    setUploadSuccess(true)
  }

  const calculateSavings = () => {
    if (!originalStats || !convertedStats) return null
    const saved = originalStats.size - convertedStats.size
    const percent = Math.max(0, Math.round((saved / originalStats.size) * 100))
    return { saved, percent }
  }

  const savings = calculateSavings()

  return (
    <div className="bg-white rounded-xl border border-goodiiz-cream-dark p-5 space-y-4">
      {/* Mode switch header */}
      <div className="flex items-center justify-between border-b border-goodiiz-cream pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">✨</span>
          <span className="font-bold text-goodiiz-green text-sm md:text-base">
            Product Image & WebP Converter
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-3 py-1 text-xs rounded-full font-medium transition ${
              mode === 'upload'
                ? 'bg-goodiiz-green text-white'
                : 'bg-goodiiz-cream text-goodiiz-brown hover:bg-goodiiz-cream-dark'
            }`}
          >
            Upload & Convert
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-3 py-1 text-xs rounded-full font-medium transition ${
              mode === 'url'
                ? 'bg-goodiiz-green text-white'
                : 'bg-goodiiz-cream text-goodiiz-brown hover:bg-goodiiz-cream-dark'
            }`}
          >
            Image URL
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div className="space-y-4">
          {/* Dropzone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center min-h-[160px] ${
              isDragging
                ? 'border-goodiiz-gold bg-goodiiz-gold/10 scale-[1.01]'
                : 'border-goodiiz-green/30 hover:border-goodiiz-green bg-goodiiz-cream/40 hover:bg-goodiiz-cream'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/avif, image/gif"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0])
                }
              }}
            />

            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-goodiiz-green mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <p className="text-sm font-semibold text-goodiiz-green mb-1">
              Click to browse or drag & drop image
            </p>
            <p className="text-xs text-goodiiz-brown/60">
              Supports PNG, JPG, JPEG, AVIF &bull; Auto-converts to WebP
            </p>
          </div>

          {/* WebP Controls & Stats */}
          {originalStats && convertedStats && (
            <div className="bg-goodiiz-cream-light p-4 rounded-xl space-y-3 border border-goodiiz-gold/20 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-goodiiz-brown">Original:</span>
                  <span className="bg-white px-2 py-0.5 rounded border text-goodiiz-brown/80 font-mono">
                    {formatFileSize(originalStats.size)} ({originalStats.name.split('.').pop()?.toUpperCase()})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-goodiiz-green">WebP Optimized:</span>
                  <span className="bg-goodiiz-green text-white px-2 py-0.5 rounded font-mono font-bold">
                    {formatFileSize(convertedStats.size)}
                  </span>
                </div>

                {savings && savings.percent > 0 && (
                  <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full text-[11px] shadow-sm">
                    ⚡ {savings.percent}% Smaller!
                  </span>
                )}
              </div>

              {/* Quality Slider */}
              <div className="space-y-1 pt-2 border-t border-goodiiz-gold/20">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-goodiiz-brown font-medium">
                    WebP Quality ({quality}%):
                  </span>
                  <span className="text-goodiiz-brown/70">
                    {quality > 80 ? 'High Fidelity' : quality > 50 ? 'Balanced' : 'Max Compression'}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={quality}
                  onChange={(e) => handleQualityChange(Number(e.target.value))}
                  className="w-full h-2 bg-goodiiz-cream-dark rounded-lg appearance-none cursor-pointer accent-goodiiz-green"
                />
              </div>

              {/* Upload & Attach button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  disabled={isUploading || isConverting}
                  onClick={handleUploadWebp}
                  className="w-full bg-goodiiz-green hover:bg-goodiiz-green-dark text-white text-xs md:text-sm font-semibold py-2.5 px-4 rounded-lg transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving Optimized WebP...
                    </>
                  ) : uploadSuccess ? (
                    <>
                      <span>✓</span> Saved & Attached to Product!
                    </>
                  ) : (
                    <>
                      <span>🚀</span> Save & Attach WebP Image
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Image URL Input */
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://example.com/product.webp or /images/products/..."
              className="flex-1 text-xs md:text-sm border border-goodiiz-cream-dark rounded-lg px-3 py-2 focus:outline-none focus:border-goodiiz-green text-goodiiz-brown"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="bg-goodiiz-green text-white text-xs px-4 py-2 rounded-lg hover:bg-goodiiz-green-dark transition font-semibold"
            >
              Apply
            </button>
          </div>
          <p className="text-[11px] text-goodiiz-brown/60">
            You can enter a direct image URL or use existing paths like <code className="bg-goodiiz-cream px-1 py-0.5 rounded">/images/products/almonds.jpg</code>.
          </p>
        </div>
      )}

      {/* Live Preview Box */}
      {previewUrl && (
        <div className="border border-goodiiz-cream rounded-xl p-3 bg-goodiiz-cream/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-goodiiz-brown">Image Preview:</span>
            {uploadedUrl && (
              <span className="text-[11px] text-emerald-700 font-medium truncate max-w-[200px]">
                {uploadedUrl}
              </span>
            )}
          </div>
          <div className="relative h-44 w-full bg-white rounded-lg flex items-center justify-center overflow-hidden border border-goodiiz-cream-dark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-full max-w-full object-contain p-2"
              onError={() => {
                // If local image fails, fallback gracefully
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
