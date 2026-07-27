"use client";

import { useEffect, useState } from "react";

type ParticleType = "heart" | "sparkle" | "star" | "orb";

interface Particle {
  id: number;
  type: ParticleType;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  rotation: number;
  opacity: number;
  colorClass: string;
}

const HEART_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
  </svg>
);

const SPARKLE_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
  </svg>
);

const STAR_SVG = (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

export function FloatingHearts() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Determine particle count based on screen size
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const totalParticles = isMobile ? 12 : 20;

    const generateParticle = (id: number): Particle => {
      // Determine type probabilities
      const randType = Math.random();
      let type: ParticleType = "heart";
      if (randType > 0.4 && randType <= 0.7) type = "sparkle";
      else if (randType > 0.7 && randType <= 0.85) type = "star";
      else if (randType > 0.85) type = "orb";

      let size = 8;
      let opacity = 0.2;
      let colorClass = "text-pink-300";

      // Configure based on type
      if (type === "heart") {
        size = 8 + Math.random() * 8; // 8-16px
        opacity = 0.15 + Math.random() * 0.1; // 0.15-0.25
        colorClass = Math.random() > 0.5 ? "text-pink-400" : "text-rose-400";
      } else if (type === "sparkle") {
        size = 4 + Math.random() * 4; // 4-8px
        opacity = 0.3 + Math.random() * 0.2; // 0.3-0.5
        colorClass = Math.random() > 0.5 ? "text-amber-200" : "text-white";
      } else if (type === "star") {
        size = 6 + Math.random() * 6; // 6-12px
        opacity = 0.2 + Math.random() * 0.2; // 0.2-0.4
        colorClass = "text-purple-300";
      } else if (type === "orb") {
        size = 12 + Math.random() * 16; // 12-28px
        opacity = 0.1 + Math.random() * 0.15; // 0.1-0.25
        colorClass = Math.random() > 0.5 ? "bg-pink-300" : "bg-purple-300";
      }

      return {
        id,
        type,
        left: Math.random() * 100, // 0-100%
        size,
        delay: Math.random() * -20, // Start some immediately at different phases
        duration: 15 + Math.random() * 15, // 15-30s cycle
        drift: -50 + Math.random() * 100, // -50px to 50px drift
        rotation: type === "orb" ? 0 : -180 + Math.random() * 360,
        opacity,
        colorClass,
      };
    };

    const newParticles = Array.from({ length: totalParticles }).map((_, i) =>
      generateParticle(i)
    );

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden contain-layout">
      <style>{`
        @keyframes hk-ambient-float {
          0% {
            transform: translateY(10vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--hk-particle-opacity, 0.3);
          }
          90% {
            opacity: var(--hk-particle-opacity, 0.3);
          }
          100% {
            transform: translateY(-120vh) translateX(var(--hk-particle-drift, 50px)) rotate(var(--hk-particle-rotation, 360deg));
            opacity: 0;
          }
        }
        .hk-particle-animate {
          animation: hk-ambient-float var(--hk-particle-duration, 20s) linear infinite;
          animation-delay: var(--hk-particle-delay, 0s);
          will-change: transform;
        }
      `}</style>

      {particles.map((p) => {
        const isOrb = p.type === "orb";
        return (
          <div
            key={p.id}
            className={`absolute bottom-[-50px] hk-particle-animate ${
              isOrb ? `rounded-full blur-md ${p.colorClass}` : p.colorClass
            }`}
            style={
              {
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                "--hk-particle-opacity": p.opacity,
                "--hk-particle-drift": `${p.drift}px`,
                "--hk-particle-rotation": `${p.rotation}deg`,
                "--hk-particle-duration": `${p.duration}s`,
                "--hk-particle-delay": `${p.delay}s`,
              } as React.CSSProperties
            }
          >
            {!isOrb && (
              <div style={{ width: "100%", height: "100%" }}>
                {p.type === "heart" && HEART_SVG}
                {p.type === "sparkle" && SPARKLE_SVG}
                {p.type === "star" && STAR_SVG}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
