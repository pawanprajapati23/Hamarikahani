"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Sparkles, Gift, Heart, Stars } from "lucide-react";

export function BirthdayTemplate({ metadata }: { metadata: any }) {
  const [opened, setOpened] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const {
    birthdayName = "My Friend",
    birthdayAge = "",
    customMessage = "Wishing you a lifetime of happiness, joy, and endless surprises! Have a wonderful day!",
    giftGif = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjUzYzZhMzBiMmQ5MGI2YTkzMzE2YmY2MTI2MzcxYzcxZmE1ZGU3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRv0ThflsHCqDrG/giphy.gif",
    cakeGif = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTNjOWUzNGMwMDRkNWJjZGRiZjZhNDZmNjUyZWEzMmQyMTA1NWFmZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LMB3W50H8y5GOO1hg/giphy.gif",
    cardColor = "bg-rose-500",
    photo1,
    photo2,
    photo3,
    photo4,
    musicUrl
  } = metadata || {};

  const photos = [photo1, photo2, photo3, photo4].filter(Boolean);
  
  // Base luxury colors
  const bgColor = "bg-slate-950";
  const accentGradient = "from-rose-500 via-purple-500 to-pink-500";

  return (
    <div ref={containerRef} className={`min-h-[100dvh] w-full relative ${bgColor} overflow-hidden font-sans text-slate-100 selection:bg-rose-500/30`}>
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/30 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-600/30 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Step 1: Unopened Gift */}
      <AnimatePresence mode="wait">
        {!opened && (
          <motion.div
            key="unopened"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-3xl"
            onClick={() => setOpened(true)}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
            
            <motion.div
              animate={{ y: [0, -15, 0], scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="cursor-pointer relative z-10 group"
            >
              <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full scale-150 group-hover:scale-110 transition-transform duration-700" />
              <img 
                src={giftGif} 
                alt="Tap to open gift" 
                className="w-72 h-72 sm:w-96 sm:h-96 object-contain relative z-10 drop-shadow-[0_0_50px_rgba(244,63,94,0.5)]"
              />
            </motion.div>
            
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-12 flex flex-col items-center gap-4 cursor-pointer relative z-10"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <h2 className="text-2xl sm:text-4xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-white tracking-[0.2em] uppercase">
                  Tap to Reveal
                </h2>
                <Sparkles className="w-5 h-5 text-rose-400" />
              </div>
              <p className="text-sm text-slate-400 tracking-widest uppercase font-light">A special gift awaits</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: The Main Experience */}
      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="relative z-10 h-full w-full"
        >
          {/* Section 1: Hero */}
          <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative px-4">
            
            <motion.div 
              initial={{ y: 80, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col items-center text-center space-y-10 w-full max-w-4xl mx-auto"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-500 blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 rounded-full scale-150" />
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="relative p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl"
                >
                  <img 
                    src={cakeGif} 
                    alt="Birthday Cake" 
                    className="w-48 h-48 sm:w-72 sm:h-72 object-cover rounded-full"
                  />
                </motion.div>
              </div>
              
              <div className="space-y-6 flex flex-col items-center">
                <div className="flex items-center gap-3 text-rose-300">
                  <Stars className="w-4 h-4" />
                  <p className="text-sm sm:text-base tracking-[0.4em] uppercase font-semibold">
                    A Day To Remember
                  </p>
                  <Stars className="w-4 h-4" />
                </div>
                
                <h1 className="text-6xl sm:text-8xl md:text-9xl font-playfair font-bold text-white leading-[1.1] drop-shadow-2xl">
                  Happy <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">
                    Birthday
                  </span>
                </h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="relative px-10 py-4 mt-4"
                >
                  <div className="absolute inset-0 border-t border-b border-white/20" />
                  <h2 className="text-4xl sm:text-6xl font-playfair italic text-white/90 font-light tracking-wide">
                    {birthdayName}
                  </h2>
                </motion.div>
                
                {birthdayAge && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="mt-8 relative inline-flex group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500" />
                    <div className="relative px-8 py-3 bg-slate-950/80 backdrop-blur-md rounded-full border border-white/10 text-white font-bold text-lg sm:text-xl tracking-widest uppercase flex items-center gap-2">
                      <Gift className="w-5 h-5 text-rose-400" />
                      Turning {birthdayAge}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-70"
            >
              <p className="text-[10px] text-white/50 uppercase tracking-[0.4em] mb-4">Discover</p>
              <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>
          </section>

          {/* Section 2: The Message */}
          <section className="min-h-[100dvh] w-full flex items-center justify-center relative px-6 py-32 overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-3xl border-y border-white/5" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-w-4xl text-center space-y-12 p-10 md:p-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-950 p-4 rounded-full border border-white/10">
                <Heart className="w-8 h-8 text-rose-500 fill-current" />
              </div>
              
              <p className="text-2xl sm:text-3xl md:text-5xl font-playfair leading-[1.6] text-white/90 font-light drop-shadow-md">
                "{customMessage}"
              </p>
              
              <div className="flex justify-center gap-4 pt-8 border-t border-white/10">
                <Sparkles className="w-6 h-6 text-rose-400/50" />
                <Sparkles className="w-6 h-6 text-purple-400/50" />
                <Sparkles className="w-6 h-6 text-pink-400/50" />
              </div>
            </motion.div>
          </section>

          {/* Section 3: Memories (3D Polaroid Gallery) */}
          {photos.length > 0 && (
            <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative px-4 py-32">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-center mb-24 space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                  <Stars className="w-4 h-4 text-rose-400" />
                  <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold">Treasured Moments</span>
                </div>
                <h3 className="text-5xl sm:text-7xl font-playfair font-bold text-white drop-shadow-2xl">
                  A Beautiful Journey
                </h3>
              </motion.div>

              <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 px-4 perspective-1000">
                {photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 100, rotateY: index % 2 === 0 ? 15 : -15, rotateZ: Math.random() * 10 - 5 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0, rotateZ: Math.random() * 4 - 2 }}
                    whileHover={{ scale: 1.05, rotateZ: 0, rotateY: 0, zIndex: 50 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="relative group p-4 sm:p-6 bg-white rounded-2xl shadow-2xl transform-style-3d cursor-pointer"
                  >
                    <div className="relative aspect-square sm:aspect-[4/5] rounded-xl overflow-hidden shadow-inner">
                      <img 
                        src={photo} 
                        alt={`Memory ${index + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="h-16 flex items-center justify-center font-caveat text-2xl sm:text-3xl text-slate-800 opacity-80 pt-4">
                      Memory {index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Footer */}
          <section className="h-[60dvh] w-full flex flex-col items-center justify-center relative bg-slate-950 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 to-transparent" />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, type: "spring" }}
              className="relative z-10 flex flex-col items-center"
            >
              <h4 className="text-6xl md:text-8xl font-playfair italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-rose-200 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Happy Birthday
              </h4>
              <p className="mt-8 text-rose-300 tracking-[0.5em] uppercase text-sm font-semibold">
                To Many More
              </p>
            </motion.div>
          </section>

        </motion.div>
      )}

      {musicUrl && opened && <BackgroundMusic url={musicUrl} />}
    </div>
  );
}
