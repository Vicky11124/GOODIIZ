'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product } from '@/app/lib/products'
import SpecularButton from '@/components/ui/SpecularButton'

interface Props {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const getEmoji = (category: string) => {
    switch (category) {
      case 'Nuts': return '🥜'
      case 'Dairy': return '🥛'
      case 'Dry Fruits': return '🍇'
      case 'Treats': return '🍯'
      default: return '🎁'
    }
  }

  const activeVariant = product.variants && product.variants.length > 0
    ? product.variants[selectedVariantIdx]
    : null

  const displayPrice = activeVariant ? activeVariant.price : product.price
  const displayPackName = activeVariant ? activeVariant.name : (product.priceRange || 'Standard')

  const whatsappMessage = encodeURIComponent(
    `Hi GOODIIZ,\n\nI want to place an order for:\n• Product: ${product.name}\n• Pack Size: ${displayPackName}\n• Unit Price: ${displayPrice}\n• Quantity: ${quantity}\n\nPlease confirm availability and payment link.`
  )

  return (
    <div className="pt-28 sm:pt-32 md:pt-36 pb-12 md:pb-20 bg-goodiiz-cream min-h-screen">
      <div className="container-max">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs sm:text-sm font-semibold">
          <Link href="/" className="text-goodiiz-green hover:text-goodiiz-gold transition">
            Home
          </Link>
          <span className="text-goodiiz-brown/40">/</span>
          <Link href="/products" className="text-goodiiz-green hover:text-goodiiz-gold transition">
            Farm Catalogue
          </Link>
          <span className="text-goodiiz-brown/40">/</span>
          <span className="text-goodiiz-gold font-bold">{product.name}</span>
        </div>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          
          {/* Left: Product Image & Freshness Badges */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-goodiiz-gold/20 space-y-4">
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-goodiiz-cream-dark flex items-center justify-center">
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              ) : (
                <div className="text-8xl">{getEmoji(product.category)}</div>
              )}

              <div className="absolute top-3 left-3 bg-goodiiz-green/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {product.category}
              </div>

              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-goodiiz-brown text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                <span className="text-amber-500">★</span> {product.rating || 5.0} / 5.0
              </div>
            </div>

