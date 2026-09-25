'use client'

import SpecularButton from '@/components/ui/SpecularButton'

interface AgroHeroProps {
  onOpenSampleModal?: () => void
}

export default function AgroHero({ onOpenSampleModal }: AgroHeroProps) {
  return (
    <section className="relative overflow-hidden w-full max-w-full bg-black text-white pt-20 pb-28 md:pt-32 md:pb-40 min-h-[640px] flex items-center justify-center">
      {/* Background Hero Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero/agro_hero.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-100 brightness-115 contrast-105 transform scale-105 transition-transform duration-1000"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Balanced neutral overlay for comfortable brightness and crisp text */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/30"></div>
      </div>

      <div className="container-max relative z-10 text-center max-w-3xl mx-auto space-y-7">
        
        {/* Agro badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-goodiiz-gold/40 text-goodiiz-gold-light text-xs font-semibold uppercase tracking-wider shadow-sm">
          <span className="w-2 h-2 rounded-full bg-goodiiz-gold animate-ping"></span>
          Direct Agro-Farm Harvest • Non-GMO
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-md">
          Pure Earth Harvests, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-goodiiz-gold-light via-goodiiz-gold to-yellow-300">
            Artisan Nutrition.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-goodiiz-cream/90 max-w-2xl mx-auto leading-relaxed font-light drop-shadow">
          We partner directly with sustainable Indian orchard growers and indigenous dairy artisans. Experience hand-graded nuts, Bilona A2 ghee, and raw forest honey with zero chemical additives.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pt-3 items-center">
          <SpecularButton
            href="/products"
            size="lg"
            radius={16}
            tint="#c88e3e"
            tintOpacity={0.9}
            textColor="#0f2619"
            lineColor="#fff7d6"
            baseColor="#996515"
            intensity={1.3}
            shineSize={14}
            shineFade={35}
            thickness={1.5}
            followMouse
            className="font-bold shadow-glow-gold hover:shadow-xl transition transform hover:-translate-y-0.5"
          >
            <span>Explore Fresh Harvest</span>
            <span className="text-goodiiz-green-dark">→</span>
          </SpecularButton>

          <SpecularButton
            href="#agro-calculator"
            size="lg"
            radius={16}
            tint="#132e20"
            tintOpacity={0.9}
            textColor="#ffffff"
            lineColor="#fff59d"
            baseColor="#4b5563"
            thickness={1.5}
            className="font-semibold shadow-sm transition transform hover:-translate-y-0.5"
          >
            <span>Superfood Matcher</span>
          </SpecularButton>

          {onOpenSampleModal && (
            <SpecularButton
              onClick={onOpenSampleModal}
              size="md"
              radius={16}
              tint="#064e3b"
              tintOpacity={0.9}
              textColor="#a7f3d0"
              lineColor="#6ee7b7"
              baseColor="#065f46"
              thickness={1.5}
              className="font-medium shadow-sm transition transform hover:-translate-y-0.5"
            >
              Request Agro Sample Box
            </SpecularButton>
          )}
        </div>

      </div>

      {/* Floating Agro Trust & Quality Seal (Positioned bottom-right to cover watermark) */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-auto">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-black/75 backdrop-blur-md border border-goodiiz-gold/40 shadow-2xl text-left hover:border-goodiiz-gold transition duration-300">
          <div className="w-8 h-8 rounded-xl bg-goodiiz-green-dark border border-goodiiz-gold/30 flex items-center justify-center text-goodiiz-gold font-bold text-xs shrink-0 shadow-inner">
            ✓
          </div>
          <div>
            <div className="text-xs font-bold text-goodiiz-gold-light tracking-wide leading-tight">
              100% Direct Agro Harvest
            </div>
            <div className="text-[10px] text-goodiiz-cream/80 font-medium leading-tight">
              Single-Origin • Lab Tested
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

