'use client'

import React, { useState } from 'react'

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [customMsg, setCustomMsg] = useState('')

  const phoneNumber = '919500084204'

  const quickMessages = [
    'Hi GOODIIZ! I would like to place an order.',
    'Can you share the latest product price list?',
    'What are the delivery charges and delivery times?',
    'Do you offer custom gift hampers?',
  ]

  const handleSendMessage = (text: string) => {
    const encoded = encodeURIComponent(text.trim())
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`
    window.open(url, '_blank')
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Interactive Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-goodiiz-cream-dark overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-base font-bold text-white tracking-wider">
                GZ
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">GOODIIZ Support</h3>
                <p className="text-[11px] text-white/90 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  Online &bull; Replies within minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-sm font-bold transition"
            >
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#ECE5DD] bg-opacity-40 space-y-3 max-h-72 overflow-y-auto">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-xs text-goodiiz-brown max-w-[85%] border border-goodiiz-cream">
              <p className="font-semibold text-goodiiz-green mb-1">Hello! Welcome to GOODIIZ</p>
              <p className="leading-relaxed">
                How can we help you with our premium nuts, dry fruits, and treats today?
              </p>
              <span className="text-[9px] text-goodiiz-brown/50 block text-right mt-1">Just now</span>
            </div>

            {/* Quick action suggestions */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-bold text-goodiiz-brown/70 px-1">Quick Inquiries:</p>
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(msg)}
                  className="w-full text-left text-xs bg-white hover:bg-goodiiz-cream border border-goodiiz-cream-dark/60 text-goodiiz-green font-medium p-2 rounded-xl transition shadow-sm flex items-center justify-between group"
                >
                  <span className="truncate">{msg}</span>
                  <span className="text-[#25D366] font-bold text-sm ml-1 group-hover:translate-x-0.5 transition">
                    &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (customMsg.trim()) {
                handleSendMessage(customMsg)
                setCustomMsg('')
              }
            }}
            className="p-3 bg-white border-t border-goodiiz-cream flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="flex-1 text-xs border border-goodiiz-cream-dark rounded-xl px-3 py-2 focus:outline-none focus:border-[#25D366] text-goodiiz-brown"
            />
            <button
              type="submit"
              disabled={!customMsg.trim()}
              className="bg-[#25D366] hover:bg-[#1EBE5D] disabled:opacity-40 text-white p-2 rounded-xl transition shadow-sm flex items-center justify-center"
              title="Send to WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating WhatsApp Action Button (CTC) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp"
        className="relative group bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transition transform hover:scale-105 active:scale-95"
      >
        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"></span>

        {/* WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.06c-1.49 0-2.94-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.14 8.14 0 0 1-1.25-4.29c0-4.51 3.67-8.17 8.18-8.17 2.18 0 4.24.85 5.78 2.39 1.54 1.54 2.4 3.6 2.4 5.79 0 4.51-3.67 8.13-8.18 8.13zm4.49-6.09c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z" />
        </svg>

        {/* Text Badge on hover or desktop */}
        <span className="hidden sm:inline font-bold text-sm tracking-wide pr-1">
          Chat with us
        </span>

        {/* Unread dot */}
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-white">
          1
        </span>
      </button>
    </div>
  )
}
