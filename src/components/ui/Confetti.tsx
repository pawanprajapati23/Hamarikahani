'use client'

import React, { useEffect, useState } from 'react'

interface ConfettiProps {
  active: boolean
  duration?: number
  particleCount?: number
  colors?: string[]
}

type Particle = {
  id: number
  color: string
  shape: 'circle' | 'rectangle' | 'heart'
  x: number // end x
  y: number // end y
  rotation: number
  delay: number
  scale: number
}

const DEFAULT_COLORS = ['#f472b6', '#c084fc', '#fda4af', '#eab308', '#ffffff'] // pink-400, purple-400, rose-300, gold, white
const SHAPES = ['circle', 'rectangle', 'heart'] as const

export function Confetti({
  active,
  duration = 3000,
  particleCount = 50,
  colors = DEFAULT_COLORS,
}: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!active) return

    // Mobile check - reduce count for performance
    const isMobile = window.innerWidth < 768
    const count = isMobile ? Math.min(30, particleCount) : particleCount

    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => {
      const color = colors[Math.floor(Math.random() * colors.length)]
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
      
      // Random values for animation
      // Spread outwards from center
      const angle = Math.random() * Math.PI
      const distance = Math.random() * 80 + 20
      
      const x = (Math.random() - 0.5) * 120 // -60vw to 60vw horizontal spread
      const y = 80 + Math.random() * 40 // 80vh to 120vh vertical drop
      
      const rotation = Math.random() * 720 - 360
      const delay = Math.random() * 0.2
      const scale = 0.5 + Math.random() * 0.8

      return {
        id: i,
        color,
        shape,
        x,
        y,
        rotation,
        delay,
        scale,
      }
    })

    setParticles(newParticles)
    setIsAnimating(true)

    const timer = setTimeout(() => {
      setIsAnimating(false)
      setParticles([])
    }, duration)

    return () => clearTimeout(timer)
  }, [active, duration, particleCount, colors])

  if (!isAnimating && particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
      <style>{`
        @keyframes hk-confetti-fall {
          0% {
            transform: translate3d(0, -10vh, 0) rotate(0deg) scale(var(--scale));
            opacity: 1;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--x), var(--y), 0) rotate(var(--rotation)) scale(var(--scale));
            opacity: 0;
          }
        }
        
        .hk-confetti-particle {
          position: absolute;
          top: 0;
          left: 50%;
          animation: hk-confetti-fall forwards cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, opacity;
        }

        .hk-confetti-heart {
          width: 12px;
          height: 12px;
          background-color: var(--color);
          transform: rotate(-45deg);
        }
        .hk-confetti-heart::before,
        .hk-confetti-heart::after {
          content: '';
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: var(--color);
          border-radius: 50%;
        }
        .hk-confetti-heart::before {
          top: -6px;
          left: 0;
        }
        .hk-confetti-heart::after {
          top: 0;
          left: 6px;
        }
      `}</style>
      
      {particles.map((p) => {
        return (
          <div
            key={p.id}
            className="hk-confetti-particle"
            style={{
              '--x': `${p.x}vw`,
              '--y': `${p.y}vh`,
              '--rotation': `${p.rotation}deg`,
              '--scale': p.scale,
              '--color': p.color,
              animationDuration: `${duration - (p.delay * 1000)}ms`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties}
          >
            {p.shape === 'circle' && (
              <div style={{ backgroundColor: p.color, width: '12px', height: '12px', borderRadius: '50%' }} />
            )}
            {p.shape === 'rectangle' && (
              <div style={{ backgroundColor: p.color, width: '8px', height: '16px' }} />
            )}
            {p.shape === 'heart' && (
              <div className="hk-confetti-heart" />
            )}
          </div>
        )
      })}
    </div>
  )
}
