'use client'

import { useState } from 'react'

export default function AgroFaqInteractive() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [filter, setFilter] = useState<'all' | 'wholesale' | 'quality' | 'delivery'>('all')

  const faqs = [
    {
      category: 'quality',
      q: 'How does GOODIIZ ensure agro nuts and dry fruits stay fresh without preservatives?',
      a: 'We use high-barrier food grade multi-layer pouches flushed with 99.9% inert nitrogen during packaging. This eliminates oxygen, preventing natural nut oil oxidation and keeping the nuts crisp, fresh, and aromatic for up to 12 months without any synthetic preservatives like BHA or BHT.',
    },
    {
      category: 'wholesale',
      q: 'What is the Minimum Order Quantity (MOQ) for B2B Wholesale and Corporate Gifting?',
      a: 'For bulk agro commodities (Cashews W240, California Almonds, Iranian Pistachios), our wholesale pricing starts at a minimum order of 10 KG. For custom corporate and festive gift boxes, MOQ starts at just 15 boxes with complimentary custom branding and sleeve printing.',
    },
    {
      category: 'quality',
      q: 'What makes your Srirangam Ghee different from regular store-bought ghee?',
      a: 'Our Srirangam Ghee is prepared strictly from A2 cow milk using the authentic Vedic Bilona method. Whole milk is cultured into curd, and then bi-directionally hand-churned to obtain makkhan (butter), which is slowly simmered on wood-fired heat. This preserves medicinal butyric acid and gives it a granular, golden texture with unmatched natural aroma.',
    },
    {
      category: 'wholesale',
      q: 'Can we request customized private labeling / white labeling for our retail brand?',
      a: 'Yes! We support OEM private labeling for organic stores, gourmet supermarkets, and wellness brands. We can package according to your requested weight denominations (100g, 250g, 500g, 1kg) with custom logo stickers, barcode printing, and batch QR codes.',
    },
    {
      category: 'delivery',
      q: 'How fast is door delivery and pan-India shipping?',
      a: 'Individual retail orders are dispatched within 24 hours and delivered in 2 to 4 business days across India via express couriers. Wholesale bulk shipments (50kg to 1000kg+) are dispatched through insured surface cargo with real-time tracking within 48 hours.',
    },
    {
      category: 'quality',
      q: 'Are lab testing reports and pesticide-free certificates provided?',
      a: 'Absolutely. Every harvest batch undergoes comprehensive testing for moisture content, aflatoxins, and pesticide residues. Commercial buyers and distributors can request batch-specific COA (Certificate of Analysis) reports upon ordering.',
    },
  ]

  const filtered = filter === 'all' ? faqs : faqs.filter((f) => f.category === filter)

  return (
    <section className="py-10 sm:py-14 md:py-20 bg-white relative">
      <div className="container-max max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-goodiiz-green/10 text-goodiiz-green text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
            Common Agro Queries
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-goodiiz-green mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-goodiiz-brown/70 text-xs sm:text-sm max-w-xl mx-auto">
            Everything you need to know about our agro harvests, wholesale terms, and traditional processing.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-5 sm:mb-8">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'quality', label: 'Quality & Purity' },
            { id: 'wholesale', label: 'Wholesale & B2B' },
            { id: 'delivery', label: 'Shipping & Delivery' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition ${
                filter === item.id
                  ? 'bg-goodiiz-green text-white shadow-sm'
                  : 'bg-goodiiz-cream text-goodiiz-brown hover:bg-goodiiz-cream-dark'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-2 sm:space-y-3">
          {filtered.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="bg-goodiiz-cream-light rounded-xl sm:rounded-2xl border border-goodiiz-gold/20 overflow-hidden transition shadow-2xs"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-3.5 sm:p-4 md:p-5 flex items-center justify-between gap-3 sm:gap-4 font-bold text-goodiiz-green hover:text-goodiiz-gold-dark transition"
                >
                  <span className="text-xs sm:text-sm md:text-base leading-snug">{faq.q}</span>
                  <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white flex items-center justify-center text-[9px] sm:text-xs shrink-0 transition transform ${
                    isOpen ? 'rotate-180 bg-goodiiz-green text-white' : 'text-goodiiz-green'
                  }`}>
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-2 sm:px-5 sm:pb-5 sm:pt-3 text-[11px] sm:text-xs md:text-sm text-goodiiz-brown/80 leading-relaxed border-t border-goodiiz-cream animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-goodiiz-cream rounded-xl sm:rounded-2xl border border-goodiiz-gold/20 text-center flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="text-left">
            <h4 className="text-xs sm:text-sm md:text-base font-bold text-goodiiz-green">Have a specific agro requirement or query?</h4>
            <p className="text-[11px] sm:text-xs text-goodiiz-brown/70">Our direct agro specialists respond instantly on WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/919500084204?text=Hi%20GOODIIZ,%20I%20have%20a%20question%20about%20your%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-goodiiz-green hover:bg-goodiiz-green-dark text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs transition shadow-sm whitespace-nowrap self-stretch sm:self-auto text-center"
          >
            Chat with Agro Specialist
          </a>
        </div>

      </div>
    </section>
  )
}
