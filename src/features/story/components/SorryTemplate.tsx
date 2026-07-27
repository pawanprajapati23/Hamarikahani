"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Button } from "@/components/ui/button";
import { HeartCrack, CloudRain, Sun, Stars, Heart } from "lucide-react";
import { cn } from "@/utils/cn";

export function SorryTemplate({ metadata }: { metadata: any }) {
  const [forgiven, setForgiven] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [showHoverHeart, setShowHoverHeart] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const handleButtonMouseEnter = () => {
    setIsHoveringButton(true);
    hoverTimerRef.current = setTimeout(() => {
      setShowHoverHeart(true);
    }, 2000);
  };

  const handleButtonMouseLeave = () => {
    setIsHoveringButton(false);
    setShowHoverHeart(false);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  const {
    recipientName = "My Friend",
    senderName = "Me",
    message = "I messed up and I'm really sorry. Please forgive me?",
    promiseText = "I promise to do better and never hurt you again.",
    sadGifUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHk1NjhzMnlybnR6ZWg4OTMwcThnbWdmeGk1Nnd2M2NxdHJqMXZpZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L95W4wv8nnb9K/giphy.gif",
    happyGifUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0MmlkNjIzbWNxdjF3aGRyZjNha2l0Z3J4NDV5dDRyZHhtMnhqMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif",
    musicUrl = "",
    photos = []
  } = metadata || {};

  if (!mounted) return null;

  return (
    <div className={cn(
      "flex flex-col items-center justify-start min-h-[100dvh] w-full relative z-10 p-5 sm:p-8 overflow-x-hidden transition-colors duration-1000",
      forgiven 
        ? "bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-50 dark:from-emerald-950/60 dark:via-teal-900/40 dark:to-cyan-950/60" 
        : "bg-gradient-to-br from-slate-200 via-zinc-300 to-slate-400 dark:from-slate-900 dark:via-zinc-900 dark:to-slate-800"
    )}>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <AnimatePresence>
          {!forgiven ? (
            <motion.div key="rain" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={`drop-${i}`}
                  initial={{ y: -50, x: `${Math.random() * 100}vw`, opacity: 0 }}
                  animate={{ 
                    y: "110vh", 
                    opacity: [0, 0.7, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 1.2 + 0.8, 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                    ease: "linear"
                  }}
                  className="absolute w-[2px] h-10 bg-gradient-to-b from-transparent via-blue-400/60 to-transparent dark:via-blue-300/40 rounded-full"
                />
              ))}
            </motion.div>
          ) : (
            <motion.div key="sunshine" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
               <div className="absolute top-[-10%] left-[-10%] w-[80%] sm:w-[60%] h-[60%] rounded-full bg-emerald-400/30 blur-[100px] sm:blur-[150px]" />
               <div className="absolute bottom-[-10%] right-[-10%] w-[70%] sm:w-[50%] h-[50%] rounded-full bg-teal-400/30 blur-[100px] sm:blur-[150px]" />
               {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    scale: [0, Math.random() * 0.5 + 0.8, 0],
                    rotate: 180
                  }}
                  transition={{ 
                    duration: Math.random() * 3 + 2, 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                  }}
                  className="absolute text-emerald-400/60"
                  style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                >
                  <Stars className="w-6 h-6 sm:w-8 sm:h-8" />
                </motion.div>
               ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {!forgiven ? (
          <motion.div
            key="unforgiven"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)", y: -40 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="flex flex-col items-center min-h-[85vh] justify-center space-y-8 w-full max-w-2xl relative z-10 mx-auto py-10"
          >
            <div className="bg-white/50 dark:bg-black/50 backdrop-blur-3xl p-6 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-white/60 dark:border-white/10 shadow-luxury w-full flex flex-col items-center text-center">
              
              <div className="relative mb-6 sm:mb-10 group">
                <div className="absolute inset-0 bg-slate-400 blur-3xl opacity-30 animate-pulse rounded-full group-hover:bg-rose-400/30 transition-colors duration-700" />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="absolute -top-4 -right-4 z-20"
                >
                  <HeartCrack className="w-12 h-12 sm:w-16 sm:h-16 text-slate-500/80 drop-shadow-xl group-hover:text-rose-400 transition-colors duration-500" />
                </motion.div>
                <img 
                  src={sadGifUrl} 
                  alt="I am sorry" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-8 border-white/70 dark:border-slate-800 relative z-10 grayscale-[60%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02]"
                />
              </div>
              
              <div className="space-y-6 text-center w-full">
                <h2 className="text-3xl sm:text-5xl font-playfair font-bold text-slate-800 dark:text-slate-100">Dear {recipientName},</h2>
                
                <div className="relative py-8 sm:py-10 px-4 sm:px-8 bg-white/30 dark:bg-white/5 rounded-3xl border border-white/40 dark:border-white/10 shadow-inner">
                  {/* Decorative Corners */}
                  <div className="absolute left-4 top-4 w-6 h-6 border-t-2 border-l-2 border-slate-400 dark:border-slate-500 rounded-tl-xl" />
                  <div className="absolute right-4 top-4 w-6 h-6 border-t-2 border-r-2 border-slate-400 dark:border-slate-500 rounded-tr-xl" />
                  <div className="absolute left-4 bottom-4 w-6 h-6 border-b-2 border-l-2 border-slate-400 dark:border-slate-500 rounded-bl-xl" />
                  <div className="absolute right-4 bottom-4 w-6 h-6 border-b-2 border-r-2 border-slate-400 dark:border-slate-500 rounded-br-xl" />
                  
                  <p className="text-lg sm:text-2xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic px-2">
                    "{message}"
                  </p>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-slate-100 to-white dark:from-slate-900 dark:to-black p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/80 dark:border-slate-800 mt-6 sm:mt-8 shadow-sm relative overflow-hidden text-left"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-slate-400 to-slate-600 dark:from-slate-600 dark:to-slate-800" />
                  <p className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2 pl-4">
                    <CloudRain className="w-4 h-4" /> My Promise
                  </p>
                  <p className="text-slate-800 dark:text-slate-200 font-medium text-base sm:text-lg pl-4">{promiseText}</p>
                </motion.div>
              </div>

              <div className="pt-8 sm:pt-10 w-full relative">
                <Button 
                  onClick={() => setForgiven(true)}
                  onMouseEnter={handleButtonMouseEnter}
                  onMouseLeave={handleButtonMouseLeave}
                  size="lg"
                  className={cn(
                    "w-full rounded-2xl font-bold h-16 text-lg sm:text-xl shadow-xl transition-all duration-500 border relative overflow-hidden group",
                    isHoveringButton 
                      ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white border-emerald-300 scale-[1.02] shadow-[0_0_30px_rgba(52,211,153,0.4)]" 
                      : "bg-gradient-to-r from-slate-700 to-slate-600 dark:from-slate-200 dark:to-white text-white dark:text-slate-900 border-transparent"
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    I Forgive You, {senderName}
                  </span>
                  
                  {/* Button Glow Effect on Hover */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-400 opacity-0 transition-opacity duration-500 z-0",
                    isHoveringButton && "opacity-100"
                  )} />
                </Button>

                {/* Floating Heart after hover */}
                <AnimatePresence>
                  {showHoverHeart && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: -20 }}
                      exit={{ opacity: 0, scale: 0.5, y: -40 }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
                    >
                      <Heart className="w-10 h-10 text-emerald-500 fill-emerald-500 animate-pulse drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="forgiven"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center w-full pt-10 sm:pt-16 pb-24 relative z-10"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.6, duration: 1.2 }}
              className="text-center w-full max-w-3xl mx-auto flex flex-col items-center space-y-8 sm:space-y-12 px-4"
            >
              <div className="relative inline-block mt-4">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-4rem] rounded-full opacity-40 blur-[40px] bg-[conic-gradient(from_0deg,var(--tw-gradient-stops))] from-emerald-400 via-teal-300 to-cyan-400"
                />
                <img 
                  src={happyGifUrl} 
                  alt="Happy" 
                  className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_60px_rgba(16,185,129,0.4)] border-8 border-white/90 dark:border-white/20 relative z-10"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-black rounded-full p-4 sm:p-5 shadow-2xl z-20 border border-emerald-100 dark:border-emerald-900"
                >
                  <Sun className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 animate-[spin_10s_linear_infinite]" />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/60 dark:bg-black/60 backdrop-blur-2xl px-8 sm:px-14 py-8 sm:py-10 rounded-[2.5rem] sm:rounded-[3rem] border border-white/50 dark:border-white/10 shadow-2xl space-y-3 sm:space-y-4 w-full"
              >
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 pb-2 drop-shadow-sm">
                  Thank You!
                </h2>
                <p className="text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2">
                  You are the best! <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
                </p>
              </motion.div>
            </motion.div>

            {/* Premium Memory Gallery */}
            {photos && photos.filter((p: string) => p.trim() !== "").length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-20 sm:mt-24 w-full max-w-5xl px-4"
              >
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
                  <div className="h-px bg-gradient-to-r from-transparent to-emerald-400 flex-1 max-w-[100px]" />
                  <h3 className="text-xl sm:text-2xl font-playfair text-emerald-700 dark:text-emerald-400 font-semibold tracking-[0.2em] uppercase text-center">Our Good Times</h3>
                  <div className="h-px bg-gradient-to-l from-transparent to-emerald-400 flex-1 max-w-[100px]" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {photos.filter((p: string) => p.trim() !== "").map((photo: string, idx: number) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, y: -5 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + (idx * 0.1) }}
                      className="group relative aspect-square rounded-[2rem] overflow-hidden shadow-xl border border-white/60 dark:border-white/10"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-emerald-900/20 to-transparent mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <img 
                        src={photo} 
                        alt={`Memory ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {musicUrl && <BackgroundMusic url={musicUrl} />}
    </div>
  );
}
