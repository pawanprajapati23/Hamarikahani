"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Heart, Sparkles, Quote } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function MissYouTemplate({ metadata }: { metadata: any }) {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMounted(true);
    // Generate particles only on the client to avoid hydration mismatch
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setParticles(newParticles);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const {
    recipientName = "My Love",
    senderName = "Me",
    message = "Days feel so long without you. I miss you more than words can say.",
    photos = [
      "https://images.unsplash.com/photo-1516239482977-b550ba7253f2?q=80&w=2940&auto=format&fit=crop"
    ],
    musicUrl = ""
  } = metadata || {};

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="min-h-[100dvh] w-full relative bg-[#02000a] overflow-hidden font-sans selection:bg-rose-500/30"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shooting-star {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
          100% { transform: translateX(-1000px) translateY(1000px) rotate(-45deg); opacity: 0; }
        }
        .star-streak {
          position: absolute;
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
          border-radius: 50%;
          filter: drop-shadow(0 0 6px rgba(255,255,255,1));
          animation: shooting-star 4s linear infinite;
        }
        .star-1 { top: 10%; right: 10%; animation-delay: 2s; }
        .star-2 { top: -10%; right: 30%; animation-delay: 7s; }
        .star-3 { top: 40%; right: -5%; animation-delay: 13s; }
      `}} />

      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(10,15,40,1)_0%,_rgba(2,0,10,1)_100%)]" />
        
        {/* Pulsing Blobs */}
        <motion.div 
          animate={{ 
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/40 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.25, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-rose-900/30 blur-[150px]"
        />

        {/* Shooting Stars */}
        <div className="star-streak star-1" />
        <div className="star-streak star-2" />
        <div className="star-streak star-3" />
        
        {/* Floating dust/stars particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              y: p.y,
              x: p.x,
              opacity: p.opacity
            }}
            animate={{ 
              y: [p.y, p.y - 100, p.y],
              x: [p.x, p.x + 50, p.x],
              opacity: [p.opacity, p.opacity * 1.5, p.opacity]
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-blue-100/40 rounded-full"
            style={{ filter: 'blur(1px)' }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-24 md:py-32 flex flex-col items-center">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center w-full max-w-3xl mb-24"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            className="w-20 h-20 mx-auto mb-10 rounded-full bg-gradient-to-tr from-rose-500/20 to-indigo-500/20 border border-white/20 flex items-center justify-center backdrop-blur-md shadow-[0_0_40px_rgba(244,63,94,0.3)]"
          >
            <Heart className="w-8 h-8 text-rose-300 fill-rose-400/40 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-8 tracking-tight">
            Dear {recipientName},
          </h1>
          
          <div className="relative py-8 px-4 sm:px-8">
            <Quote className="absolute top-0 left-0 -translate-x-2 sm:-translate-x-1/2 w-10 h-10 sm:w-16 sm:h-16 text-white/10 rotate-180" />
            <p className="text-xl sm:text-2xl md:text-4xl font-playfair text-white/90 leading-loose italic font-light z-10 relative px-4">
              {message}
            </p>
            <Quote className="absolute bottom-0 right-0 translate-x-2 sm:translate-x-1/2 w-10 h-10 sm:w-16 sm:h-16 text-white/10" />
          </div>

          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "150px" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-rose-400/60 to-transparent mx-auto mt-16 mb-8"
          />
          
          <p className="text-base sm:text-lg md:text-xl font-light tracking-[0.2em] text-white/60 uppercase">
            Always yours, <span className="text-rose-300 font-medium">{senderName}</span>
          </p>
        </motion.div>

        {/* Masonry Gallery Section */}
        {photos && photos.length > 0 && (
          <div className="w-full mt-10 pb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex items-center justify-center gap-4 mb-12 sm:mb-16"
            >
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20" />
              <div className="flex items-center gap-3 px-4">
                <Sparkles className="w-5 h-5 text-rose-300/70" />
                <h3 className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/60 font-medium">Our Memories</h3>
                <Sparkles className="w-5 h-5 text-rose-300/70" />
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20" />
            </motion.div>

            <div className={`columns-1 sm:columns-2 ${photos.length > 2 ? 'lg:columns-3' : ''} gap-6 space-y-6`}>
              {photos.map((photo: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  className="relative group break-inside-avoid rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 p-2 sm:p-3 shadow-2xl backdrop-blur-md"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-black/40">
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />
                    <motion.img 
                      src={photo} 
                      alt={`Memory ${idx + 1}`}
                      className="w-full h-auto object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                    {/* Glass reflection sweep overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full ease-in-out z-20 pointer-events-none delay-100" style={{ transitionDuration: '1000ms' }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Ending Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="mt-20 pt-20 pb-32 flex flex-col items-center justify-center text-center relative w-full"
        >
          {/* Subtle sunrise gradient at the very bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-rose-900/20 via-indigo-900/10 to-transparent pointer-events-none rounded-b-full blur-2xl" />
          
          <h2 className="text-3xl sm:text-5xl font-playfair italic text-white/70 mb-8 relative z-10">
            Until we meet again
          </h2>
          
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Heart className="w-8 h-8 text-rose-400 fill-rose-500/30" />
          </motion.div>
        </motion.div>
      </div>

      <BackgroundMusic url={musicUrl} />
    </div>
  );
}
