"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";

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
  
  // Theme styling based on cardColor
  const themeColor = cardColor.replace("bg-", "");
  const textColor = cardColor.replace("bg-", "text-");

  return (
    <div ref={containerRef} className="min-h-[100dvh] w-full relative bg-slate-950 overflow-hidden font-sans text-slate-100">
      
      {/* Step 1: Unopened Gift */}
      <AnimatePresence mode="wait">
        {!opened && (
          <motion.div
            key="unopened"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950"
            onClick={() => setOpened(true)}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />
            <motion.div
              animate={{ y: [0, -15, 0], scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="cursor-pointer relative z-10"
            >
              <img 
                src={giftGif} 
                alt="Tap to open gift" 
                className="w-72 h-72 object-contain drop-shadow-[0_0_40px_rgba(244,63,94,0.4)]"
              />
            </motion.div>
            <motion.h2 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-2xl sm:text-3xl font-playfair text-white mt-8 tracking-widest uppercase cursor-pointer relative z-10"
            >
              Tap to Open
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: The Main Experience */}
      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
        >
          {/* Section 1: Hero */}
          <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative snap-center px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0 }}
                  animate={{ 
                    y: "-10vh", 
                    x: (Math.random() * 100) + "vw", 
                    opacity: [0, 1, 1, 0],
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: 5 + Math.random() * 5, 
                    repeat: Infinity, 
                    delay: Math.random() * 5,
                    ease: "linear"
                  }}
                  className="absolute text-2xl sm:text-4xl"
                >
                  {["🎈", "✨", "🎉", "🌟"][i % 4]}
                </motion.div>
              ))}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] ${cardColor} opacity-20 blur-[120px] rounded-full`} />
            </div>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="relative z-10 flex flex-col items-center text-center space-y-8"
            >
              <motion.img 
                src={cakeGif} 
                alt="Birthday Cake" 
                className={`w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full shadow-[0_0_60px_rgba(0,0,0,0.5)] border-4 border-white/10`}
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              
              <div className="space-y-4">
                <p className="text-sm sm:text-base tracking-[0.3em] uppercase text-slate-400 font-semibold">
                  Celebrating You
                </p>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-playfair font-bold text-white leading-tight drop-shadow-2xl">
                  Happy <br className="sm:hidden" /> Birthday
                </h1>
                <h2 className={`text-4xl sm:text-6xl font-playfair italic ${textColor} font-bold mt-2 drop-shadow-lg`}>
                  {birthdayName}
                </h2>
                
                {birthdayAge && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    className={`inline-block mt-6 px-6 py-2 rounded-full ${cardColor} text-white font-bold text-lg sm:text-xl tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.2)]`}
                  >
                    Turning {birthdayAge}
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-70"
            >
              <p className="text-xs uppercase tracking-widest mb-2">Scroll</p>
              <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
          </section>

          {/* Section 2: The Message */}
          <section className="min-h-[100dvh] w-full flex items-center justify-center relative snap-center px-6 py-20">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1 }}
              className="relative z-10 max-w-2xl text-center space-y-10"
            >
              <span className={`text-6xl font-serif ${textColor} opacity-50 block leading-none`}>"</span>
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair leading-relaxed text-slate-200 drop-shadow-md px-4">
                {customMessage}
              </p>
              <span className={`text-6xl font-serif ${textColor} opacity-50 block leading-none rotate-180`}>"</span>
            </motion.div>
          </section>

          {/* Section 3: Memories (Photo Gallery) */}
          {photos.length > 0 && (
            <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative snap-center px-4 py-20 bg-slate-950">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h3 className={`text-3xl sm:text-5xl font-playfair font-bold ${textColor} mb-4`}>Beautiful Memories</h3>
                <p className="text-slate-400 tracking-widest uppercase text-sm">Moments we cherish</p>
              </motion.div>

              <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 px-4">
                {photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, rotate: Math.random() * 10 - 5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: Math.random() * 6 - 3 }}
                    whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative group aspect-square rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10"
                  >
                    <img 
                      src={photo} 
                      alt={`Memory ${index + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Footer */}
          <section className="h-[40dvh] w-full flex flex-col items-center justify-center relative snap-center bg-slate-950 pb-20">
            <h4 className={`text-4xl md:text-6xl font-playfair italic font-bold ${textColor} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
              Happy Birthday!
            </h4>
            <div className="mt-8 flex gap-4">
              <span className="text-2xl animate-bounce" style={{ animationDelay: "0ms" }}>🎉</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: "150ms" }}>🎂</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: "300ms" }}>🥂</span>
            </div>
          </section>

        </motion.div>
      )}

      {musicUrl && opened && <BackgroundMusic url={musicUrl} />}
    </div>
  );
}
