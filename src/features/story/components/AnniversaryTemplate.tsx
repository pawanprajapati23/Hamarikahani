"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Heart, Stars, Sparkles, Map } from "lucide-react";
import { Confetti } from "@/components/ui/Confetti";
import { cn } from "@/utils/cn";

function AnimatedCounter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toString();
        },
      });
      return () => controls.stop();
    }
  }, [from, to]);

  return <span ref={nodeRef}>{from}</span>;
}

export function AnniversaryTemplate({ metadata }: { metadata: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
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

  const numYears = parseInt(years) || 0;

  return (
    <div ref={containerRef} className="w-full relative z-10 bg-slate-950 min-h-[100dvh] overflow-x-hidden text-slate-100 font-sans selection:bg-rose-500/30">
      
      {/* Cinematic Background Particles */}
      {mounted && (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: "110vh", x: `${Math.random() * 100}%`, opacity: 0, scale: Math.random() * 0.5 + 0.3 }}
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
      )}

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
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />
        </motion.div>

        {/* Hero Content - Glassmorphic Container */}
        <motion.div 
          initial={{ y: 50, opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ y: 0, opacity: 1, backdropFilter: "blur(12px)" }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="relative z-20 flex flex-col items-center text-center px-5 sm:px-10 py-12 sm:py-16 rounded-[2rem] sm:rounded-[3rem] bg-white/5 border border-white/10 shadow-luxury max-w-4xl mx-4 mt-16 sm:mt-20 w-[calc(100%-2rem)] sm:w-auto"
        >
          <div className="absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 px-4 sm:px-6 py-1.5 sm:py-2 bg-rose-500/20 border border-rose-500/30 rounded-full backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
            <Stars className="w-3 h-3 sm:w-4 sm:h-4 text-rose-300 animate-pulse" /> 
            <span className="text-rose-200 text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase">Happy Anniversary</span>
            <Stars className="w-3 h-3 sm:w-4 sm:h-4 text-rose-300 animate-pulse" />
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-rose-100 to-rose-300 mb-6 sm:mb-8 drop-shadow-[0_0_40px_rgba(244,63,94,0.4)]">
            {coupleNames}
          </h1>
          
          <div className="flex items-center gap-3 sm:gap-4 w-full justify-center opacity-90">
            <div className="h-px bg-gradient-to-r from-transparent to-rose-300 flex-1 max-w-[60px] sm:max-w-[100px]" />
            <p className="text-base sm:text-xl text-rose-100 font-medium tracking-[0.3em] sm:tracking-[0.4em] uppercase flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-rose-300">
                {mounted ? <AnimatedCounter from={0} to={numYears} /> : numYears}
              </span> 
              Years of Love
            </p>
            <div className="h-px bg-gradient-to-l from-transparent to-rose-300 flex-1 max-w-[60px] sm:max-w-[100px]" />
          </div>
          
          <p className="text-xs sm:text-sm text-slate-300 mt-6 sm:mt-8 tracking-[0.2em] sm:tracking-[0.3em] uppercase bg-white/5 px-5 sm:px-6 py-2 rounded-full border border-white/10 shadow-inner">
            {anniversaryDate}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-20 opacity-80"
        >
          <p className="text-[10px] text-rose-300 uppercase tracking-[0.4em] mb-3 sm:mb-4">Our Story</p>
          <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-rose-400 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Message Section - Elegant Quote */}
      <section className="relative w-full py-24 sm:py-40 px-5 sm:px-6 flex items-center justify-center overflow-hidden">
        {/* Abstract Glows */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-rose-600/20 blur-[120px] sm:blur-[150px] rounded-full" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-purple-600/20 blur-[120px] sm:blur-[150px] rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.3 }}
          className="relative z-10 max-w-4xl text-center space-y-8 sm:space-y-12"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], filter: ["drop-shadow(0 0 10px rgba(244,63,94,0.3))", "drop-shadow(0 0 25px rgba(244,63,94,0.7))", "drop-shadow(0 0 10px rgba(244,63,94,0.3))"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500 mx-auto fill-rose-500" />
          </motion.div>
          
          <p className="text-2xl sm:text-4xl md:text-5xl font-playfair italic leading-[1.8] sm:leading-[1.6] text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-50 to-slate-300 px-2 sm:px-4 drop-shadow-sm">
            "{message}"
          </p>
          
          <div className="flex justify-center gap-4 opacity-60 items-center pt-4">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          </div>
        </motion.div>
      </section>

      {/* 3. The Journey (Glassmorphic Timeline) */}
      {timelineEvents && timelineEvents.length > 0 && (
        <section className="relative w-full py-20 sm:py-32 px-4">
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-center mb-20 sm:mb-32 space-y-4 sm:space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-2 sm:mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <Map className="w-3 h-3 sm:w-4 sm:h-4 text-rose-400" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/80 font-semibold">Our Timeline</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-playfair font-bold text-white drop-shadow-2xl">
                The Beautiful Journey
              </h2>
            </motion.div>
            
            <div className="space-y-24 sm:space-y-40 relative before:absolute before:inset-0 before:ml-6 md:before:mx-auto before:w-1 before:bg-gradient-to-b before:from-transparent before:via-rose-500/40 before:to-transparent before:rounded-full">
              {timelineEvents.map((event: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.2, delay: 0.1 * idx }}
                  className="relative flex items-center justify-start md:justify-normal md:odd:flex-row-reverse group"
                >
                  {/* Glowing Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.9)] transform -translate-x-1/2 md:translate-x-[-50%] border-4 border-slate-950 z-20 transition-transform duration-300 group-hover:scale-125 group-hover:bg-rose-400" />
                  
                  {/* Content Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] ml-14 md:ml-0">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-8 shadow-luxury-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 group-hover:border-rose-500/40 relative overflow-hidden">
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="flex flex-col md:flex-row gap-5 sm:gap-6 items-center relative z-10">
                        <div className="w-full md:w-1/2 relative group-hover:shadow-[0_0_30px_rgba(244,63,94,0.2)] rounded-2xl transition-shadow duration-500">
                          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-purple-500 rounded-2xl blur-md opacity-20 group-hover:opacity-50 transition duration-500" />
                          <img 
                            src={event.image || coverPhoto} 
                            alt={event.title} 
                            className="relative w-full aspect-[4/5] object-cover rounded-2xl shadow-xl z-10 border border-white/10"
                          />
                        </div>

                        <div className="w-full md:w-1/2 text-center md:text-left space-y-3 sm:space-y-4 mt-2 md:mt-0">
                          <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 font-bold text-lg sm:text-xl tracking-widest border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.15)] group-hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-shadow">
                            {event.year}
                          </div>
                          <h4 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-white drop-shadow-md">
                            {event.title}
                          </h4>
                          {event.description && (
                            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                              {event.description}
                            </p>
                          )}
                          <div className="w-10 sm:w-12 h-1 bg-gradient-to-r from-rose-500 to-transparent mx-auto md:mx-0 rounded-full transition-all duration-300 group-hover:w-20" />
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
      <section className="min-h-[70dvh] w-full flex flex-col items-center justify-center relative bg-slate-950 pb-20 mt-10 sm:mt-20 overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-rose-950/40 to-transparent pointer-events-none" />
        
        {/* Trigger Confetti when this section is in view */}
        <motion.div
          onViewportEnter={() => setShowConfetti(true)}
          viewport={{ once: true, amount: 0.5 }}
          className="absolute inset-0 pointer-events-none"
        />

        {showConfetti && <Confetti duration={5000} colors={["#f43f5e", "#d946ef", "#fbcfe8", "#ffffff"]} />}
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Heart className="w-16 h-16 sm:w-24 sm:h-24 text-rose-500 fill-rose-500/80 mb-8 sm:mb-10 drop-shadow-[0_0_40px_rgba(244,63,94,0.8)]" />
          </motion.div>
          <h4 className="text-5xl sm:text-7xl md:text-8xl font-playfair italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-rose-200 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Forever & Always
          </h4>
          <div className="mt-8 sm:mt-12 flex items-center gap-4 sm:gap-6">
            <div className="w-10 sm:w-16 h-[2px] bg-gradient-to-r from-transparent to-rose-400" />
            <p className="text-slate-200 tracking-[0.4em] sm:tracking-[0.6em] uppercase text-xs sm:text-sm font-semibold drop-shadow-md">
              {coupleNames}
            </p>
            <div className="w-10 sm:w-16 h-[2px] bg-gradient-to-l from-transparent to-rose-400" />
          </div>
        </motion.div>
      </section>

      {musicUrl && <BackgroundMusic url={musicUrl} />}
    </div>
  );
}

