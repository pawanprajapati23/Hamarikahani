"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Heart, Sparkles, Smile, Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Confetti } from "@/components/ui/Confetti";

export interface FriendshipMetadata {
  friendName?: string;
  message?: string;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  photo4?: string;
  musicUrl?: string;
}

export function FriendshipTemplate({ metadata }: { metadata: FriendshipMetadata }) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const {
    friendName = "Bestie",
    message = "Thanks for being the friend I can always count on. You make everything so much fun!",
    photo1 = "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2938&auto=format&fit=crop",
    photo2 = "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2940&auto=format&fit=crop",
    photo3 = "https://images.unsplash.com/photo-1544483733-4f932e6ee545?q=80&w=2938&auto=format&fit=crop",
    photo4 = "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2835&auto=format&fit=crop",
    musicUrl = ""
  } = metadata || {};

  const photos = [photo1, photo2, photo3, photo4].filter(Boolean);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="min-h-[100dvh] w-full relative bg-amber-50 overflow-x-hidden font-sans selection:bg-orange-400/30 text-slate-800"
    >
      {/* Background Gradients */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 z-0 pointer-events-none opacity-60"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-300/40 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-300/30 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[70%] h-[50%] rounded-full bg-yellow-300/40 blur-[130px]" />
      </motion.div>

      {/* Decorative background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bg-star-${i}`}
            initial={{ opacity: 0.2, scale: Math.random() * 0.5 + 0.5 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.8 + 0.8, Math.random() * 0.5 + 0.5]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            className="absolute text-orange-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            ★
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Scene 1: Fun Intro */}
        <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-5 py-20 relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.6, duration: 1 }}
            className="relative mb-12"
          >
            <div className="text-6xl sm:text-7xl md:text-8xl flex gap-4">
              <motion.span animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0 }}>🎉</motion.span>
              <motion.span animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}>🤝</motion.span>
              <motion.span animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}>❤️</motion.span>
              <motion.span animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>😂</motion.span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-orange-600 mb-4 tracking-widest uppercase">
              To My Best Friend
            </h2>
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 mb-8 leading-tight drop-shadow-sm">
              {friendName}
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 animate-bounce"
          >
            <div className="w-8 h-12 rounded-full border-2 border-orange-400/50 flex justify-center pt-2">
              <div className="w-2 h-2 rounded-full bg-orange-400/80" />
            </div>
          </motion.div>
        </section>

        {/* Scene 2: The Message */}
        <section className="min-h-[80dvh] w-full max-w-4xl px-5 sm:px-8 py-20 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
            className="w-full relative group"
          >
            {/* Playful decorations */}
            <div className="absolute -top-8 -left-8 text-4xl group-hover:rotate-12 transition-transform duration-300">✨</div>
            <div className="absolute -bottom-8 -right-8 text-4xl group-hover:-rotate-12 transition-transform duration-300">🎈</div>
            
            <div className="bg-white/60 backdrop-blur-xl border-2 border-white/80 shadow-xl rounded-[2.5rem] p-8 sm:p-12 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-pink-100/50" />
              
              <div className="relative z-10">
                <Quote className="w-12 h-12 text-pink-300 mb-6 opacity-60" />
                <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-slate-700 leading-relaxed">
                  {message}
                </p>
                <div className="mt-10 flex items-center justify-end gap-3 text-orange-500 font-bold text-xl">
                  <Smile className="w-8 h-8" />
                  <span>Always!</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Scene 3: Photo Memories */}
        {photos.length > 0 && (
          <section className="w-full max-w-6xl px-5 py-24 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 mb-4 inline-block relative">
                Our Crazy Adventures
                <motion.div
                  className="absolute -right-12 -top-6 text-yellow-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-10 h-10 fill-current" />
                </motion.div>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 w-full place-items-center">
              {photos.map((photo, idx) => {
                // Alternating tilt for polaroids
                const rotation = idx % 2 === 0 ? -3 : 4;
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50, rotate: rotation > 0 ? 10 : -10 }}
                    whileInView={{ opacity: 1, y: 0, rotate: rotation }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ 
                      scale: 1.05, 
                      rotate: 0, 
                      zIndex: 10,
                      transition: { type: "spring", bounce: 0.5 }
                    }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="w-full max-w-md bg-white p-4 pb-16 sm:p-5 sm:pb-20 shadow-2xl rounded-sm border border-slate-200 relative"
                  >
                    <div className="w-full aspect-[4/5] sm:aspect-square overflow-hidden bg-slate-100">
                      <img 
                        src={photo} 
                        alt={`Friendship memory ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Tape effect */}
                    <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm rotate-2 opacity-80" />
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Scene 4: Grand Finale */}
        <section className="min-h-[70dvh] w-full flex flex-col items-center justify-center relative overflow-hidden px-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="text-center z-10"
          >
            <h2 className="text-6xl sm:text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 drop-shadow-md mb-8">
              Friends Forever
            </h2>
            <div className="flex justify-center gap-4 text-4xl sm:text-6xl">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>💖</motion.div>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}>🤞</motion.div>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}>🌟</motion.div>
            </div>
          </motion.div>

          <Confetti 
            className="absolute inset-0 z-0"
            duration={5000}
            particleCount={250}
          />
        </section>
      </div>

      <BackgroundMusic url={musicUrl} />
    </div>
  );
}

function Quote(props: React.ComponentProps<"svg">) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
    </svg>
  );
}
