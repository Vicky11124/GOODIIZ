'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import SpecularButton from '@/components/ui/SpecularButton'
import SpecularCard from '@/components/ui/SpecularCard'

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState('retail')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const whatsappText = encodeURIComponent(
      `Hi GOODIIZ,\n\nNew Website Inquiry:\n• Type: ${inquiryType.toUpperCase()}\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Email: ${formData.email}\n• City: ${formData.city}\n• Message: ${formData.message}`
    )
    window.open(`https://wa.me/919500084204?text=${whatsappText}`, '_blank')
    setFormData({ name: '', email: '', phone: '', city: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="pt-28 sm:pt-32 md:pt-36 pb-12 md:pb-20 bg-goodiiz-cream min-h-screen">
      <div className="container-max">
        
        {/* Flow Motion Header Starting Fast From Outside the Left Frame */}
        <motion.div
          initial={{ opacity: 0, x: '-100vw' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.0, 0.85, 0.15, 1] }}
          className="relative text-center max-w-3xl mx-auto mb-16 py-2"
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
            <span>Direct GOODIIZ Communication</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: '-100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.02, ease: [0.0, 0.85, 0.15, 1] }}
            className="text-4xl sm:text-5xl font-bold font-serif mb-4 leading-tight"
          >
            <span className="animate-flow-motion">
              Connect with Our Goodiiz Specialists
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: '-100vw' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.04, ease: [0.0, 0.85, 0.15, 1] }}
            className="text-goodiiz-brown/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Whether you need a family pantry pack, a bulk commercial shipment of cashews/ghee, or custom corporate gift hampers, we are here to assist.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          
          {/* ======================================================== */}
          {/* 1. MOBILE 2x2 CONTACT CHANNELS (Visible on md:hidden)   */}
          {/* ======================================================== */}
          <div className="md:hidden space-y-4">
            <h3 className="text-xl font-serif font-bold text-goodiiz-green">
              Direct Contact Channels
            </h3>

            {/* 2x2 Contact Cards Matrix with Specular Beams */}
            <div className="grid grid-cols-2 gap-2.5">
              
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/919500084204"
                target="_blank"
                rel="noopener noreferrer"
                className="block group active:scale-95 transition-transform h-full"
              >
                <SpecularCard
                  radius={18}
                  thickness={1.6}
                  duration={4}
                  baseColor="rgba(37, 211, 102, 0.18)"
                  lineColor="#25D366"
                  highlightColor="#86efac"
                  accentColor="#16a34a"
                  innerClassName="p-3.5 bg-white flex flex-col justify-between h-full"
                  className="h-full shadow-xs hover:shadow-card-hover transition-all"
                >
                  <div>
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-[9px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-xs">
                        Live
                      </span>
                    </div>
                    <h4 className="text-xs font-serif font-bold text-goodiiz-green group-hover:text-goodiiz-gold transition">
                      WhatsApp Desk
                    </h4>
                    <p className="text-[10px] text-goodiiz-brown/70 mt-0.5 line-clamp-1">
                      +91 95000 84204
                    </p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-goodiiz-green">
                    <span>Chat Now</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </SpecularCard>
              </a>

              {/* Phone Line Card */}
              <a
                href="tel:+919500084204"
                className="block group active:scale-95 transition-transform h-full"
              >
                <SpecularCard
                  radius={18}
                  thickness={1.6}
                  duration={4.2}
                  baseColor="rgba(230, 161, 59, 0.18)"
                  lineColor="#fef08a"
                  highlightColor="#e6a13b"
                  accentColor="#c88e3e"
                  innerClassName="p-3.5 bg-white flex flex-col justify-between h-full"
                  className="h-full shadow-xs hover:shadow-card-hover transition-all"
                >
                  <div>
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-[9px] bg-goodiiz-cream text-goodiiz-brown/80 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-goodiiz-gold/20">
                        Direct
                      </span>
                    </div>
                    <h4 className="text-xs font-serif font-bold text-goodiiz-green group-hover:text-goodiiz-gold transition">
                      Phone Support
                    </h4>
                    <p className="text-[10px] text-goodiiz-brown/70 mt-0.5 line-clamp-1">
                      +91 95000 84204
                    </p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-goodiiz-green">
                    <span>Call Us</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </SpecularCard>
              </a>

              {/* Official Email Card */}
              <a
                href="mailto:info@goodiiz.in"
                className="block group active:scale-95 transition-transform h-full"
              >
                <SpecularCard
                  radius={18}
                  thickness={1.6}
                  duration={4.5}
                  baseColor="rgba(16, 54, 35, 0.16)"
                  lineColor="#34d399"
                  highlightColor="#103623"
                  accentColor="#065f46"
                  innerClassName="p-3.5 bg-white flex flex-col justify-between h-full"
                  className="h-full shadow-xs hover:shadow-card-hover transition-all"
                >
                  <div>
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-[9px] bg-goodiiz-cream text-goodiiz-brown/80 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-goodiiz-gold/20">
                        Official
                      </span>
                    </div>
                    <h4 className="text-xs font-serif font-bold text-goodiiz-green group-hover:text-goodiiz-gold transition">
                      Email Inquiry
                    </h4>
                    <p className="text-[10px] text-goodiiz-brown/70 mt-0.5 line-clamp-1">
                      info@goodiiz.in
                    </p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-goodiiz-green">
                    <span>Send Mail</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </SpecularCard>
              </a>

              {/* Farm Dispatch Hub Card */}
              <div className="h-full">
                <SpecularCard
                  radius={18}
                  thickness={1.6}
                  duration={5}
                  baseColor="rgba(200, 142, 62, 0.16)"
                  lineColor="#fbbf24"
                  highlightColor="#e6a13b"
                  accentColor="#92400e"
                  innerClassName="p-3.5 bg-white flex flex-col justify-between h-full"
                  className="h-full shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-[9px] bg-goodiiz-gold/20 text-goodiiz-brown px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-goodiiz-gold/30">
                        Hub
                      </span>
                    </div>
                    <h4 className="text-xs font-serif font-bold text-goodiiz-green">
                      Farm Dispatch Hub
                    </h4>
                    <p className="text-[10px] text-goodiiz-brown/70 mt-0.5 line-clamp-1">
                      Tiruchirappalli, TN
                    </p>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gray-100 text-[10px] text-goodiiz-brown/60">
                    <span>Mon - Sat</span>
                  </div>
                </SpecularCard>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. DESKTOP CONTACT METHODS (Visible on hidden md:block)  */}
          {/* ======================================================== */}
          <div className="hidden md:block lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-serif font-bold text-goodiiz-green">
              Direct Contact Channels
            </h3>

            <div className="space-y-4">
              <a
                href="https://wa.me/919500084204"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <SpecularCard
                  radius={24}
                  thickness={2}
                  duration={4}
                  baseColor="rgba(37, 211, 102, 0.2)"
                  lineColor="#25D366"
                  highlightColor="#86efac"
                  accentColor="#16a34a"
                  innerClassName="p-5 bg-white flex flex-col justify-between"
                  className="shadow-card hover:shadow-card-hover transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-goodiiz-green">Instant WhatsApp</h4>
                      <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.2 rounded-full font-bold shadow-xs">Live</span>
                    </div>
                    <p className="text-sm font-semibold text-goodiiz-gold-dark mt-0.5">+91 95000 84204</p>
                    <p className="text-xs text-goodiiz-brown/60 mt-1">Average response within 10 minutes</p>
                  </div>
                </SpecularCard>
              </a>

              <a
                href="tel:+919500084204"
                className="block group"
              >
                <SpecularCard
                  radius={24}
                  thickness={2}
                  duration={4.2}
                  baseColor="rgba(230, 161, 59, 0.2)"
                  lineColor="#fef08a"
                  highlightColor="#e6a13b"
                  accentColor="#c88e3e"
                  innerClassName="p-5 bg-white flex flex-col justify-between"
                  className="shadow-card hover:shadow-card-hover transition-all"
                >
                  <div>
                    <h4 className="font-serif font-bold text-goodiiz-green">Direct Phone Line</h4>
                    <p className="text-sm font-semibold text-goodiiz-gold-dark mt-0.5">+91 95000 84204</p>
                    <p className="text-xs text-goodiiz-brown/60 mt-1">Mon - Sat: 9:00 AM to 7:30 PM IST</p>
                  </div>
                </SpecularCard>
              </a>

              <a
                href="mailto:info@goodiiz.in"
                className="block group"
              >
                <SpecularCard
                  radius={24}
                  thickness={2}
                  duration={4.5}
                  baseColor="rgba(16, 54, 35, 0.18)"
                  lineColor="#34d399"
                  highlightColor="#103623"
                  accentColor="#065f46"
                  innerClassName="p-5 bg-white flex flex-col justify-between"
                  className="shadow-card hover:shadow-card-hover transition-all"
                >
                  <div>
                    <h4 className="font-serif font-bold text-goodiiz-green">Official Email</h4>
                    <p className="text-sm font-semibold text-goodiiz-gold-dark mt-0.5">info@goodiiz.in</p>
                    <p className="text-xs text-goodiiz-brown/60 mt-1">For formal purchase orders and invoices</p>
                  </div>
                </SpecularCard>
              </a>
            </div>

            {/* Farm Headquarters Address */}
            <div className="bg-white rounded-3xl p-6 shadow-card border border-goodiiz-gold/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-goodiiz-green uppercase tracking-wider">
                Processing & Farm Dispatch Centre
              </div>
              <p className="text-xs text-goodiiz-brown/80 leading-relaxed">
                GOODIIZ Agro Foods & Natural Products,<br />
                Regional Farm Hub, Tiruchirappalli, Tamil Nadu, India.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-card hover:shadow-card-hover border border-goodiiz-gold/25 transition-all duration-300 space-y-3 sm:space-y-6">
            <div>
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-goodiiz-green">
                Send Direct Goodiiz Inquiry
              </h3>
              <p className="text-[11px] sm:text-xs text-goodiiz-brown/70 mt-0.5 sm:mt-1">
                Fill the form to receive an instant quotation or dispatch schedule via WhatsApp.
              </p>
            </div>

            {submitted && (
              <div className="p-3 sm:p-4 bg-emerald-100 border border-emerald-400 text-emerald-800 rounded-xl sm:rounded-2xl text-xs font-bold animate-fade-in">
                ✓ Thank you! Your inquiry was generated and routed to our WhatsApp desk.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-4">
              
              {/* Inquiry Type (2x2 on mobile, 4-col on desktop) */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-goodiiz-green uppercase tracking-wider mb-1 sm:mb-2">
                  Inquiry Purpose:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold">
                  {[
                    { id: 'retail', label: 'Retail Order' },
                    { id: 'wholesale', label: 'B2B Wholesale' },
                    { id: 'gifting', label: 'Corporate Gifting' },
                    { id: 'partner', label: 'Farmer Partner' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setInquiryType(t.id)}
                      className={`py-1.5 sm:py-2.5 px-1.5 sm:px-2 rounded-lg sm:rounded-xl border text-center transition-all duration-300 truncate active:scale-95 ${
                        inquiryType === t.id
                          ? 'bg-gradient-to-r from-goodiiz-green to-goodiiz-green-dark text-white border-goodiiz-green font-bold shadow-sm ring-2 ring-goodiiz-gold/40 scale-[1.02]'
                          : 'bg-goodiiz-cream/50 hover:bg-white text-goodiiz-brown border-goodiiz-gold/20 hover:border-goodiiz-gold/50 shadow-xs'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone Side-by-Side on Mobile (2x2 Matrix) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] sm:text-xs font-bold text-goodiiz-green uppercase tracking-wider mb-0.5 sm:mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-[11px] sm:text-xs p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-goodiiz-gold/30 bg-goodiiz-cream/30 hover:border-goodiiz-gold/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-goodiiz-gold/40 focus:border-goodiiz-green transition-all duration-300 shadow-xs focus:shadow-md"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-[10px] sm:text-xs font-bold text-goodiiz-green uppercase tracking-wider mb-0.5 sm:mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full text-[11px] sm:text-xs p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-goodiiz-gold/30 bg-goodiiz-cream/30 hover:border-goodiiz-gold/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-goodiiz-gold/40 focus:border-goodiiz-green transition-all duration-300 shadow-xs focus:shadow-md"
                  />
                </div>
              </div>

              {/* Email & City Side-by-Side on Mobile */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <label htmlFor="email" className="block text-[10px] sm:text-xs font-bold text-goodiiz-green uppercase tracking-wider mb-0.5 sm:mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full text-[11px] sm:text-xs p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-goodiiz-gold/30 bg-goodiiz-cream/30 hover:border-goodiiz-gold/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-goodiiz-gold/40 focus:border-goodiiz-green transition-all duration-300 shadow-xs focus:shadow-md"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-[10px] sm:text-xs font-bold text-goodiiz-green uppercase tracking-wider mb-0.5 sm:mb-1">
                    City / State
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Bangalore, KA"
                    className="w-full text-[11px] sm:text-xs p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-goodiiz-gold/30 bg-goodiiz-cream/30 hover:border-goodiiz-gold/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-goodiiz-gold/40 focus:border-goodiiz-green transition-all duration-300 shadow-xs focus:shadow-md"
                  />
                </div>
              </div>

              {/* Requirement Textarea */}
              <div>
                <label htmlFor="message" className="block text-[10px] sm:text-xs font-bold text-goodiiz-green uppercase tracking-wider mb-0.5 sm:mb-1">
                  Product / Volume Requirement *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Specify product (e.g. 50kg Jumbo Cashews or 5kg A2 Vedic Ghee) and your preferred timeline..."
                  rows={2}
                  className="w-full text-[11px] sm:text-xs p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-goodiiz-gold/30 bg-goodiiz-cream/30 hover:border-goodiiz-gold/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-goodiiz-gold/40 focus:border-goodiiz-green transition-all duration-300 shadow-xs focus:shadow-md resize-none h-16 sm:h-24"
                />
              </div>

              <div className="pt-1">
                <SpecularButton
                  type="submit"
                  size="md"
                  radius={14}
                  tint="#103623"
                  tintOpacity={1}
                  textColor="#ffffff"
                  lineColor="#fff59d"
                  baseColor="#e6a13b"
                  thickness={1.6}
                  speed={3}
                  className="w-full justify-center py-3 sm:py-3.5 text-xs sm:text-sm font-bold shadow-md hover:shadow-xl transition"
                >
                  <span className="flex items-center justify-center gap-2">
                    <span>Send Inquiry to WhatsApp Desk</span>
                    <span>→</span>
                  </span>
                </SpecularButton>
              </div>
            </form>

            <p className="text-[10px] sm:text-[11px] text-center text-goodiiz-brown/60">
              Direct encrypted communication. Zero spam guarantee.
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

