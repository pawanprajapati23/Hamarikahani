"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Button } from "@/components/ui/button";
import { HeartCrack, CloudRain, Sun, Stars } from "lucide-react";

export function SorryTemplate({ metadata }: { metadata: any }) {
  const [forgiven, setForgiven] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
    <div className={`flex flex-col items-center justify-start min-h-[85vh] w-full relative z-10 p-4 sm:p-8 overflow-x-hidden rounded-[2rem] transition-colors duration-1000 ${forgiven ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/40 dark:via-teal-900/30 dark:to-cyan-950/40' : 'bg-gradient-to-br from-slate-100 via-zinc-200 to-slate-300 dark:from-slate-900 dark:via-zinc-900 dark:to-slate-800'}`}>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {!forgiven ? (
            <motion.div key="rain" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`drop-${i}`}
                  initial={{ y: -50, x: Math.random() * window.innerWidth, opacity: 0 }}
                  animate={{ 
                    y: window.innerHeight + 50, 
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 1.5 + 0.8, 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                    ease: "linear"
                  }}
                  className="absolute w-[2px] h-8 bg-gradient-to-b from-transparent to-blue-400/50 dark:to-blue-300/30 rounded-full"
                />
              ))}
            </motion.div>
          ) : (
            <motion.div key="sunshine" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
               <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-400/20 blur-[120px]" />
               <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-400/20 blur-[120px]" />
               {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.2, 0],
                    rotate: 180
                  }}
                  transition={{ 
                    duration: Math.random() * 3 + 2, 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                  }}
                  className="absolute text-emerald-400/50"
                  style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                >
                  <Stars className="w-8 h-8" />
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
            className="flex flex-col items-center min-h-[75vh] justify-center space-y-10 w-full max-w-2xl relative z-10 mx-auto"
          >
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl p-10 sm:p-14 rounded-[3.5rem] border border-white/60 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] w-full flex flex-col items-center text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-slate-400 blur-3xl opacity-20 animate-pulse rounded-full" />
                <HeartCrack className="w-16 h-16 text-slate-500/80 absolute -top-4 -right-4 animate-[bounce_3s_infinite] drop-shadow-xl z-20" />
                <motion.img 
                  whileHover={{ scale: 1.02 }}
                  src={sadGifUrl} 
                  alt="I am sorry" 
                  className="w-56 h-56 md:w-64 md:h-64 object-cover rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-8 border-white/70 dark:border-slate-800 relative z-10 grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              <div className="space-y-6 text-center w-full">
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-800 dark:text-slate-100">Dear {recipientName},</h2>
                <div className="relative py-6">
                  <div className="absolute left-0 top-0 w-8 h-8 border-t-2 border-l-2 border-slate-300 dark:border-slate-600 rounded-tl-xl" />
                  <div className="absolute right-0 bottom-0 w-8 h-8 border-b-2 border-r-2 border-slate-300 dark:border-slate-600 rounded-br-xl" />
                  <p className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic px-6">
                    "{message}"
                  </p>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-slate-100 to-white dark:from-slate-900 dark:to-black p-8 rounded-3xl border border-white/80 dark:border-slate-800 mt-8 shadow-inner relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-400 dark:bg-slate-600" />
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
                    <CloudRain className="w-4 h-4" /> My Promise
                  </p>
                  <p className="text-slate-800 dark:text-slate-200 font-medium text-lg">{promiseText}</p>
                </motion.div>
              </div>

              <div className="pt-10 w-full">
                <Button 
                  onClick={() => setForgiven(true)}
                  size="lg"
                  className="w-full rounded-2xl bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-200 dark:to-white dark:text-slate-900 hover:from-emerald-500 hover:to-teal-500 dark:hover:from-emerald-400 dark:hover:to-teal-400 hover:text-white dark:hover:text-black font-bold h-16 text-xl shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-transparent hover:border-emerald-300"
                >
                  I Forgive You, {senderName}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="forgiven"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center w-full pt-10 pb-24 relative z-10"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.6, duration: 1.2 }}
              className="text-center w-full max-w-3xl mx-auto flex flex-col items-center space-y-10"
            >
              <div className="relative inline-block">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-3rem] bg-emerald-500 blur-[60px] opacity-20 rounded-full"
                />
                <img 
                  src={happyGifUrl} 
                  alt="Happy" 
                  className="w-72 h-72 md:w-80 md:h-80 object-cover rounded-[3rem] shadow-[0_20px_60px_rgba(16,185,129,0.3)] border-8 border-white/80 dark:border-white/20 relative z-10"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-black rounded-full p-5 shadow-2xl z-20 border border-emerald-100 dark:border-emerald-900"
                >
                  <Sun className="w-10 h-10 text-amber-500 animate-[spin_10s_linear_infinite]" />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/60 dark:bg-black/60 backdrop-blur-2xl px-14 py-10 rounded-[3rem] border border-white/50 dark:border-white/10 shadow-2xl space-y-4"
              >
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-600 pb-2">
                  Thank You!
                </h2>
                <p className="text-2xl font-medium text-slate-700 dark:text-slate-300">
                  You are the best! ❤️
                </p>
              </motion.div>
            </motion.div>

            {/* Premium Memory Gallery */}
            {photos && photos.filter((p: string) => p.trim() !== "").length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-24 w-full max-w-5xl"
              >
                <div className="flex items-center justify-center gap-4 mb-12">
                  <div className="h-px bg-gradient-to-r from-transparent to-emerald-400 w-1/4" />
                  <h3 className="text-2xl font-serif text-emerald-600 dark:text-emerald-400 font-semibold tracking-widest uppercase">Our Good Times</h3>
                  <div className="h-px bg-gradient-to-l from-transparent to-emerald-400 w-1/4" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                  {photos.filter((p: string) => p.trim() !== "").map((photo: string, idx: number) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, y: -5 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + (idx * 0.1) }}
                      className="group relative aspect-square rounded-3xl overflow-hidden shadow-xl border border-white/40 dark:border-white/10"
                    >
                      <div className="absolute inset-0 bg-emerald-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
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

      <BackgroundMusic url={musicUrl} />
    </div>
  );
}
