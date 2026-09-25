'use client'

import { useState } from 'react'
import AgroHero from './AgroHero'
import InteractiveProductGrid from './InteractiveProductGrid'
import AgroNutriAdvisor from './AgroNutriAdvisor'
import AgroOriginJourney from './AgroOriginJourney'
import AgroClientReviews from './AgroClientReviews'
import AgroFaqInteractive from './AgroFaqInteractive'
import AgroSampleModal from './AgroSampleModal'
import { Product } from '../lib/products'

import SpecularButton from '@/components/ui/SpecularButton'

interface Props {
  initialProducts: Product[]
}

export default function AgroHomeClient({ initialProducts }: Props) {
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false)

  return (
    <div className="relative">
      {/* 1. Agro Hero with direct harvest switcher and sample trigger */}
      <AgroHero onOpenSampleModal={() => setIsSampleModalOpen(true)} />

      {/* 2. Interactive Product Grid with dynamic pack size selectors */}
      <InteractiveProductGrid initialProducts={initialProducts} />

      {/* 3. Farm-to-Fork Interactive Process Explorer */}
      <AgroOriginJourney />

      {/* 4. Interactive Superfood & Agro Nutri-Advisor (Goal Matcher) */}
      <AgroNutriAdvisor />

      {/* 5. Client & Partner Testimonials */}
      <AgroClientReviews />

      {/* 8. Interactive Agro FAQs */}
      <AgroFaqInteractive />

      {/* High-Impact Bottom Agro CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-goodiiz-green via-goodiiz-green-dark to-[#0D301E] text-white relative overflow-hidden">
        <div className="container-max text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-goodiiz-gold-light text-xs font-bold uppercase tracking-wider">
            Direct Farm Connection
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-sans text-white max-w-3xl mx-auto leading-tight tracking-tight">
            Ready to Taste the Difference of Authentic Agro Harvests?
          </h2>
          <p className="text-goodiiz-cream/80 text-sm sm:text-base max-w-xl mx-auto font-light">
            Whether for your home pantry, fitness nutrition, or corporate wholesale requirement, we deliver uncompromised purity directly from Indian orchards.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2 items-center">
            <SpecularButton
              onClick={() => {
                window.open('https://wa.me/919500084204?text=Hi%20GOODIIZ,%20I%20would%20like%20to%20place%20an%20order.', '_blank');
              }}
              size="lg"
              radius={16}
              tint="#c88e3e"
              tintOpacity={0.9}
              textColor="#0f2619"
              lineColor="#fff7d6"
              baseColor="#996515"
              intensity={1.3}
              thickness={1.5}
              followMouse
              className="font-bold shadow-glow-gold hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              Chat on WhatsApp
            </SpecularButton>

            <SpecularButton
              onClick={() => setIsSampleModalOpen(true)}
              size="lg"
              radius={16}
              tint="#ffffff"
              tintOpacity={0.15}
              blur={10}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#4b5563"
              intensity={1}
              thickness={1}
              followMouse
              className="font-semibold shadow-sm transition transform hover:-translate-y-0.5"
            >
              Request Sample Kit
            </SpecularButton>
          </div>
        </div>
      </section>

      {/* Interactive Sample Kit Modal */}
      <AgroSampleModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />
    </div>
  )
}
