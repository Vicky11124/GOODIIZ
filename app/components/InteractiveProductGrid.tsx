'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product } from '../lib/products'
import SpecularButton from '@/components/ui/SpecularButton'
import MagicProductCard from '@/components/ui/MagicProductCard'

interface Props {
  initialProducts: Product[]
}

export default function InteractiveProductGrid({ initialProducts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({})
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const categories = ['All', 'Nuts', 'Dairy', 'Dry Fruits', 'Treats']

  const filtered = selectedCategory === 'All'
    ? initialProducts
    : initialProducts.filter((p) => p.category === selectedCategory)

  const getEmoji = (category: string) => {
    switch (category) {
      case 'Nuts': return '🥜'
      case 'Dairy': return '🥛'
      case 'Dry Fruits': return '🍇'
      case 'Treats': return '🍯'
      default: return '🎁'
    }
  }

  const handleVariantChange = (productId: string, variantIndex: number) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantIndex,
    }))
  }

  return (
    <section className="py-16 md:py-24 bg-goodiiz-cream relative">
      <div className="container-max">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-goodiiz-gold/15 text-goodiiz-brown text-xs font-bold uppercase tracking-wider mb-2">
              Fresh Harvest Selection
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-goodiiz-green">
              Featured Agro Products
            </h2>
            <p className="text-goodiiz-brown/70 text-sm sm:text-base mt-2 max-w-xl">
              Ethically harvested and traditionally prepared superfoods. Select your pack size below for instant dynamic pricing.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-goodiiz-green hover:text-goodiiz-gold transition group self-start md:self-auto"
          >
            <span>View Complete Catalogue</span>
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {categories.map((cat) => {
            const count = cat === 'All' 
              ? initialProducts.length 
              : initialProducts.filter(p => p.category === cat).length

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                  selectedCategory === cat
                    ? 'bg-goodiiz-green text-white shadow-card scale-105'
                    : 'bg-white text-goodiiz-brown border border-goodiiz-gold/20 hover:border-goodiiz-green hover:bg-goodiiz-cream-light'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                  selectedCategory === cat ? 'bg-goodiiz-gold text-goodiiz-green-dark' : 'bg-goodiiz-cream text-goodiiz-brown/70'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Products Grid - 2x2 on Mobile, 3-column on Desktop with Full Rich Goodiiz Card Content */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-7">
          {filtered.map((product) => {
            const currentVariantIdx = selectedVariants[product.id] || 0
            const activeVariant = product.variants && product.variants.length > 0
              ? product.variants[currentVariantIdx]
              : null

            const displayPrice = activeVariant ? activeVariant.price : product.price
            const displayPack = activeVariant ? activeVariant.name : (product.priceRange || '100g - 1kg')

            const whatsappUrl = `https://wa.me/919500084204?text=Hi%20GOODIIZ,%20I%20would%20like%20to%20order%20${encodeURIComponent(
              product.name
            )}%20(${encodeURIComponent(displayPack)}%20at%20${encodeURIComponent(displayPrice)}).%20Please%20confirm%20availability.`

            return (
              <MagicProductCard
                key={product.id}
                className="border border-goodiiz-gold/25 shadow-card hover:shadow-card-hover flex flex-col justify-between group h-full"
                glowColor="230, 161, 59"
                enableStars={true}
                enableBorderGlow={true}
                enableTilt={true}
                clickEffect={true}
              >
                <div>
                  {/* Product Image Container with Badges */}
                  <div className="relative h-36 sm:h-52 md:h-64 w-full bg-goodiiz-cream-dark overflow-hidden">
                    {product.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl sm:text-6xl md:text-7xl bg-goodiiz-cream-dark">
                        {getEmoji(product.category)}
                      </div>
                    )}

                    {/* Top Floating Badges */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-1.5 z-10">
                      <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider bg-goodiiz-green/90 backdrop-blur-md text-white px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm">
                        {product.category}
                      </span>
                      {product.featured && (
                        <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider bg-goodiiz-gold text-goodiiz-green-dark px-1.5 sm:px-2.5 py-0.5 rounded-full shadow-sm">
                          ★ Bestseller
                        </span>
                      )}
                    </div>

                    {/* Quick Preview Button */}
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-[9px] sm:text-xs bg-white/90 backdrop-blur-md hover:bg-goodiiz-green hover:text-white text-goodiiz-brown font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-md transition transform group-hover:scale-105 z-10"
                    >
                      Quick View
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-5 md:p-6 space-y-2 sm:space-y-4">
                    <div>
                      <h3 className="text-xs sm:text-lg md:text-xl font-serif font-bold text-goodiiz-green group-hover:text-goodiiz-gold transition leading-tight sm:leading-snug line-clamp-1 sm:line-clamp-none">
                        <Link href={`/products/${product.id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <p className="text-[10px] sm:text-xs text-goodiiz-brown/70 line-clamp-2 mt-0.5 sm:mt-1.5 leading-tight sm:leading-relaxed">
                        {product.shortDescription || product.fullDescription}
                      </p>
                    </div>

                    {/* Features Badges */}
                    {product.features && product.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {product.features.slice(0, 3).map((feat, i) => (
                          <span
                            key={i}
                            className="text-[9px] sm:text-[11px] font-medium bg-goodiiz-cream text-goodiiz-green px-1.5 sm:px-2 py-0.5 rounded-md border border-goodiiz-gold/15 truncate max-w-full"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Interactive Pack Size Selector */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="pt-1.5 sm:pt-2 border-t border-goodiiz-cream">
                        <div className="text-[9px] sm:text-[11px] font-bold text-goodiiz-brown/70 uppercase tracking-wider mb-1 sm:mb-2">
                          Select Pack Size:
                        </div>
                        <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                          {product.variants.map((variant, vIdx) => (
                            <button
                              key={vIdx}
                              onClick={() => handleVariantChange(product.id, vIdx)}
                              className={`py-1 sm:py-1.5 px-1 sm:px-2 rounded-md sm:rounded-lg text-[9px] sm:text-xs font-semibold transition border truncate text-center ${
                                currentVariantIdx === vIdx
                                  ? 'bg-goodiiz-green text-white border-goodiiz-green shadow-xs'
                                  : 'bg-goodiiz-cream/60 hover:bg-goodiiz-cream text-goodiiz-brown border-goodiiz-gold/20'
                              }`}
                            >
                              {variant.name.replace(/^(Cashew|Almond|Pista|Ghee|Honey|Raisin|Amla)\s*/i, '')}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Live Price & Instant WhatsApp Order Button */}
                <div className="p-3 sm:p-5 md:p-6 pt-0 space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-baseline pt-2 sm:pt-3 border-t border-goodiiz-cream">
                    <div>
                      <div className="text-[8px] sm:text-[10px] text-goodiiz-brown/60 uppercase font-bold">Selected Price</div>
                      <div className="text-base sm:text-xl md:text-2xl font-bold font-serif text-goodiiz-gold">
                        {displayPrice}
                      </div>
                    </div>
                    <Link
                      href={`/products/${product.id}`}
                      className="text-[10px] sm:text-xs font-bold text-goodiiz-green hover:text-goodiiz-gold transition whitespace-nowrap"
                    >
                      Details & Spec →
                    </Link>
                  </div>

                  <SpecularButton
                    onClick={() => {
                      window.open(whatsappUrl, '_blank');
                    }}
                    size="sm"
                    radius={12}
                    tint="#103623"
                    tintOpacity={1}
                    textColor="#ffffff"
                    lineColor="#fff59d"
                    baseColor="#e6a13b"
                    intensity={2.4}
                    shineSize={30}
                    shineFade={45}
                    thickness={1.5}
                    speed={0.7}
                    autoAnimate={true}
                    followMouse={true}
                    proximity={350}
                    className="w-full font-bold text-[10px] sm:text-xs py-2 sm:py-3 shadow-md hover:shadow-xl transition"
                  >
                    <span className="truncate">Order on WhatsApp</span>
                    <span>→</span>
                  </SpecularButton>
                </div>
              </MagicProductCard>
            )
          })}
        </div>

        {/* Quick View Modal */}
        {quickViewProduct && (
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setQuickViewProduct(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-goodiiz-gold/30 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-goodiiz-gold bg-goodiiz-gold/10 px-2.5 py-0.5 rounded-full">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-goodiiz-green mt-1">
                    {quickViewProduct.name}
                  </h3>
                </div>
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="w-8 h-8 rounded-full bg-goodiiz-cream hover:bg-goodiiz-cream-dark text-goodiiz-brown font-bold flex items-center justify-center transition"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="h-56 rounded-2xl overflow-hidden bg-goodiiz-cream">
                  {quickViewProduct.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl">
                      {getEmoji(quickViewProduct.category)}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="text-2xl font-serif font-bold text-goodiiz-gold">
                    {quickViewProduct.price}
                  </div>
                  <p className="text-xs text-goodiiz-brown/80 leading-relaxed">
                    {quickViewProduct.fullDescription || quickViewProduct.shortDescription}
                  </p>
                  {quickViewProduct.features && (
                    <ul className="space-y-1">
                      {quickViewProduct.features.map((f, i) => (
                        <li key={i} className="text-xs text-goodiiz-brown flex items-center gap-1.5">
                          <span className="text-goodiiz-green font-bold">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-goodiiz-cream flex gap-3">
                <Link
                  href={`/products/${quickViewProduct.id}`}
                  className="flex-1 bg-goodiiz-cream hover:bg-goodiiz-cream-dark text-goodiiz-green font-bold text-xs py-3 px-4 rounded-xl text-center transition"
                  onClick={() => setQuickViewProduct(null)}
                >
                  Full Product Page
                </Link>
                <SpecularButton
                  onClick={() => {
                    window.open(`https://wa.me/919500084204?text=Hi%20GOODIIZ,%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(
                      quickViewProduct.name
                    )}`, '_blank');
                  }}
                  size="sm"
                  radius={12}
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
                  className="flex-1 font-bold text-xs py-3 shadow-md"
                >
                  Order on WhatsApp
                </SpecularButton>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
