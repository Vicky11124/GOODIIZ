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

  // Calculate percentage fill for the progress track
  const progressPercent = (activeStep / (steps.length - 1)) * 100

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
      
      <div className="container-max">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-goodiiz-green/10 text-goodiiz-green text-xs font-bold uppercase tracking-wider mb-3">
            The Agro Standard
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-goodiiz-green mb-3 sm:mb-4">
            From Sustainable Soil to Your Table
          </h2>
          <p className="text-goodiiz-brown/80 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Click through our 4-stage agro pipeline to discover how we maintain peak farm freshness, lab purity, and traditional nutrition.
          </p>
        </div>

        {/* ======================================================== */}
        {/* ANIMATED HORIZONTAL PIPELINE TRACK (MOBILE + DESKTOP)    */}
        {/* ======================================================== */}
        <div className="relative mb-8 sm:mb-12 md:mb-16 -mx-4 sm:mx-0 px-1 sm:px-4 md:px-8">
          {/* Full-width continuous connecting bar passing across the screen through all 4 nodes */}
          <div className="absolute top-[24px] sm:top-[28px] md:top-[34px] left-1/2 -translate-x-1/2 w-[120vw] h-1 sm:h-1.5 timeline-track overflow-hidden pointer-events-none">
            {/* Travelling Light Pulse across the full width */}
            <div className="timeline-beam"></div>
          </div>

          {/* 4 Interactive Circular Nodes */}
          <div className="relative z-10 grid grid-cols-4 gap-1 sm:gap-4 md:gap-6 items-start w-full">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx
              const isPassed = activeStep >= idx

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className="timeline-node-btn group flex flex-col items-center text-center cursor-pointer focus:outline-none transition-all duration-300 w-full"
                >
                  {/* Circular Node Container with Gold/Green Glow */}
                  <div
                    className={`timeline-icon-wrapper relative w-12 h-12 sm:w-14 sm:h-14 md:w-[68px] md:h-[68px] rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                      isActive
                        ? 'timeline-node-active bg-[#143D28] text-goodiiz-gold border-goodiiz-gold shadow-glow-gold'
                        : isPassed
                        ? 'bg-[#143D28] text-goodiiz-gold-light border-goodiiz-gold/60 shadow-md'
                        : 'bg-white text-goodiiz-brown/50 border-goodiiz-gold/30 hover:border-goodiiz-gold hover:text-goodiiz-gold'
                    }`}
                  >
                    {/* Inner Icon */}
                    <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-5 sm:[&_svg]:h-5 md:[&_svg]:w-6 md:[&_svg]:h-6">
                      {step.icon}
                    </div>

                    {/* Active pulse aura */}
                    {isActive && (
                      <span className="absolute -inset-1 sm:-inset-1.5 rounded-full border border-goodiiz-gold/50 animate-ping pointer-events-none"></span>
                    )}

                    {/* Small amber glow indicator on top */}
                    {isPassed && (
                      <span className="absolute -top-1 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-goodiiz-gold border-2 border-white shadow-sm"></span>
                    )}
                  </div>

                  {/* Stage Label Below Icon */}
                  <div className="mt-2 sm:mt-3 md:mt-4 space-y-0.5 w-full max-w-[85px] sm:max-w-[120px] md:max-w-[140px] px-0.5">
                    <div
                      className={`text-[8.5px] sm:text-[10px] md:text-xs font-extrabold uppercase tracking-tight sm:tracking-wider transition-colors duration-300 leading-tight ${
                        isActive
                          ? 'text-goodiiz-green font-black'
                          : 'text-goodiiz-brown/70 group-hover:text-goodiiz-green'
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

        {/* Active Stage Detailed Display */}
        <div className="bg-goodiiz-cream-light rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-goodiiz-gold/30 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-goodiiz-gold bg-goodiiz-gold/10 px-2.5 py-0.5 rounded-full">
                {current.tag}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-goodiiz-green mt-1">
                {current.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-goodiiz-brown/85 leading-relaxed">
              {current.summary}
            </p>

            <div className="space-y-2 sm:space-y-2.5 pt-1 sm:pt-2">
              {current.details.map((detail, index) => (
                <div key={index} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-goodiiz-brown">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-goodiiz-green text-white">
                {current.agroMetric}
              </span>
              <span className="text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-goodiiz-gold/20 text-goodiiz-brown">
                {current.highlightBadge}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-goodiiz-gold/20 shadow-sm space-y-4">
            <div className="p-4 bg-goodiiz-cream rounded-xl border border-goodiiz-gold/20 font-medium text-xs sm:text-sm text-goodiiz-green leading-relaxed">
              &ldquo;Every handful of our nuts & treats represents the honest labor of Indian farmers and the purity of untreated nature.&rdquo;
            </div>

            <div className="pt-2 flex gap-2">
              <AntiMetalButton
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                accentFrom="#f5d061"
                accentTo="#c88e3e"
                dotColor="#143D28"
                className="w-full text-xs py-2.5 sm:py-3"
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
