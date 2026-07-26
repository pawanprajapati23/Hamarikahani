"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Heart, Stars } from "lucide-react";

export function AnniversaryTemplate({ metadata }: { metadata: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const {
    coupleNames = "Rahul & Priya",
    years = "5",
    anniversaryDate = "Oct 12, 2021",
    message = "Every love story is beautiful, but ours is my favorite. Happy Anniversary!",
    timelineEvents = [],
    coverPhoto = "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2940&auto=format&fit=crop",
    musicUrl = ""
  } = metadata || {};

  return (
    <div ref={containerRef} className="w-full relative z-10 bg-slate-950 min-h-[100dvh] overflow-x-hidden text-slate-100 font-sans selection:bg-rose-500/30">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Cover Photo */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img src={coverPhoto} alt="Couple" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950" />
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0, scale: Math.random() * 0.5 + 0.5 }}
              animate={{ 
                y: "-10vh", 
                opacity: [0, 0.8, 0],
              }}
              transition={{ 
                duration: 10 + Math.random() * 10, 
                repeat: Infinity, 
                delay: Math.random() * 5,
                ease: "linear"
              }}
              className="absolute text-rose-500/30"
            >
              <Heart className="w-6 h-6 fill-current" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="relative z-20 flex flex-col items-center text-center px-4 mt-20"
        >
          <span className="text-rose-400 font-medium tracking-[0.3em] uppercase text-sm mb-6 flex items-center gap-2">
            <Stars className="w-4 h-4" /> Happy Anniversary <Stars className="w-4 h-4" />
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-playfair font-bold text-white mb-6 drop-shadow-[0_0_30px_rgba(244,63,94,0.3)]">
            {coupleNames}
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-medium tracking-widest uppercase border-t border-b border-rose-500/30 py-3 px-8">
            Celebrating {years} Years of Love
          </p>
          <p className="text-sm text-slate-400 mt-6 tracking-[0.2em] uppercase">
            {anniversaryDate}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-20"
        >
          <p className="text-[10px] text-rose-400 uppercase tracking-[0.3em] mb-3">Our Story</p>
          <div className="w-px h-16 bg-gradient-to-b from-rose-500 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Message Section */}
      <section className="relative w-full py-32 px-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-3xl text-center space-y-8"
        >
          <Heart className="w-10 h-10 text-rose-500/50 mx-auto fill-current" />
          <p className="text-2xl sm:text-3xl md:text-4xl font-playfair italic leading-relaxed text-slate-200">
            "{message}"
          </p>
          <Heart className="w-10 h-10 text-rose-500/50 mx-auto fill-current rotate-180" />
        </motion.div>
      </section>

      {/* 3. The Journey (Photo Gallery / Timeline) */}
      {timelineEvents && timelineEvents.length > 0 && (
        <section className="relative w-full py-24 px-4 bg-slate-950">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4">Our Journey</h2>
              <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full" />
            </motion.div>
            
            <div className="space-y-32">
              {timelineEvents.map((event: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col md:flex-row items-center gap-10 lg:gap-20 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="w-full md:w-1/2 relative group">
                    <div className="absolute inset-0 bg-rose-500/20 transform rotate-3 rounded-3xl transition-transform duration-500 group-hover:rotate-6" />
                    <div className="absolute inset-0 bg-slate-800 transform -rotate-2 rounded-3xl transition-transform duration-500 group-hover:-rotate-4" />
                    <img 
                      src={event.image || coverPhoto} 
                      alt={event.title} 
                      className="relative w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className={`w-full md:w-1/2 space-y-6 text-center md:text-left ${idx % 2 === 1 ? 'md:text-right' : ''}`}>
                    <h3 className="text-6xl md:text-8xl font-playfair font-bold text-slate-800">
                      {event.year}
                    </h3>
                    <h4 className="text-3xl md:text-4xl font-bold text-white">
                      {event.title}
                    </h4>
                    <div className={`w-12 h-1 bg-rose-500 ${idx % 2 === 1 ? 'ml-auto md:ml-auto md:mr-0' : 'mx-auto md:mx-0'}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <section className="h-[50dvh] w-full flex flex-col items-center justify-center relative bg-slate-950 pb-20 mt-20">
        <Heart className="w-16 h-16 text-rose-500 fill-current animate-pulse mb-8 opacity-50" />
        <h4 className="text-4xl md:text-6xl font-playfair italic font-bold text-white drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">
          Forever & Always
        </h4>
        <p className="mt-4 text-slate-400 tracking-widest uppercase text-sm">
          {coupleNames}
        </p>
      </section>

      <BackgroundMusic url={musicUrl} />
    </div>
  );
}