            {/* Farm Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-goodiiz-brown/80 font-medium">
              <div className="p-2.5 bg-goodiiz-cream rounded-xl">
                <span className="block text-xs font-bold text-goodiiz-green mb-0.5">100%</span> Non-GMO
              </div>
              <div className="p-2.5 bg-goodiiz-cream rounded-xl">
                <span className="block text-xs font-bold text-goodiiz-gold mb-0.5">Pure</span> Sun-Cured
              </div>
              <div className="p-2.5 bg-goodiiz-cream rounded-xl">
                <span className="block text-xs font-bold text-goodiiz-green mb-0.5">Sealed</span> Nitrogen Foil
              </div>
            </div>
          </div>

          {/* Right: Interactive Product Configuration & Purchase */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-goodiiz-gold/20 space-y-6">
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-goodiiz-gold bg-goodiiz-gold/10 px-2.5 py-0.5 rounded-full">
                  Fresh Batch 2026
                </span>
                {product.inStock !== false ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ● In Stock (Farm Dispatched)
                  </span>
                ) : (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full">
                    Sold Out
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-goodiiz-green">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mt-3 pb-4 border-b border-goodiiz-cream">
                <div className="text-3xl font-serif font-bold text-goodiiz-gold">
                  {displayPrice}
                </div>
                <span className="text-xs text-goodiiz-brown/60 font-medium">
                  Selected Size: <strong className="text-goodiiz-brown">{displayPackName}</strong>
                </span>
              </div>
            </div>

            {/* Short Quote / Description */}
            {product.shortDescription && (
              <div className="p-4 bg-goodiiz-cream/50 rounded-2xl border-l-4 border-goodiiz-gold text-xs sm:text-sm text-goodiiz-brown italic">
                &ldquo;{product.shortDescription}&rdquo;
              </div>
            )}

            {/* Interactive Pack Size Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-goodiiz-green">
                  Choose Packaging Pack:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`p-3 rounded-2xl border text-left transition flex items-center justify-between ${
                        selectedVariantIdx === idx
                          ? 'border-goodiiz-green bg-goodiiz-green/10 text-goodiiz-green font-bold ring-2 ring-goodiiz-green/20'
                          : 'border-goodiiz-cream-dark hover:border-goodiiz-gold text-goodiiz-brown bg-goodiiz-cream/30'
                      }`}
                    >
                      <span className="text-xs truncate">{variant.name}</span>
                      <span className="text-xs font-bold text-goodiiz-gold">{variant.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-goodiiz-green">
                Quantity:
              </label>
              <div className="flex items-center border border-goodiiz-gold/30 rounded-xl overflow-hidden bg-goodiiz-cream/50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-goodiiz-brown hover:bg-goodiiz-cream font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 py-1 text-xs font-bold text-goodiiz-green">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-goodiiz-brown hover:bg-goodiiz-cream font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <SpecularButton
                onClick={() => {
                  window.open(`https://wa.me/919500084204?text=${whatsappMessage}`, '_blank');
                }}
                size="md"
                radius={16}
                tint="#103623"
                tintOpacity={1}
                textColor="#ffffff"
                lineColor="#fff59d"
                baseColor="#e6a13b"
                intensity={2.4}
                shineSize={30}
                shineFade={45}
                thickness={2.5}
                speed={0.7}
                autoAnimate={true}
                followMouse={true}
                className="flex-1 py-4 px-6 font-bold text-sm shadow-md hover:shadow-lg transition"
              >
                <span>Order on WhatsApp</span>
                <span>→</span>
              </SpecularButton>

              <SpecularButton
                href="/contact"
                size="md"
                radius={16}
                tint="#ffffff"
                tintOpacity={0.8}
                textColor="#143d28"
                lineColor="#c88e3e"
                baseColor="#e6d5be"
                intensity={1}
                thickness={1.2}
                followMouse
                className="py-4 px-6 font-bold text-sm border border-goodiiz-green/30"
              >
                Inquire Bulk B2B
              </SpecularButton>
            </div>

            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div className="pt-4 border-t border-goodiiz-cream space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-goodiiz-green">
                  Agro & Bio Highlights:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-goodiiz-brown">
                      <span className="text-goodiiz-gold font-bold">✓</span> {feat}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Detailed Description & Agro Origin */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-goodiiz-gold/20 mb-16 space-y-4">
          <h3 className="text-2xl font-serif font-bold text-goodiiz-green">
            Agro Origin & Detailed Specification
          </h3>
          <p className="text-sm sm:text-base text-goodiiz-brown/85 leading-relaxed">
            {product.fullDescription || product.shortDescription}
          </p>
          <div className="p-4 bg-goodiiz-cream rounded-2xl text-xs text-goodiiz-brown/80 leading-relaxed">
            <strong>Storage Tip:</strong> Store in an airtight container in a cool, dry place. For extended freshness over 6 months, refrigeration is recommended to preserve natural polyunsaturated oils.
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-goodiiz-green">
              Complementary Agro Harvests
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6">
              {relatedProducts.map((rel) => (
                <Link key={rel.id} href={`/products/${rel.id}`}>
                  <div className="bg-white rounded-2xl p-3 sm:p-5 shadow-card hover:shadow-card-hover border border-goodiiz-gold/20 transition flex flex-col justify-between h-full group">
                    <div>
                      <div className="h-32 sm:h-44 rounded-xl overflow-hidden bg-white mb-2 sm:mb-3 flex items-center justify-center text-4xl sm:text-6xl border border-gray-100">
                        {rel.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={rel.image}
                            alt={rel.name}
                            className="w-full h-full object-contain p-1 group-hover:scale-105 transition"
                          />
                        ) : (
                          getEmoji(rel.category)
                        )}
                      </div>
                      <h4 className="text-xs sm:text-base font-serif font-bold text-goodiiz-green group-hover:text-goodiiz-gold transition line-clamp-2">
                        {rel.name}
                      </h4>
                    </div>
                    <div className="flex justify-between items-center pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-goodiiz-cream">
                      <span className="text-xs sm:text-sm font-bold font-serif text-goodiiz-gold">{rel.price}</span>
                      <span className="text-[10px] sm:text-xs font-bold text-goodiiz-green">Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
