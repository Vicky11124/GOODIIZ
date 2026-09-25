'use client'

import React, { useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import './MagicProductCard.css'

interface MagicProductCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  glowColor?: string // RGB values e.g. "230, 161, 59"
  enableStars?: boolean
  enableBorderGlow?: boolean
  enableTilt?: boolean
  enableMagnetism?: boolean
  clickEffect?: boolean
  particleCount?: number
  spotlightRadius?: number
}

const DEFAULT_GLOW_COLOR = '230, 161, 59' // Luxury Gold
const DEFAULT_PARTICLE_COUNT = 10
const DEFAULT_SPOTLIGHT_RADIUS = 260

const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div')
  el.className = 'magic-gold-particle'
  el.style.left = `${x}px`
  el.style.top = `${y}px`
  return el
}

export default function MagicProductCard({
  children,
  className = '',
  style,
  glowColor = DEFAULT_GLOW_COLOR,
  enableStars = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = false,
  clickEffect = true,
  particleCount = DEFAULT_PARTICLE_COUNT,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
}: MagicProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLElement[]>([])
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const isHoveredRef = useRef(false)
  const memoizedParticles = useRef<HTMLElement[]>([])
  const particlesInitialized = useRef(false)

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return
    const { width, height } = cardRef.current.getBoundingClientRect()
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * (width || 300), Math.random() * (height || 400), glowColor)
    )
    particlesInitialized.current = true
  }, [particleCount, glowColor])

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle)
        },
      })
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current || !enableStars) return

    if (!particlesInitialized.current) {
      initializeParticles()
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return

        const clone = particle.cloneNode(true) as HTMLElement
        cardRef.current.appendChild(clone)
        particlesRef.current.push(clone)

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' }
        )

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        })

        gsap.to(clone, {
          opacity: 0.2,
          duration: 1.2,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        })
      }, index * 120)

      timeoutsRef.current.push(timeoutId)
    })
  }, [initializeParticles, enableStars])

  useEffect(() => {
    const element = cardRef.current
    if (!element) return

    // Mobile check
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return
    }

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      animateParticles()

      if (enableBorderGlow) {
        element.style.setProperty('--glow-intensity', '1')
        element.style.setProperty('--glow-radius', `${spotlightRadius}px`)
      }
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      clearAllParticles()

      if (enableBorderGlow) {
        element.style.setProperty('--glow-intensity', '0')
      }

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      if (enableBorderGlow) {
        const relativeX = (x / rect.width) * 100
        const relativeY = (y / rect.height) * 100
        element.style.setProperty('--glow-x', `${relativeX}%`)
        element.style.setProperty('--glow-y', `${relativeY}%`)
        element.style.setProperty('--glow-intensity', '1')
      }

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -6
        const rotateY = ((x - centerX) / centerX) * 6

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.15,
          ease: 'power2.out',
          transformPerspective: 900,
        })
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.03
        const magnetY = (y - centerY) * 0.03

        gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.25,
          ease: 'power2.out',
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return
      // Ignore click ripple if clicking inside interactive buttons or links
      const target = e.target as HTMLElement
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        return
      }

      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      )

      const ripple = document.createElement('div')
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.35) 0%, rgba(${glowColor}, 0.15) 35%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 50;
      `

      element.appendChild(ripple)

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        }
      )
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('click', handleClick)

    return () => {
      isHoveredRef.current = false
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('click', handleClick)
      clearAllParticles()
    }
  }, [animateParticles, clearAllParticles, enableBorderGlow, enableTilt, enableMagnetism, clickEffect, glowColor, spotlightRadius])

  const borderGlowClass = enableBorderGlow ? 'magic-product-card--border-glow' : ''

  return (
    <div
      ref={cardRef}
      className={`magic-product-card ${borderGlowClass} ${className}`}
      style={{
        ...style,
        ['--glow-color' as any]: glowColor,
      }}
    >
      {children}
    </div>
  )
}
