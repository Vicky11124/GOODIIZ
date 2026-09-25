'use client'

import { useState } from 'react'
import '@/components/ui/AgroTimeline.css'
import { AntiMetalButton } from '@/components/ui/anti-metal-button'

export default function AgroOriginJourney() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      id: 1,
      tag: 'Step 01 • Ethical Harvesting',
      title: 'Direct Orchard Sourcing',
      shortTitle: 'DIRECT ORCHARD SOURCING',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22v-9 M12 13a6 6 0 0 1 6-6h2v2a6 6 0 0 1-6 6h-2z M12 13a6 6 0 0 0-6-6H4v2a6 6 0 0 0 6 6h2z" />
        </svg>
      ),
      summary: 'Hand-picked from certified Indian agro-farms and coastal plantations at peak physiological maturity.',
      details: [
        'Ethical fair-trade partnerships with 15+ farmer cooperatives in coastal Karnataka, Goa, and Kashmir.',
        'Harvested strictly when kernel oil density and moisture reach optimal biological ripeness.',
        'Zero chemical ripening accelerators or synthetic pesticide residues.',
      ],
      agroMetric: 'Origin Traceability: 100% Verified',
      highlightBadge: 'Fair-Trade Certified',
    },
    {
      id: 2,
      tag: 'Step 02 • Traditional Curation',
      title: 'Natural Sun Drying & Sorting',
      shortTitle: 'NATURAL SUN DRYING & SORTING',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" strokeWidth="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ),
      summary: 'Sun-cured on hygienic elevated racks and sorted using dual-pass optical grading.',
      details: [
        'Slow sun dehydration preserves delicate fatty acid profiles and heat-sensitive vitamins.',
        'Mechanical optical grading separates whole Grade W240/W180 kernels without breakage.',
        'Traditional Bilona curd-churning for ghee and unheated raw straining for honey.',
      ],
      agroMetric: 'Solar Processing: Zero Carbon Footprint',
      highlightBadge: 'Traditional Methods',
    },
    {
      id: 3,
      tag: 'Step 03 • Bio-Safety Standard',
      title: 'Laboratory Purity & Moisture Analysis',
      shortTitle: 'LABORATORY PURITY ANALYSIS',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0M6.5 18h11" />
        </svg>
      ),
      summary: 'Every batch undergoes rigorous food-safety testing for aflatoxins, heavy metals, and moisture balance.',
      details: [
        'Moisture level strictly controlled below 4.5% for natural mold prevention and long-lasting crunch.',
        'Chromatography tested for zero pesticide residue and zero mineral oil glaze.',
        'FSSAI accredited lab certification issued per harvest lot.',
      ],
      agroMetric: 'Moisture Index: <4.5% Guaranteed',
      highlightBadge: 'FSSAI & Lab Tested',
    },
    {
      id: 4,
      tag: 'Step 04 • Eco Freshness Seal',
      title: 'Nitrogen-Flushed Barrier Packaging',
      shortTitle: 'NITROGEN-FLUSHED PACKAGING',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2zM12 12l8-4.5M12 12v8M12 12L4 7.5" />
        </svg>
      ),
      summary: 'Oxygen-free foil packing locks in farm freshness and prevents natural oil oxidation.',
      details: [
        'Food-grade high-barrier multi-layer pouches flushed with 99.9% inert nitrogen.',
        'Locks in authentic crunch, roasted aroma, and natural enzymes without BHA/BHT preservatives.',
        '100% recyclable outer carton and sustainable zero-plastic packing options.',
      ],
      agroMetric: 'Shelf Life: 12 Months Freshness',
      highlightBadge: 'Zero Preservatives',
    },
  ]

  const current = steps[activeStep]
  const progressPercent = (activeStep / (steps.length - 1)) * 100

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#05180E] text-white relative overflow-hidden">
      
      {/* Background Ambient Glow Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-emerald-900/20 via-goodiiz-green/30 to-amber-900/20 blur-3xl pointer-events-none rounded-full" />

      <div className="container-max relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            The Agro Standard
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-white mb-3 sm:mb-4">
            From Sustainable Soil to Your Table
          </h2>
          <p className="text-emerald-100/75 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Click through our 4-stage agro pipeline to discover how we maintain peak farm freshness, lab purity, and traditional nutrition.
          </p>
        </div>

        {/* ======================================================================== */}
        {/* IMAGE 1 TIMELINE EFFECT: CONNECTING LINE, FLOATING PARTICLES, DUAL RINGS  */}
        {/* ======================================================================== */}
        <div className="relative mb-12 sm:mb-16 px-2 sm:px-6 md:px-12 py-8 rounded-3xl bg-[#082417]/80 border border-emerald-500/20 backdrop-blur-md shadow-2xl overflow-hidden">
          
          {/* Ambient Spark Particles (Matching Image 1 effect) */}
          <div className="timeline-spark spark-1 w-1.5 h-1.5 bg-amber-400 top-4 left-[12%]" />
          <div className="timeline-spark spark-2 w-1 h-1 bg-emerald-300 top-8 left-[38%]" />
          <div className="timeline-spark spark-3 w-2 h-2 bg-amber-300 bottom-6 left-[62%]" />
          <div className="timeline-spark spark-4 w-1.5 h-1.5 bg-emerald-200 top-6 left-[84%]" />
          <div className="timeline-spark spark-2 w-1 h-1 bg-amber-400 bottom-4 left-[26%]" />
          <div className="timeline-spark spark-1 w-1.5 h-1.5 bg-emerald-400 top-12 left-[74%]" />

          <div className="relative timeline-track-container py-4">
            
            {/* Connecting Horizontal Line passing through node centers */}
            <div className="timeline-connector-line">
              <div 
                className="timeline-connector-progress" 
                style={{ width: `${progressPercent}%` }} 
              />
              <div className="timeline-beam-glow" />
            </div>

            {/* Intermediate Glowing Dots on Line (Between Node 1-2, 2-3, 3-4 like Image 1) */}
            <div className="timeline-connector-dot" style={{ left: '22%' }} />
            <div className="timeline-connector-dot" style={{ left: '50%' }} />
            <div className="timeline-connector-dot" style={{ left: '78%' }} />

            {/* 4 Interactive Nodes Grid */}
            <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 items-start w-full">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx
                const isPassed = activeStep >= idx

                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className="group flex flex-col items-center text-center cursor-pointer focus:outline-none w-full"
                  >
                    {/* Concentric Double-Ring Node (Image 1 circular structure) */}
                    <div
                      className={`timeline-node-ring w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${
                        isActive
                          ? 'active'
                          : isPassed
                          ? 'passed'
                          : 'inactive'
                      }`}
                    >
                      {/* Inner Node Circle with Icon */}
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 border ${
                          isActive
                            ? 'bg-[#143D28] text-amber-300 border-amber-400/80 shadow-inner'
                            : isPassed
                            ? 'bg-[#0E301F] text-amber-300/90 border-amber-400/50'
                            : 'bg-[#0A2417] text-emerald-400/60 border-emerald-500/20 group-hover:border-amber-400/60 group-hover:text-amber-300'
                        }`}
                      >
                        <div className="transition-transform duration-300 group-hover:scale-110">
                          {step.icon}
                        </div>
                      </div>

                      {/* Small Active Pulse Indicator */}
                      {isActive && (
                        <span className="absolute -inset-1 rounded-full border border-amber-400/40 animate-ping pointer-events-none" />
                      )}
                    </div>

                    {/* Stage Title Below Circle */}
                    <div className="mt-3 sm:mt-4 space-y-1 w-full max-w-[85px] sm:max-w-[130px] md:max-w-[160px]">
                      <div
                        className={`text-[9px] sm:text-[11px] md:text-xs font-bold uppercase tracking-wider transition-colors duration-300 leading-tight ${
                          isActive
                            ? 'text-amber-300 font-extrabold drop-shadow-[0_0_8px_rgba(229,169,60,0.5)]'
                            : isPassed
                            ? 'text-emerald-200/90'
                            : 'text-emerald-400/50 group-hover:text-amber-200'
                        }`}
                      >
                        {step.shortTitle}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

          </div>

        </div>

        {/* Active Stage Detailed Card Display */}
        <div className="bg-[#082417]/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-emerald-500/25 shadow-2xl backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
                {current.tag}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white mt-2">
                {current.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-emerald-100/85 leading-relaxed">
              {current.summary}
            </p>

            <div className="space-y-2.5 pt-2">
              {current.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-3 text-xs sm:text-sm text-emerald-100/90">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300">
                {current.agroMetric}
              </span>
              <span className="text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
                {current.highlightBadge}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#05190F] rounded-2xl p-6 border border-emerald-500/20 shadow-inner space-y-4">
            <div className="p-4 bg-[#0A2E1C]/80 rounded-xl border border-emerald-500/20 font-medium text-xs sm:text-sm text-emerald-200 leading-relaxed italic">
              &ldquo;Every handful of our nuts & treats represents the honest labor of Indian farmers and the purity of untreated nature.&rdquo;
            </div>

            <div className="pt-2">
              <AntiMetalButton
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                accentFrom="#e5a93c"
                accentTo="#10b981"
                dotColor="#05180E"
                className="w-full text-xs py-3 font-bold uppercase tracking-wider text-white"
              >
                Next Stage ({activeStep + 1}/4) →
              </AntiMetalButton>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
