'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import SpecularButton from '@/components/ui/SpecularButton'

export default function AgroNutriAdvisor() {
  const [goal, setGoal] = useState<'energy' | 'heart' | 'immunity' | 'ayurvedic' | 'gifting'>('energy')

  const recommendations = {
    energy: {
      title: 'Power Harvest Trio',
      badge: 'High Plant Protein & Zinc',
      description: 'Handpicked Jumbo Cashews W240 + California Almonds + Iranian Pistachios for sustained energy release without sugar spikes.',
      items: ['Grade W240 Cashews (250g)', 'Roasted Almonds (250g)', 'Salted Pistachios (250g)'],
      nutritionStats: { protein: '21g / 100g', iron: '4.2mg', vitaminE: '180% DV', healthyFats: 'Omega-9 Rich' },
      suggestedPrice: '₹790',
      emoji: '⚡',
    },
    heart: {
      title: 'Cardio Vitality Blend',
      badge: 'Vitamin E & Mono-Unsaturated Fats',
      description: 'Slow-roasted Mamra almonds and raw Iranian pistachios paired with natural golden raisins for blood pressure and cholesterol support.',
      items: ['Premium Almonds (250g)', 'Seed Pistachios (250g)', 'Sundakani Golden Raisins (200g)'],
      nutritionStats: { protein: '19g / 100g', iron: '3.8mg', vitaminE: '210% DV', healthyFats: 'Zero Cholesterol' },
      suggestedPrice: '₹720',
      emoji: '❤️',
    },
    immunity: {
      title: 'Ayurvedic Rasayana Kit',
      badge: 'Natural Vitamin C & Bio-Flavonoids',
      description: 'Sun-dried Honey Amla candy coupled with Raw Wildflower Honey and Munakka green raisins to reinforce gut flora and cellular defense.',
      items: ['Honey Amla Candies (250g)', 'Pure Forest Honey (500g)', 'Munakka Green Raisins (250g)'],
      nutritionStats: { protein: '8g / 100g', iron: '5.6mg', vitaminE: 'High Vitamin C', healthyFats: 'Enzyme Rich' },
      suggestedPrice: '₹850',
      emoji: '🌿',
    },
    ayurvedic: {
      title: 'Vedic Ojas Elixir Pack',
      badge: 'A2 Vedic Bilona + Raw Honey',
      description: 'Traditional Srirangam A2 Cow Ghee (Bilona Churned) and unpasteurized raw forest honey for gut healing, joint nourishment, and longevity.',
      items: ['Srirangam A2 Bilona Ghee (500ml)', 'Pure Forest Wildflower Honey (500g)', 'Dry Amla (100g)'],
      nutritionStats: { protein: '100% Pure Fat-Soluble Vit', iron: 'Rich Butyric Acid', vitaminE: 'Omega-3 (CLA)', healthyFats: 'A2 Vedic Beta-Casein' },
      suggestedPrice: '₹2,750',
      emoji: '🏺',
    },
    gifting: {
      title: 'Agro Royal Festive Hamper',
      badge: 'Curated Corporate & Wedding Gift',
      description: 'Full artisanal agro suite in bespoke gold-embossed packaging. Perfect for clients, VIP guests, and festive celebrations.',
      items: ['Jumbo Cashews W240', 'Premium Almonds', 'Iranian Pistachios', 'Honey Amla', 'Pure Forest Honey Jar'],
      nutritionStats: { protein: 'Assorted Gourmet', iron: 'Custom Gift Tag', vitaminE: 'Eco Wooden Box', healthyFats: 'Zero Preservatives' },
      suggestedPrice: '₹1,950',
      emoji: '🎁',
    },
  }

  const activeRec = recommendations[goal]

  const whatsappMessage = encodeURIComponent(
    `Hi GOODIIZ, I used your Interactive Nutri-Advisor and I'm interested in ordering the "${activeRec.title}" (approx ${activeRec.suggestedPrice}). Please share order confirmation and delivery details.`
  )

  return (
    <section id="agro-calculator" className="py-8 sm:py-14 md:py-24 bg-goodiiz-cream relative overflow-hidden">
      
      <div className="container-max relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-goodiiz-green/10 text-goodiiz-green text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
            Interactive Superfood Matcher
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-goodiiz-green mb-2 sm:mb-4">
            Find Your Ideal Agro Nutrition Blend
          </h2>
          <p className="text-goodiiz-brown/80 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Select your health priority to receive a custom farm-fresh agro package formulation with transparent nutritional metrics.
          </p>
        </div>

        {/* Mobile Horizontal Objective Selector (Visible on mobile only for seamless instant switching without scrolling) */}
        <div className="md:hidden mb-3">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] font-bold text-goodiiz-green uppercase tracking-wider">
              Select Health / Agro Objective:
            </span>
            <span className="text-[9px] text-goodiiz-brown/60 font-medium">
              Swipe →
            </span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1.5 -mx-3 px-3 scrollbar-none snap-x">
            {[
              { id: 'energy', label: 'Daily Energy', desc: 'Plant protein', emoji: '⚡' },
              { id: 'heart', label: 'Heart Care', desc: 'Vitamin E', emoji: '❤️' },
              { id: 'immunity', label: 'Immunity Kit', desc: 'Bio-Defense', emoji: '🌿' },
              { id: 'ayurvedic', label: 'Vedic Ojas', desc: 'A2 Cow Ghee', emoji: '🏺' },
              { id: 'gifting', label: 'Gift Hamper', desc: 'Luxury Box', emoji: '🎁' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setGoal(item.id as any)}
                className={`snap-start shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-left transition-all duration-300 ${
                  goal === item.id
                    ? 'border-goodiiz-green bg-goodiiz-green text-white shadow-sm scale-[1.02]'
                    : 'border-goodiiz-gold/25 bg-white text-goodiiz-brown hover:border-goodiiz-green/40 shadow-2xs'
                }`}
              >
                <span className="text-sm">{item.emoji}</span>
                <span className="text-[11px] font-bold whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-8 items-start">
          
          {/* Controls Column (Side-by-side on md+ screens) */}
          <div className="hidden md:block md:col-span-5 bg-white rounded-3xl p-6 lg:p-8 shadow-card border border-goodiiz-gold/20 space-y-6">
            <div>
              <label className="block text-xs font-bold text-goodiiz-green uppercase tracking-wider mb-3">
                SELECT HEALTH / AGRO OBJECTIVE
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { id: 'energy', label: 'Daily Energy & Fitness', desc: 'Plant protein & active endurance', emoji: '⚡' },
                  { id: 'heart', label: 'Heart & Cholesterol Care', desc: 'Vitamin E & healthy mono-fats', emoji: '❤️' },
                  { id: 'immunity', label: 'Immunity & Bio-Defense', desc: 'Raw Vitamin C & honey enzymes', emoji: '🌿' },
                  { id: 'ayurvedic', label: 'Vedic Ojas & Gut Healing', desc: 'A2 Cow Bilona ghee & raw nectar', emoji: '🏺' },
                  { id: 'gifting', label: 'B2B & Festive Gifting Hamper', desc: 'Artisan curation & luxury packs', emoji: '🎁' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setGoal(item.id as any)}
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border text-left transition gap-3 ${
                      goal === item.id
                        ? 'border-goodiiz-green bg-goodiiz-green/5 ring-2 ring-goodiiz-green/20'
                        : 'border-goodiiz-cream-dark hover:border-goodiiz-gold hover:bg-goodiiz-cream/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                        goal === item.id ? 'bg-goodiiz-green text-white shadow-sm' : 'bg-goodiiz-cream text-goodiiz-brown'
                      }`}>
                        {item.emoji}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-goodiiz-green leading-tight">{item.label}</div>
                        <div className="text-xs text-goodiiz-brown/70 mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                    {goal === item.id && (
                      <span className="text-goodiiz-green font-bold text-base ml-1 shrink-0">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Column with Smooth Transitions */}
          <div className="col-span-1 md:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-card-hover border-2 border-goodiiz-gold/30 relative flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={goal}
                initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(3px)' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3.5 sm:space-y-5 flex flex-col justify-between h-full"
              >
                {/* Header Badge & Title with Emoji */}
                <div className="flex items-start justify-between gap-2 pb-2.5 sm:pb-4 border-b border-goodiiz-gold/20">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-3xl select-none">{activeRec.emoji}</span>
                    <div>
                      <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-goodiiz-gold bg-goodiiz-gold/10 px-2 sm:px-2.5 py-0.5 rounded-full inline-block">
                        {activeRec.badge}
                      </span>
                      <h3 className="text-lg sm:text-2xl lg:text-3xl font-serif font-bold text-goodiiz-green mt-0.5 leading-tight">
                        {activeRec.title}
                      </h3>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-[9px] sm:text-xs text-goodiiz-brown/60 uppercase font-semibold">EST. VALUE</div>
                    <div className="text-lg sm:text-2xl font-bold font-serif text-goodiiz-green">{activeRec.suggestedPrice}</div>
                  </div>
                </div>

                <p className="text-[11px] sm:text-sm text-goodiiz-brown/80 leading-snug sm:leading-relaxed">
                  {activeRec.description}
                </p>

                {/* Included Agro Harvest Items */}
                <div className="bg-goodiiz-cream/60 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-goodiiz-gold/20">
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-goodiiz-green mb-1.5 sm:mb-2.5 flex items-center gap-1.5">
                    <span>🌾</span> CURATED FARM-FRESH COMPONENTS
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                    {activeRec.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-goodiiz-brown">
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-bold shrink-0">✓</span>
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verified Nutritional & Bio Metrics (4 items in 1 neat row on mobile, 4 columns on tablet) */}
                <div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-goodiiz-green mb-1.5 sm:mb-2.5 flex items-center gap-1.5">
                    <span>🔬</span> VERIFIED BIO-NUTRIENT BREAKDOWN
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
                    <div className="bg-goodiiz-cream/40 sm:bg-white p-1.5 sm:p-3 rounded-lg sm:rounded-xl border border-goodiiz-cream-dark text-center">
                      <div className="text-[8px] sm:text-xs text-goodiiz-brown/60 font-medium truncate">Protein</div>
                      <div className="text-[10px] sm:text-sm font-bold text-goodiiz-green mt-0.5 truncate">{activeRec.nutritionStats.protein}</div>
                    </div>
                    <div className="bg-goodiiz-cream/40 sm:bg-white p-1.5 sm:p-3 rounded-lg sm:rounded-xl border border-goodiiz-cream-dark text-center">
                      <div className="text-[8px] sm:text-xs text-goodiiz-brown/60 font-medium truncate">Iron/Mineral</div>
                      <div className="text-[10px] sm:text-sm font-bold text-goodiiz-green mt-0.5 truncate">{activeRec.nutritionStats.iron}</div>
                    </div>
                    <div className="bg-goodiiz-cream/40 sm:bg-white p-1.5 sm:p-3 rounded-lg sm:rounded-xl border border-goodiiz-cream-dark text-center">
                      <div className="text-[8px] sm:text-xs text-goodiiz-brown/60 font-medium truncate">Antioxidants</div>
                      <div className="text-[10px] sm:text-sm font-bold text-goodiiz-green mt-0.5 truncate">{activeRec.nutritionStats.vitaminE}</div>
                    </div>
                    <div className="bg-goodiiz-cream/40 sm:bg-white p-1.5 sm:p-3 rounded-lg sm:rounded-xl border border-goodiiz-cream-dark text-center">
                      <div className="text-[8px] sm:text-xs text-goodiiz-brown/60 font-medium truncate">Fat Profile</div>
                      <div className="text-[10px] sm:text-sm font-bold text-goodiiz-green mt-0.5 truncate">{activeRec.nutritionStats.healthyFats}</div>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row gap-2 sm:gap-3 items-center">
                  <SpecularButton
                    onClick={() => {
                      window.open(`https://wa.me/919500084204?text=${whatsappMessage}`, '_blank');
                    }}
                    size="sm"
                    radius={12}
                    tint="#103623"
                    tintOpacity={1}
                    textColor="#ffffff"
                    lineColor="#fff59d"
                    baseColor="#e6a13b"
                    intensity={2.4}
                    thickness={2.5}
                    followMouse
                    autoAnimate={true}
                    className="flex-1 w-full sm:w-auto py-2.5 sm:py-3.5 px-4 sm:px-6 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition"
                  >
                    <span>💬</span>
                    <span>Order Custom Blend on WhatsApp</span>
                    <span>→</span>
                  </SpecularButton>

                  <SpecularButton
                    href="/contact"
                    size="sm"
                    radius={12}
                    tint="#ffffff"
                    tintOpacity={0.9}
                    textColor="#8a5814"
                    lineColor="#c88e3e"
                    baseColor="#e6d5be"
                    intensity={1}
                    thickness={1.2}
                    followMouse
                    className="hidden sm:inline-flex w-full sm:w-auto py-2.5 sm:py-3.5 px-4 sm:px-5 font-bold text-xs sm:text-sm border border-goodiiz-gold/40"
                  >
                    Wholesale Inquiry
                  </SpecularButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  )
}
