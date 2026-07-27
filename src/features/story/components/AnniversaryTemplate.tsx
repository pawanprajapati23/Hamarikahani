"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Heart, Stars, Sparkles, Map } from "lucide-react";

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
      
      {/* Cinematic Background Particles */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0, scale: Math.random() * 0.5 + 0.3 }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.5, 0],
            }}
            transition={{ 
              duration: 15 + Math.random() * 15, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute text-rose-500/20"
          >
            <Sparkles className="w-8 h-8 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* 1. Hero Section - Cinematic Cover */}
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
        
        {/* Parallax Cover Photo */}
        <motion.div 
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img src={coverPhoto} alt="Couple" className="w-full h-full object-cover" />
          {/* Advanced Gradients for Premium Look */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/50 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
        </motion.div>

        {/* Hero Content - Glassmorphic Container */}
        <motion.div 
          initial={{ y: 50, opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ y: 0, opacity: 1, backdropFilter: "blur(12px)" }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="relative z-20 flex flex-col items-center text-center px-10 py-16 rounded-[3rem] bg-white/5 border border-white/10 shadow-2xl max-w-4xl mx-4 mt-20"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-rose-500/20 border border-rose-500/30 rounded-full backdrop-blur-md flex items-center gap-2">
            <Stars className="w-4 h-4 text-rose-300" /> 
            <span className="text-rose-200 text-xs font-semibold tracking-[0.3em] uppercase">Happy Anniversary</span>
            <Stars className="w-4 h-4 text-rose-300" />
          </div>

          <h1 className="text-6xl sm:text-8xl md:text-9xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-rose-100 to-rose-300 mb-8 drop-shadow-[0_0_40px_rgba(244,63,94,0.3)]">
            {coupleNames}
          </h1>
          
          <div className="flex items-center gap-4 w-full justify-center opacity-80">
            <div className="h-px bg-gradient-to-r from-transparent to-rose-300 flex-1 max-w-[100px]" />
            <p className="text-lg sm:text-xl text-rose-100 font-medium tracking-[0.4em] uppercase">
              {years} Years of Love
            </p>
            <div className="h-px bg-gradient-to-l from-transparent to-rose-300 flex-1 max-w-[100px]" />
          </div>
          
          <p className="text-sm text-slate-400 mt-8 tracking-[0.3em] uppercase bg-white/5 px-6 py-2 rounded-full border border-white/5">
            {anniversaryDate}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-20 opacity-70"
        >
          <p className="text-[10px] text-rose-300 uppercase tracking-[0.4em] mb-4">Our Story</p>
          <div className="w-px h-16 bg-gradient-to-b from-rose-400 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Message Section - Elegant Quote */}
      <section className="relative w-full py-40 px-6 flex items-center justify-center overflow-hidden">
        {/* Abstract Glows */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-rose-600/20 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-purple-600/20 blur-[150px] rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
          className="relative z-10 max-w-4xl text-center space-y-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Heart className="w-12 h-12 text-rose-500 mx-auto fill-current drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]" />
          </motion.div>
          
          <p className="text-3xl sm:text-4xl md:text-5xl font-playfair italic leading-[1.6] text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 px-4">
            "{message}"
          </p>
          
          <div className="flex justify-center gap-3 opacity-50">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <div className="w-2 h-2 rounded-full bg-rose-500" />
          </div>
        </motion.div>
      </section>

      {/* 3. The Journey (Glassmorphic Timeline) */}
      {timelineEvents && timelineEvents.length > 0 && (
        <section className="relative w-full py-32 px-4">
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-center mb-32 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                <Map className="w-4 h-4 text-indigo-400" />
                <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold">Our Timeline</span>
              </div>
              <h2 className="text-5xl sm:text-7xl font-playfair font-bold text-white drop-shadow-2xl">
                The Beautiful Journey
              </h2>
            </motion.div>
            
            <div className="space-y-40 relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-rose-500/50 before:to-transparent">
              {timelineEvents.map((event: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                  className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-5 md:left-1/2 w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.8)] transform -translate-x-1/2 md:translate-x-[-50%]" />
                  
                  {/* Content Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-16 md:ml-0">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl transition-transform duration-500 hover:scale-[1.02] hover:bg-white/10 group-hover:border-rose-500/30">
                      
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-1/2 relative">
                          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                          <img 
                            src={event.image || coverPhoto} 
                            alt={event.title} 
                            className="relative w-full aspect-[4/5] object-cover rounded-2xl shadow-xl z-10"
                          />
                        </div>

                        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                          <div className="inline-block px-4 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold text-xl tracking-widest border border-rose-500/30">
                            {event.year}
                          </div>
                          <h4 className="text-3xl sm:text-4xl font-playfair font-bold text-white">
                            {event.title}
                          </h4>
                          <div className="w-12 h-1 bg-gradient-to-r from-rose-500 to-transparent mx-auto md:mx-0 rounded-full" />
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer - Elegant Finish */}
      <section className="h-[60dvh] w-full flex flex-col items-center justify-center relative bg-slate-950 pb-20 mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-rose-950/30 to-transparent pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <Heart className="w-20 h-20 text-rose-500 fill-current animate-pulse mb-10 opacity-70 drop-shadow-[0_0_30px_rgba(244,63,94,0.6)]" />
          <h4 className="text-5xl md:text-7xl font-playfair italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-rose-200 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Forever & Always
          </h4>
          <div className="mt-8 flex items-center gap-6">
            <div className="w-12 h-px bg-slate-600" />
            <p className="text-slate-300 tracking-[0.5em] uppercase text-sm font-semibold">
              {coupleNames}
            </p>
            <div className="w-12 h-px bg-slate-600" />
          </div>
        </motion.div>
      </section>

      {musicUrl && <BackgroundMusic url={musicUrl} />}
    </div>
  );
}
