'use client'

import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"
import SpecularButton from "@/components/ui/SpecularButton"
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    {
      name: "Farm Products",
      link: "/products",
      subtitle: "Nuts, A2 Ghee, Honey & Dry Fruits",
    },
    {
      name: "Nutri-Advisor",
      link: "/#agro-calculator",
      subtitle: "Personalized Superfood Matcher",
    },
    {
      name: "About Us",
      link: "/about",
      subtitle: "Sustainable Farms & Heritage",
    },
    {
      name: "Contact",
      link: "/contact",
      subtitle: "Support & Wholesale Orders",
    },
  ]

  return (
    <div className="relative z-50">
      <Navbar>
        {/* Single Unified Navigation Bar */}
        <NavBody>
          <NavbarLogo />
          
          <NavItems items={navItems} />

          {/* Right Action Cluster: Order Button, Admin Button & Mobile/Sidebar Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 relative z-30 pointer-events-auto shrink-0">
            <NavbarButton
              href="https://wa.me/919500084204?text=Hi%20GOODIIZ,%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              variant="agro"
            >
              <span>Order Now</span>
            </NavbarButton>

            <Link
              href="/admin"
              className="text-goodiiz-brown/70 hover:text-goodiiz-green p-2 rounded-xl hover:bg-goodiiz-cream border border-goodiiz-gold/20 transition text-xs font-semibold flex items-center justify-center shrink-0"
              title="Admin Portal"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>

            {/* Mobile / Dropdown Toggle Button in the Top Bar */}
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            />
          </div>
        </NavBody>

        {/* Animated Dropdown Menu for Navigation Links */}
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-1 w-full">
            <div className="text-[10px] font-bold text-goodiiz-gold-light uppercase tracking-wider px-3 pb-1 flex items-center justify-between">
              <span>Navigation Menu</span>
              <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded-full text-goodiiz-gold">Quick Access</span>
            </div>
            {navItems.map((item, idx) => {
              const isAnchor = item.link.startsWith("#")
              const LinkTag = isAnchor ? "a" : Link
              return (
                <LinkTag
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition text-white group border border-white/5 hover:border-goodiiz-gold/40"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-serif font-bold text-base text-white group-hover:text-goodiiz-gold-light transition leading-tight">
                      {item.name}
                    </div>
                    <div className="text-xs text-white/80 group-hover:text-white transition mt-0.5 truncate font-normal">
                      {item.subtitle}
                    </div>
                  </div>
                  <span className="text-sm text-goodiiz-gold-light font-bold group-hover:translate-x-1 transition-transform ml-3">→</span>
                </LinkTag>
              )
            })}
          </div>
          
          <div className="flex w-full flex-col pt-3 border-t border-white/15">
            <SpecularButton
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.open('https://wa.me/919500084204?text=Hi%20GOODIIZ,%20I%20would%20like%20to%20place%20an%20order.', '_blank');
              }}
              size="md"
              radius={14}
              tint="#132e20"
              tintOpacity={0.95}
              textColor="#ffffff"
              lineColor="#fef08a"
              baseColor="#3d4f43"
              thickness={1.2}
              speed={4}
              className="w-full justify-center py-2.5 text-xs font-semibold shadow-sm"
            >
              <span className="flex items-center justify-center gap-1.5 w-full">
                <span>Order on WhatsApp</span>
                <span>→</span>
              </span>
            </SpecularButton>
          </div>
        </MobileNavMenu>
      </Navbar>
    </div>
  )
}
