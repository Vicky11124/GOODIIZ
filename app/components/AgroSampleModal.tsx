'use client'

import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function AgroSampleModal({ isOpen, onClose }: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'Jumbo Cashews W240',
    'California Almonds',
    'Vedic Bilona Ghee',
  ])
  const [buyerType, setBuyerType] = useState('wholesale')
  const [businessName, setBusinessName] = useState('')
  const [city, setCity] = useState('')

  if (!isOpen) return null

  const availableSamples = [
    'Jumbo Cashews W240',
    'California Almonds',
    'Iranian Roasted Pistachios',
    'Vedic Bilona Ghee',
    'Raw Forest Wildflower Honey',
    'Sundakani Golden Raisins',
    'Honey Preserved Amla',
  ]

  const toggleSample = (item: string) => {
    if (selectedItems.includes(item)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter((i) => i !== item))
      }
    } else {
      if (selectedItems.length < 4) {
        setSelectedItems([...selectedItems, item])
      }
    }
  }

  const sampleMessage = encodeURIComponent(
    `Hi GOODIIZ Commercial Team,\n\nI want to request an Agro Sample Box:\n• Buyer Type: ${buyerType.toUpperCase()}\n• Business Name: ${businessName || 'Individual'}\n• Destination City: ${city || 'India'}\n• Selected Sample Crops (${selectedItems.length}/4):\n  ${selectedItems.map((s) => `• ${s}`).join('\n  ')}\n\nPlease confirm sample dispatch details and shipping fee.`
  )

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-goodiiz-gold/30 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start pb-3 border-b border-goodiiz-gold/20">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-goodiiz-gold bg-goodiiz-gold/10 px-2.5 py-0.5 rounded-full">
              Quality Validation Kit
            </span>
            <h3 className="text-2xl font-serif font-bold text-goodiiz-green mt-1">
              Request Agro Sample Kit
            </h3>
            <p className="text-xs text-goodiiz-brown/70 mt-0.5">
              Select up to 4 farm samples to taste and test lab freshness.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-goodiiz-cream hover:bg-goodiiz-cream-dark text-goodiiz-brown font-bold flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Buyer Type Switch */}
        <div>
          <label className="block text-xs font-bold text-goodiiz-green uppercase tracking-wider mb-2">
            I am a:
          </label>
          <div className="grid grid-cols-3 gap-2 bg-goodiiz-cream p-1 rounded-xl text-xs font-semibold">
            {[
              { id: 'wholesale', label: 'B2B Wholesale' },
              { id: 'corporate', label: 'Corporate Gifting' },
              { id: 'individual', label: 'Individual / Gourmet' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setBuyerType(t.id)}
                className={`py-2 px-1 rounded-lg transition text-center ${
                  buyerType === t.id
                    ? 'bg-goodiiz-green text-white font-bold'
                    : 'text-goodiiz-brown hover:text-goodiiz-green'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sample Items Selector */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-goodiiz-green uppercase tracking-wider">
              Select Sample Produce:
            </label>
            <span className="text-xs font-bold text-goodiiz-gold">
              {selectedItems.length}/4 Selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableSamples.map((sample) => {
              const isSelected = selectedItems.includes(sample)
              return (
                <button
                  key={sample}
                  onClick={() => toggleSample(sample)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-goodiiz-green/10 border-goodiiz-green text-goodiiz-green font-bold'
                      : 'bg-white border-goodiiz-cream-dark text-goodiiz-brown/80 hover:border-goodiiz-gold'
                  }`}
                >
                  <span className="truncate">{sample}</span>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isSelected ? 'bg-goodiiz-green text-white font-bold' : 'border border-goodiiz-brown/30'
                  }`}>
                    {isSelected ? '✓' : ''}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Basic Contact details */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-goodiiz-brown mb-1">
              Business / Personal Name
            </label>
            <input
              type="text"
              placeholder="e.g. Green Organics / Priya Sharma"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-goodiiz-gold/30 focus:outline-none focus:border-goodiiz-green bg-goodiiz-cream/30"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-goodiiz-brown mb-1">
              Delivery City / State
            </label>
            <input
              type="text"
              placeholder="e.g. Mumbai, Maharashtra"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-goodiiz-gold/30 focus:outline-none focus:border-goodiiz-green bg-goodiiz-cream/30"
            />
          </div>
        </div>

        {/* Submit to WhatsApp */}
        <div className="pt-2">
          <a
            href={`https://wa.me/919500084204?text=${sampleMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-goodiiz-green hover:bg-goodiiz-green-dark text-white py-3.5 px-4 rounded-xl font-bold text-xs text-center shadow-md transition flex items-center justify-center gap-2"
          >
            <span>Send Sample Request on WhatsApp</span>
            <span>→</span>
          </a>
          <p className="text-[10px] text-center text-goodiiz-brown/60 mt-2">
            Sample boxes dispatched within 24 hours with testing reports.
          </p>
        </div>
      </div>
    </div>
  )
}
