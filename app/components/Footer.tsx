import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#0A2216] text-white pt-16 pb-10 border-t-2 border-goodiiz-gold/30">
      <div className="container-max">
        
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-md border border-goodiiz-gold/40">
                <Image
                  src="/images/logo.png"
                  alt="GOODIIZ Logo"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-2xl font-serif font-bold tracking-tight text-white">
                  GOOD<span className="text-goodiiz-gold">IIZ</span>
                </div>
                <div className="text-[10px] text-goodiiz-gold-light uppercase tracking-wider font-bold">
                  Nuts & Treats • Agro Foods
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-goodiiz-gold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/products" className="text-goodiiz-cream/80 hover:text-goodiiz-gold transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/#agro-calculator" className="text-goodiiz-cream/80 hover:text-goodiiz-gold transition">
                  Nutri-Advisor
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-goodiiz-cream/80 hover:text-goodiiz-gold transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-goodiiz-cream/80 hover:text-goodiiz-gold transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Goodiiz Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-goodiiz-gold">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/products?cat=Nuts" className="text-goodiiz-cream/80 hover:text-goodiiz-gold transition">
                  Nuts
                </Link>
              </li>
              <li>
                <Link href="/products?cat=Dry%20Fruits" className="text-goodiiz-cream/80 hover:text-goodiiz-gold transition">
                  Dry Fruits
                </Link>
              </li>
              <li>
                <Link href="/products?cat=Healthy%20Malts%20%26%20Powders" className="text-goodiiz-cream/80 hover:text-goodiiz-gold transition">
                  Healthy Malts & Powders
                </Link>
              </li>
              <li>
                <Link href="/products?cat=Seeds%20%26%20Staples" className="text-goodiiz-cream/80 hover:text-goodiiz-gold transition">
                  Seeds & Staples
                </Link>
              </li>
              <li>
                <Link href="/products?cat=Treats%20%26%20Sweeteners" className="text-goodiiz-cream/80 hover:text-goodiiz-gold transition">
                  Treats & Sweeteners
                </Link>
              </li>
              <li>
                <Link href="/products?cat=Dairy" className="text-goodiiz-cream/80 hover:text-goodiiz-gold transition">
                  Dairy & Vedic Ghee
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct GOODIIZ WhatsApp & Orders */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-goodiiz-gold">
              GOODIIZ WhatsApp & Orders
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a 
                  href="https://wa.me/919025019480" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-300 hover:text-white transition flex items-center gap-2 font-semibold"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.06c-1.49 0-2.94-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.14 8.14 0 0 1-1.25-4.29c0-4.51 3.67-8.17 8.18-8.17 2.18 0 4.24.85 5.78 2.39 1.54 1.54 2.4 3.6 2.4 5.79 0 4.51-3.67 8.13-8.18 8.13zm4.49-6.09c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z" />
                  </svg>
                  <span>WhatsApp: +91 90250 19480</span>
                </a>
              </li>
              <li>
                <a href="tel:+919025019480" className="text-goodiiz-cream/80 hover:text-goodiiz-gold transition flex items-center gap-2">
                  <svg className="w-4 h-4 text-goodiiz-gold shrink-0 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Phone: +91 90250 19480</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright and Trust Badges */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-goodiiz-cream/60">
          <p>© {new Date().getFullYear()} GOODIIZ. All rights reserved. 100% Pure Earth Nutrition.</p>
          <div className="flex items-center gap-4 text-[11px] font-medium tracking-wide">
            <span>FSSAI Certified</span>
            <span>•</span>
            <span>100% Non-GMO</span>
            <span>•</span>
            <span>Fair-Trade Agro</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

