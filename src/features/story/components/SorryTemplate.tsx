"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Button } from "@/components/ui/button";
import { HeartCrack, Heart, CloudRain } from "lucide-react";

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
    musicUrl = ""
  } = metadata || {};

  if (!mounted) return null;

  return (
    <div className={`flex flex-col items-center justify-center min-h-[85vh] w-full relative z-10 p-6 overflow-hidden rounded-[2rem] transition-colors duration-1000 ${forgiven ? 'bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/30 dark:to-teal-900/30' : 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800'}`}>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence>
          {!forgiven ? (
            <motion.div key="rain" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`drop-${i}`}
                  initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 0 }}
                  animate={{ 
                    y: window.innerHeight, 
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 1 + 1, 
                    repeat: Infinity, 
                    delay: Math.random() * 2,
                    ease: "linear"
                  }}
                  className="absolute w-0.5 h-6 bg-blue-400/30 dark:bg-blue-300/20 rounded-full"
                />
              ))}
            </motion.div>
          ) : (
            <motion.div key="sunshine" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_70%)]" />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {!forgiven ? (
          <motion.div
            key="unforgiven"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex flex-col items-center space-y-8 w-full max-w-lg bg-white/40 dark:bg-black/40 backdrop-blur-2xl p-8 sm:p-12 rounded-[3rem] border border-white/40 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-slate-400 blur-3xl opacity-20 animate-pulse rounded-full" />
              <HeartCrack className="w-16 h-16 text-rose-500/80 absolute -top-6 -right-6 animate-[bounce_3s_infinite] drop-shadow-lg z-20" />
              <img 
                src={sadGifUrl} 
                alt="I am sorry" 
                className="w-48 h-48 md:w-60 md:h-60 object-cover rounded-full shadow-[0_0_40px_rgba(0,0,0,0.1)] border-8 border-white/50 relative z-10 grayscale-[20%]"
              />
            </div>
            
            <div className="space-y-5 text-center">
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-slate-800 dark:text-slate-100">Dear {recipientName},</h2>
              <p className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{message}"
              </p>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/50 dark:bg-black/50 p-6 rounded-2xl border border-white/50 dark:border-white/10 mt-6 shadow-inner relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-400" />
                <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                  <HeartCrack className="w-3 h-3" /> My Promise
                </p>
                <p className="text-slate-800 dark:text-slate-200 font-medium">{promiseText}</p>
              </motion.div>
            </div>

            <div className="pt-6 w-full space-y-4">
              <Button 
                onClick={() => setForgiven(true)}
                size="lg"
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold h-16 text-lg shadow-xl shadow-emerald-500/30 transition-all hover:scale-[1.02]"
              >
                I Forgive You, {senderName}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="forgiven"
            initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.6, duration: 1.2 }}
            className="flex flex-col items-center justify-center space-y-8 relative z-10 w-full max-w-xl text-center"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "100vh", x: Math.random() * 400 - 200, opacity: 1, scale: Math.random() + 0.5 }}
                animate={{ y: "-20vh", x: Math.random() * 400 - 200, opacity: 0 }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute text-emerald-400/40 z-0"
              >
                <Heart fill="currentColor" className="w-10 h-10" />
              </motion.div>
            ))}

            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-emerald-500 blur-[50px] opacity-30 rounded-full"
              />
              <img 
                src={happyGifUrl} 
                alt="Happy" 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-[3rem] shadow-[0_20px_60px_rgba(16,185,129,0.3)] border-8 border-white/60 relative z-10"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-black rounded-full p-4 shadow-xl z-20"
              >
                <Heart fill="currentColor" className="w-10 h-10 text-rose-500 animate-pulse" />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/60 dark:bg-black/60 backdrop-blur-xl px-12 py-8 rounded-[2.5rem] border border-white/30 shadow-2xl space-y-3"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Thank You!
              </h2>
              <p className="text-xl font-medium text-slate-700 dark:text-slate-300">
                You are the best! ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BackgroundMusic url={musicUrl} />
    </div>
  );
}
