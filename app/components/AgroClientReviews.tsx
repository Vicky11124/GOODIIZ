'use client'

import { useState } from 'react'
import SpecularCard from '@/components/ui/SpecularCard'

export default function AgroClientReviews() {
  const [filter, setFilter] = useState<'all' | 'b2b' | 'retail'>('all')

  const reviews = [
    {
      type: 'b2b',
      name: 'Rameshwar Kulkarni',
      role: 'Procurement Head, Veda Wellness Centers',
      rating: 5,
      quote: 'We order 150kg of Srirangam A2 Bilona Ghee and Wild Honey monthly for our panchakarma therapies. The aroma and lab purity certificate with every lot is unmatched in the industry.',
      tag: 'Verified B2B Client',
      badge: 'Monthly 150KG',
    },
    {
      type: 'retail',
      name: 'Ananya Deshmukh',
      role: 'Nutritionist & Fitness Consultant',
      rating: 5,
      quote: 'The Grade W240 Jumbo Cashews and Kashmiri Almonds have zero artificial glaze. My clients notice the natural buttery crunch and sustained satiety within days of switching.',
      tag: 'Health Consultant',
      badge: 'Family Subscription',
    },
    {
      type: 'b2b',
      name: 'Vikramaditya Singhania',
      role: 'Director, Singhania Logistics & Exports',
      rating: 5,
      quote: 'For Diwali corporate gifting, GOODIIZ customized 600 luxury wooden agro boxes with our company logo and laser engraving. Delivered across 14 cities without a single damaged pack.',
      tag: 'Corporate Gifting Client',
      badge: '600 Custom Hampers',
    },
    {
      type: 'retail',
      name: 'Dr. Srinivas Rao',
      role: 'Ayurvedic Physician',
      rating: 5,
      quote: 'Their Honey Amla and Munakka Raisins are naturally sun-dried without sulphur fumigation. Excellent therapeutic grade and authentic Indian heritage quality.',
      tag: 'Ayurvedic Specialist',
      badge: 'Regular Buyer',
    },
  ]

  const filtered = filter === 'all' ? reviews : reviews.filter((r) => r.type === filter)

  return (
    <section className="py-10 md:py-24 bg-goodiiz-cream relative">
      <div className="container-max">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-goodiiz-gold/20 text-goodiiz-brown text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
              Trusted by Over 10,000+ Clients
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-goodiiz-green">
              Client & Partner Experiences
            </h2>
            <p className="text-goodiiz-brown/70 text-xs sm:text-base mt-1 max-w-xl">
              From commercial wholesale buyers to daily health-conscious families across India.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'b2b', label: 'B2B & Corporate' },
              { id: 'retail', label: 'Gourmets & Doctors' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-goodiiz-green text-white shadow-sm'
                    : 'bg-white text-goodiiz-brown border border-goodiiz-gold/20 hover:bg-goodiiz-cream-light'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-between text-[11px] text-goodiiz-brown/60 mb-2 px-1">
          <span>Verified Buyer Testimonials</span>
          <span>Swipe cards →</span>
        </div>

        {/* Reviews Container: Horizontal Swipeable on Mobile, 2-Col Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-2 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-none">
          {filtered.map((rev, i) => (
            <div key={i} className="w-[86vw] sm:w-[380px] md:w-auto shrink-0 snap-center flex flex-col">
              <SpecularCard
                radius={20}
                thickness={2}
                duration={4}
                innerClassName="p-5 sm:p-7 flex flex-col justify-between h-full bg-white shadow-card"
                className="h-full"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex text-goodiiz-gold text-sm sm:text-base">
                      {'★'.repeat(rev.rating)}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold text-goodiiz-green bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {rev.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-goodiiz-brown/85 italic leading-relaxed">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3.5 sm:pt-5 mt-3.5 sm:mt-5 border-t border-goodiiz-cream flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-goodiiz-green truncate">{rev.name}</h4>
                    <p className="text-[10px] sm:text-xs text-goodiiz-brown/60 truncate">{rev.role}</p>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-goodiiz-gold font-bold uppercase tracking-wider bg-goodiiz-gold/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full whitespace-nowrap shrink-0">
                    {rev.tag}
                  </span>
                </div>
              </SpecularCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
