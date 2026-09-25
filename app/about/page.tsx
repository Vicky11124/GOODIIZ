'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import SpecularCard from '@/components/ui/SpecularCard'
import SpecularButton from '@/components/ui/SpecularButton'

export default function AboutPage() {
  const [comparisonTab, setComparisonTab] = useState<'goodiiz' | 'industrial'>('goodiiz')

  const signatureHarvests = [
    {
      title: 'Jumbo Cashews Grade W240',
      origin: 'Coastal Karnataka & Goa',
      image: '/images/products/cashews.jpg',
      tag: 'Whole Single-Origin',
      description: 'Hand-sorted for size, uniform ivory color, and natural buttery crunch with high oleic acid.',
      highlight: 'Zero Sulfur Bleaching',
      glow: '#25D366',
      link: '/products?cat=Nuts',
    },
    {
      title: 'Vedic A2 Bilona Ghee',
      origin: 'Srirangam Heritage Goshalas',
      image: '/images/products/ghee.jpg',
      tag: 'A2 Cultured Butter',
      description: 'Curd-churned from indigenous Gir & Hallikar cow milk, slow-cooked on firewood for granular golden aroma.',
      highlight: 'Rich in Butyric Acid',
      glow: '#e6a13b',
      link: '/products?cat=Dairy',
    },
    {
      title: 'Wild Forest Raw Honey',
      origin: 'Western Ghats & Coorg',
      image: '/images/products/honey.jpg',
      tag: '100% Cold-Strained',
      description: 'Extracted from wild flora hives without heating, preserving live enzymes, floral notes, and natural pollens.',
      highlight: 'Unpasteurized & Pure',
      glow: '#f59e0b',
      link: '/products?cat=Treats',
    },
    {
      title: 'Mamra & Kashmiri Almonds',
      origin: 'Kashmir Valley Orchards',
      image: '/images/products/almonds.jpg',
      tag: 'High Oil Density',
      description: 'High-altitude cold climate almonds packed with natural Vitamin E, riboflavin, and rich natural crunch.',
      highlight: 'Unpolished Kernels',
      glow: '#34d399',
      link: '/products?cat=Nuts',
    },
    {
      title: 'Sun-Cured Honey Amla',
      origin: 'Nilgiri Hill Foothills',
      image: '/images/products/amla.jpg',
      tag: 'Ayurvedic Rasayana',
      description: 'Wild forest Indian gooseberries steeped in raw honey and sun-dried for concentrated natural Vitamin C.',
      highlight: 'Digestive & Immunity',
      glow: '#10b981',
      link: '/products?cat=Dry%20Fruits',
    },
    {
      title: 'Golden Raisins & Dry Fruits',
      origin: 'Sangli Sun-Cured Vineyards',
      image: '/images/products/raisins.jpg',
      tag: 'Natural Solar Dehydrated',
      description: 'Naturally shade-dried seedless grapes with rich iron content, delicate sweetness, and soft succulent bite.',
      highlight: 'Zero Chemical Sulfur',
      glow: '#d97706',
      link: '/products',
    },
  ]

  const pillars = [
    {
      num: '01',
      title: 'Direct Farmer Equity',
      desc: 'We eliminate multi-tier brokerage chains, ensuring our grower partners receive fair premiums while consumers receive authentic single-origin purity.',
      badge: 'Traceable Sourcing',
      glow: '#25D366',
    },
    {
      num: '02',
      title: 'Ancient Vedic Processing',
      desc: 'We uphold traditional preparation practices — slow solar drying, curd-churned bilona ghee, and unheated honey straining without industrial shortcuts.',
      badge: 'Heritage Preserved',
      glow: '#fef08a',
    },
    {
      num: '03',
      title: 'Chromatography Lab Tested',
      desc: 'Every harvest lot is screened for aflatoxins, heavy metals, and moisture balance in accredited testing laboratories for uncompromising bio-safety.',
      badge: 'Multi-Stage Tested',
      glow: '#34d399',
    },
    {
      num: '04',
      title: 'Aroma-Lock Freshness',
      desc: 'Packed in inert nitrogen-flushed barrier pouches to preserve delicate natural fatty acids, authentic crispness, and rich roasted farm fragrance.',
      badge: '12-Month Freshness',
      glow: '#fbbf24',
    },
  ]

  const testimonials = [
    {
      quote: "GOODIIZ gives us guaranteed fair prices and long-term contracts. We can focus on natural orchard farming without worrying about exploitative market middlemen.",
      author: "Ramesh K.",
      role: "Cashew Grower Cooperative Lead, Karnataka",
      badge: "Grower Partner"
    },
    {
      quote: "The Vedic Bilona Ghee from GOODIIZ has the authentic granular texture and deep aroma that is impossible to find in factory-produced commercial butter oil.",
      author: "Dr. Ananya Sharma",
      role: "Ayurvedic Health Consultant",
      badge: "Wellness Expert"
    },
    {
      quote: "The difference in crunch and natural sweetness in their jumbo cashews and raw honey is immediately noticeable. My entire family loves it.",
      author: "Siddharth Menon",
      role: "Fitness & Nutrition Enthusiast",
      badge: "Verified Customer"
    }
  ]

  return (
    <div className="pt-32 sm:pt-36 md:pt-40 pb-12 md:pb-20 bg-goodiiz-cream min-h-screen text-[#4A3528] selection:bg-goodiiz-gold/30">
      <div className="container-max">
        
        {/* ======================================================== */}
        {/* 1. FLOW MOTION HEADER (MATCHING REFERENCE EXACTLY)       */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, x: '-100vw' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.0, 0.85, 0.15, 1] }}
          className="relative text-center max-w-3xl mx-auto mb-10 sm:mb-12 py-2"
        >
          {/* Ambient Flowing Light Streak (Left to Right) */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-transparent via-goodiiz-gold/20 to-transparent blur-2xl pointer-events-none -z-10"
          />

          <motion.div
            initial={{ opacity: 0, x: '-100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.0, 0.85, 0.15, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-goodiiz-green/10 text-goodiiz-green text-xs font-bold uppercase tracking-wider mb-3 border border-goodiiz-green/15"
          >
            <span>Certified 100% Farm-Direct</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: '-100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.02, ease: [0.0, 0.85, 0.15, 1] }}
            className="text-3xl sm:text-5xl font-bold font-serif mb-3 sm:mb-4 leading-tight text-goodiiz-green"
          >
            <span className="animate-flow-motion">
              Authentic Earth Harvests,<br />
              Pure Heritage Nutrition
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: '-100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.04, ease: [0.0, 0.85, 0.15, 1] }}
            className="text-goodiiz-brown/80 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto px-2"
          >
            At <strong className="text-goodiiz-green font-semibold">GOODIIZ</strong>, we connect conscious families and culinary connoisseurs directly with certified Indian orchard growers and Vedic dairy artisans — delivering hand-graded dry fruits, Bilona A2 ghee, and raw forest honey with zero chemical shortcuts.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: '-100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.0, 0.85, 0.15, 1] }}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-4"
          >
            <SpecularButton
              href="/products"
              size="md"
              radius={14}
              tint="#c88e3e"
              tintOpacity={0.95}
              textColor="#0d2417"
              lineColor="#fff7d6"
              baseColor="#996515"
              intensity={1.2}
              thickness={1.5}
              speed={3}
              followMouse
              className="font-bold text-xs sm:text-sm shadow-glow-gold hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              <span>Explore Harvests</span>
              <span>→</span>
            </SpecularButton>

            <SpecularButton
              onClick={() => {
                window.open('https://wa.me/919500084204?text=Hi%20GOODIIZ,%20I%20would%20like%20to%20know%20more%20about%20your%20origin%20harvests.', '_blank')
              }}
              size="md"
              radius={14}
              tint="#103623"
              tintOpacity={0.95}
              textColor="#ffffff"
              lineColor="#25D366"
              baseColor="#1f4e34"
              thickness={1.4}
              speed={3.5}
              className="font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              <span>WhatsApp</span>
              <span>→</span>
            </SpecularButton>
          </motion.div>
        </motion.div>

        <div className="space-y-16 sm:space-y-20">

        {/* ======================================================== */}
        {/* 2. THE GOODIIZ STORY & AUTHENTIC ROOTS (SPLIT SHOWCASE)  */}
        {/* ======================================================== */}
        <section className="bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-10 md:p-14 shadow-card border border-goodiiz-gold/25">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-goodiiz-gold/15 text-goodiiz-brown text-xs font-bold uppercase tracking-wider border border-goodiiz-gold/25">
                Our Origin & Philosophy
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-goodiiz-green leading-snug">
                Restoring Honest Nutrition in a World of Mass Shortcuts.
              </h2>

              <div className="space-y-3.5 text-xs sm:text-sm md:text-base text-goodiiz-brown/85 leading-relaxed font-normal">
                <p>
                  For generations, India&apos;s indigenous wellness was grounded in unadulterated essentials: cold-extracted raw honey, Vedic bilona ghee from grass-fed cows, sun-dried wild amla, and unpolished single-origin tree nuts.
                </p>
                <p>
                  In the modern commercial race for mass scale, these time-tested traditions were replaced with chemical sulfur bleaching, high-heat deodorization, synthetic glazes, and excessive brokerage markup.
                </p>
                <p>
                  <strong className="text-goodiiz-green font-semibold">GOODIIZ exists to set a higher standard.</strong> By partnering directly with farmer cooperatives across Karnataka, Kashmir, Kerala, and Tamil Nadu, we restore crop transparency, ensure fair farmer equity, and deliver farm-fresh bio-nutrients directly to your home.
                </p>
              </div>

              {/* Quote highlight */}
              <div className="p-4 sm:p-5 bg-goodiiz-cream/70 rounded-2xl border-l-4 border-goodiiz-gold text-xs sm:text-sm text-goodiiz-brown font-medium leading-relaxed shadow-2xs">
                &ldquo;We believe when you know exactly who grew your food and how it was cured, you experience nutrition the way nature intended: <span className="font-bold text-goodiiz-green">pure, vital, and deeply nourishing.</span>&rdquo;
              </div>

              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <SpecularButton
                  href="/products"
                  size="md"
                  radius={14}
                  tint="#103623"
                  tintOpacity={1}
                  textColor="#ffffff"
                  lineColor="#fff59d"
                  baseColor="#e6a13b"
                  thickness={1.5}
                  speed={3}
                  className="font-bold text-xs sm:text-sm shadow-md"
                >
                  <span>Browse Our Harvests</span>
                  <span>→</span>
                </SpecularButton>

                <SpecularButton
                  href="/contact"
                  size="md"
                  radius={14}
                  tint="#132e20"
                  tintOpacity={0.9}
                  textColor="#ffffff"
                  lineColor="#34d399"
                  baseColor="#374151"
                  thickness={1.3}
                  speed={4}
                  className="font-semibold text-xs sm:text-sm shadow-xs"
                >
                  <span>Talk with Agro Specialist</span>
                </SpecularButton>
              </div>
            </div>

            {/* Visual Photography Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
              
              <div className="group relative rounded-2xl overflow-hidden shadow-card border border-goodiiz-gold/30 bg-goodiiz-cream-dark h-40 sm:h-48 flex flex-col justify-end p-3.5 transition-transform duration-500 hover:-translate-y-1">
                <img
                  src="/images/products/cashews.jpg"
                  alt="Jumbo Cashews Grade W240"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10">
                  <span className="text-[9px] font-bold text-goodiiz-gold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">Single-Origin</span>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-white leading-tight mt-0.5">Jumbo Cashews W240</h4>
                  <p className="text-[9px] text-white/70">Coastal Karnataka</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden shadow-card border border-goodiiz-gold/30 bg-goodiiz-cream-dark h-40 sm:h-48 flex flex-col justify-end p-3.5 transition-transform duration-500 hover:-translate-y-1">
                <img
                  src="/images/products/ghee.jpg"
                  alt="Vedic A2 Bilona Ghee"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10">
                  <span className="text-[9px] font-bold text-goodiiz-gold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">Curd-Churned</span>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-white leading-tight mt-0.5">Vedic A2 Ghee</h4>
                  <p className="text-[9px] text-white/70">Srirangam Heritage</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden shadow-card border border-goodiiz-gold/30 bg-goodiiz-cream-dark h-40 sm:h-48 flex flex-col justify-end p-3.5 transition-transform duration-500 hover:-translate-y-1">
                <img
                  src="/images/products/honey.jpg"
                  alt="Raw Wild Forest Honey"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10">
                  <span className="text-[9px] font-bold text-goodiiz-gold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">Unpasteurized</span>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-white leading-tight mt-0.5">Wild Forest Honey</h4>
                  <p className="text-[9px] text-white/70">Western Ghats</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden shadow-card border border-goodiiz-gold/30 bg-goodiiz-cream-dark h-40 sm:h-48 flex flex-col justify-end p-3.5 transition-transform duration-500 hover:-translate-y-1">
                <img
                  src="/images/products/almonds.jpg"
                  alt="Kashmiri Mamra Almonds"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10">
                  <span className="text-[9px] font-bold text-goodiiz-gold uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">Unpolished</span>
                  <h4 className="text-xs sm:text-sm font-serif font-bold text-white leading-tight mt-0.5">Mamra Almonds</h4>
                  <p className="text-[9px] text-white/70">Kashmir Valley</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. INTERACTIVE PURITY COMPARISON: GOODIIZ VS INDUSTRIAL   */}
        {/* ======================================================== */}
        <section className="bg-gradient-to-br from-[#0c2417] via-[#103623] to-[#16442c] text-white rounded-3xl sm:rounded-[32px] p-6 sm:p-10 md:p-14 shadow-2xl border border-goodiiz-gold/30 relative overflow-hidden">
          
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-goodiiz-gold/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-goodiiz-gold-light text-xs font-bold uppercase tracking-wider border border-white/15 mb-3">
                The Transparency Standard
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-2">
                The GOODIIZ Purity Difference
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-white/80">
                Compare our uncompromising single-origin protocol against standard commercial practices.
              </p>
            </div>

            {/* Mobile Tab Switcher */}
            <div className="flex md:hidden justify-center mb-6">
              <div className="bg-black/30 p-1 rounded-xl border border-white/15 flex">
                <button
                  onClick={() => setComparisonTab('goodiiz')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    comparisonTab === 'goodiiz'
                      ? 'bg-goodiiz-gold text-goodiiz-green-dark shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  🌿 GOODIIZ Standard
                </button>
                <button
                  onClick={() => setComparisonTab('industrial')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    comparisonTab === 'industrial'
                      ? 'bg-red-500/80 text-white shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  ⚠️ Commercial Market
                </button>
              </div>
            </div>

            {/* Comparison Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* GOODIIZ Standard Card */}
              <div className={`${comparisonTab === 'goodiiz' ? 'block' : 'hidden md:block'} bg-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-7 border-2 border-goodiiz-gold/50 shadow-lg relative`}>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-goodiiz-gold text-goodiiz-green-dark flex items-center justify-center font-bold text-sm">
                      ✓
                    </span>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">GOODIIZ Protocol</h3>
                      <p className="text-xs text-goodiiz-gold">Farm-Direct & Lab Verified</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#25D366]/20 text-[#25D366] px-2.5 py-1 rounded-full border border-[#25D366]/40">
                    Guaranteed Pure
                  </span>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-white/90">
                  <div className="flex items-start gap-3">
                    <span className="text-[#25D366] font-bold text-base leading-none mt-0.5">✓</span>
                    <div>
                      <strong className="text-white">100% Single-Origin Traceability:</strong> Sourced directly from dedicated farmer cooperatives with batch tracking.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#25D366] font-bold text-base leading-none mt-0.5">✓</span>
                    <div>
                      <strong className="text-white">Zero Chemical Bleaching:</strong> Naturally sun-cured with zero sulfur dioxide or synthetic wax polish.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#25D366] font-bold text-base leading-none mt-0.5">✓</span>
                    <div>
                      <strong className="text-white">Vedic Bilona Churning:</strong> Cultured from A2 cow milk curd, wood-fired in clay and bronze vats.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#25D366] font-bold text-base leading-none mt-0.5">✓</span>
                    <div>
                      <strong className="text-white">Raw Unheated Honey:</strong> Cold-strained through mesh, retaining all live floral enzymes and antioxidants.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#25D366] font-bold text-base leading-none mt-0.5">✓</span>
                    <div>
                      <strong className="text-white">Nitrogen Fresh Seal:</strong> Flushed with inert gas to lock in aroma and prevent rancidity without chemical BHT.
                    </div>
                  </div>
                </div>
              </div>

              {/* Commercial Market Card */}
              <div className={`${comparisonTab === 'industrial' ? 'block' : 'hidden md:block'} bg-black/20 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-white/10 relative`}>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-300 flex items-center justify-center font-bold text-sm">
                      ✕
                    </span>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white/90">Commercial Mass Market</h3>
                      <p className="text-xs text-white/50">Industrial Shortcuts</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-300 px-2.5 py-1 rounded-full border border-red-500/30">
                    Industrial Standard
                  </span>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-white/70">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold text-base leading-none mt-0.5">✕</span>
                    <div>
                      <strong className="text-white/90">Mixed Brokerage Lots:</strong> Old inventory blended together with unpredictable moisture and quality.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold text-base leading-none mt-0.5">✕</span>
                    <div>
                      <strong className="text-white/90">Sulfur Bleaching:</strong> Treated with sulfur gas and paraffin oil for an unnatural white sheen and fake shine.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold text-base leading-none mt-0.5">✕</span>
                    <div>
                      <strong className="text-white/90">Cream-Separated Butter Oil:</strong> High-heat industrial centrifuge ghee stripped of authentic granular texture.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold text-base leading-none mt-0.5">✕</span>
                    <div>
                      <strong className="text-white/90">Heated & Filtered Honey:</strong> High-heat ultrafiltration that destroys delicate pollens and vital live enzymes.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-bold text-base leading-none mt-0.5">✕</span>
                    <div>
                      <strong className="text-white/90">Oxygen Permeable Packs:</strong> Conventional packaging allowing oils to oxidize, resulting in rancid taste.
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. WHAT WE CURATE (SPECULAR CARDS GRID)                 */}
        {/* ======================================================== */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-goodiiz-gold/15 text-goodiiz-brown text-xs font-bold uppercase tracking-wider mb-2 border border-goodiiz-gold/25">
              Earth&apos;s Superfood Spectrum
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-goodiiz-green mb-2">
              Our Signature Harvests
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-goodiiz-brown/75">
              Each product line is cultivated and cured with zero compromise on nutrient density.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
            {signatureHarvests.map((item, idx) => (
              <div key={idx} className="h-full">
                <SpecularCard
                  radius={20}
                  thickness={1.6}
                  duration={4 + idx * 0.3}
                  baseColor="rgba(200, 142, 62, 0.18)"
                  lineColor={item.glow}
                  innerClassName="p-3 sm:p-4 bg-white flex flex-col justify-between h-full group"
                  className="h-full shadow-card hover:shadow-card-hover transition-all"
                >
                  <div>
                    {/* Image Header with Badge */}
                    <div className="relative h-28 sm:h-36 rounded-xl overflow-hidden bg-goodiiz-cream mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                      />
                      <span className="absolute top-1.5 left-1.5 text-[8px] font-bold uppercase tracking-wider bg-goodiiz-green/90 text-white px-2 py-0.5 rounded-full backdrop-blur-xs">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-serif font-bold text-goodiiz-green leading-snug mb-0.5">
                      {item.title}
                    </h3>
                    <div className="text-[10px] font-semibold text-goodiiz-gold-dark mb-1">
                      {item.origin}
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-goodiiz-brown/75 leading-relaxed line-clamp-3 mb-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-goodiiz-cream">
                    <Link
                      href={item.link}
                      className="text-[10px] sm:text-xs font-bold text-goodiiz-green hover:text-goodiiz-gold flex items-center justify-between transition group-hover:translate-x-0.5"
                    >
                      <span>Explore</span>
                      <span>→</span>
                    </Link>
                  </div>
                </SpecularCard>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. FOUR FOUNDATIONAL PILLARS OF GOODIIZ                 */}
        {/* ======================================================== */}
        <section className="bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-10 md:p-14 shadow-card border border-goodiiz-gold/25">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-goodiiz-green/10 text-goodiiz-green text-xs font-bold uppercase tracking-wider mb-2 border border-goodiiz-green/20">
              Guiding Principles
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-goodiiz-green mb-2">
              Why GOODIIZ Stands Apart
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-goodiiz-brown/75">
              The four unshakeable quality commitments behind every package we dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="h-full">
                <SpecularCard
                  radius={22}
                  thickness={1.6}
                  duration={4.5}
                  baseColor="rgba(200, 142, 62, 0.15)"
                  lineColor={pillar.glow}
                  innerClassName="p-5 sm:p-6 bg-goodiiz-cream/40 flex flex-col justify-between h-full space-y-4"
                  className="h-full shadow-card hover:shadow-card-hover transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-xl bg-goodiiz-green text-white font-serif font-bold text-xs flex items-center justify-center shadow-xs">
                        {pillar.num}
                      </span>
                      <span className="text-[9px] font-bold text-goodiiz-green-dark uppercase tracking-wider bg-white px-2.5 py-0.5 rounded-full border border-goodiiz-gold/20 shadow-2xs">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-serif font-bold text-goodiiz-green mb-1.5 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-goodiiz-brown/80 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-goodiiz-gold/20 flex items-center justify-between text-[11px] font-bold text-goodiiz-green">
                    <span>Verified Guarantee</span>
                    <span>✓</span>
                  </div>
                </SpecularCard>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 7. GROWER & NUTRITIONIST VOICES (TESTIMONIAL HIGHLIGHTS)  */}
        {/* ======================================================== */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-goodiiz-gold/15 text-goodiiz-brown text-xs font-bold uppercase tracking-wider mb-2 border border-goodiiz-gold/25">
              Voices of Trust
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-goodiiz-green mb-2">
              From Orchard to Everyday Life
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-goodiiz-brown/75">
              Hear from our farmer partners, certified nutritionists, and health-conscious patrons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl sm:rounded-3xl p-6 border border-goodiiz-gold/25 shadow-card flex flex-col justify-between space-y-4 hover:shadow-card-hover transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-goodiiz-gold text-2xl font-serif leading-none">“</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-goodiiz-green/10 text-goodiiz-green px-2.5 py-0.5 rounded-full">
                      {t.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-goodiiz-brown/85 italic leading-relaxed">
                    {t.quote}
                  </p>
                </div>

                <div className="pt-3 border-t border-goodiiz-cream">
                  <div className="font-serif font-bold text-xs sm:text-sm text-goodiiz-green">
                    {t.author}
                  </div>
                  <div className="text-[10px] text-goodiiz-gold-dark font-medium">
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 8. LUXURY BOTTOM CALL TO ACTION BANNER                   */}
        {/* ======================================================== */}
        <section className="bg-gradient-to-br from-[#091f13] via-[#103623] to-[#16442c] text-white rounded-3xl sm:rounded-[36px] p-8 sm:p-12 md:p-16 shadow-2xl text-center relative overflow-hidden space-y-6 border border-goodiiz-gold/35">
          
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-goodiiz-gold/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-goodiiz-gold-light text-xs font-bold uppercase tracking-wider border border-white/20 shadow-inner">
              Taste The Single-Origin Difference
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Ready to Upgrade to Real, Unadulterated Nutrition?
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-white/85 max-w-xl mx-auto font-light leading-relaxed">
              Experience hand-sorted Grade W240 cashews, wood-fired Vedic bilona ghee, and cold-strained raw honey delivered directly to your doorstep.
            </p>

            <div className="flex flex-wrap gap-3.5 justify-center pt-3 items-center">
              <SpecularButton
                href="/products"
                size="lg"
                radius={16}
                tint="#c88e3e"
                tintOpacity={0.95}
                textColor="#0d2417"
                lineColor="#fff7d6"
                baseColor="#996515"
                intensity={1.2}
                thickness={1.5}
                speed={3}
                followMouse
                className="font-bold shadow-glow-gold hover:shadow-xl transition transform hover:-translate-y-0.5"
              >
                <span>Shop All Products</span>
                <span>→</span>
              </SpecularButton>

              <SpecularButton
                onClick={() => {
                  window.open('https://wa.me/919500084204?text=Hi%20GOODIIZ,%20I%20would%20like%20to%20place%20an%20order%20for%20fresh%20farm%20produce.', '_blank')
                }}
                size="lg"
                radius={16}
                tint="#103623"
                tintOpacity={0.95}
                textColor="#ffffff"
                lineColor="#25D366"
                baseColor="#1f4e34"
                thickness={1.5}
                speed={3.2}
                followMouse
                className="font-bold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                <span>Order on WhatsApp</span>
                <span>→</span>
              </SpecularButton>

              <SpecularButton
                href="/contact"
                size="lg"
                radius={16}
                tint="#132e20"
                tintOpacity={0.9}
                textColor="#ffffff"
                lineColor="#34d399"
                baseColor="#374151"
                thickness={1.4}
                className="font-semibold shadow-xs hover:shadow-sm transition transform hover:-translate-y-0.5"
              >
                <span>Contact Us</span>
              </SpecularButton>
            </div>
          </div>
        </section>

        </div>
      </div>
    </div>
  )
}
