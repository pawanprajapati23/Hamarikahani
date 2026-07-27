"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Heart } from "lucide-react";

export function ValentineTemplate({ metadata }: { metadata: any }) {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const {
    partnerName = "My Love",
    questionText = "Will you be my Valentine?",
    yesButtonText = "Yes!",
    noButtonText = "No",
    successMessage = "Yayy! I love you! ❤️",
    gifUrl1 = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTV5Nzd5cndxdDFxYm8zYXdxZ2hxdHQyYTV2amc5MTJhMnNhZWxyciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LnjD7MN2RtpEIAtSls/giphy.gif",
    gifUrl2 = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0MmlkNjIzbWNxdjF3aGRyZjNha2l0Z3J4NDV5dDRyZHhtMnhqMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif"
  } = metadata || {};

  const handleNoHover = () => {
    const randomX = Math.floor(Math.random() * 300) - 150;
    const randomY = Math.floor(Math.random() * 300) - 150;
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoCount((prev) => prev + 1);
  };

  const getYesButtonSize = () => {
    return 1 + (noCount * 0.4); 
  };

  if (!mounted) return null;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] w-full p-4 overflow-hidden rounded-[2rem] bg-gradient-to-b from-rose-50/50 to-pink-100/50 dark:from-rose-950/20 dark:to-pink-950/20 border border-white/20 shadow-2xl">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "120%", x: Math.random() * window.innerWidth, opacity: 0, scale: 0 }}
            animate={{ 
              y: "-20%", 
              x: Math.random() * window.innerWidth,
              opacity: [0, 0.6, 0],
              scale: Math.random() * 1.5 + 0.5,
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute text-rose-400/30 dark:text-rose-500/20"
          >
            <Heart fill="currentColor" className="w-8 h-8" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div 
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center text-center space-y-8 w-full max-w-lg bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 sm:p-12 rounded-[3rem] border border-white/30 shadow-[0_8px_32px_rgba(225,29,72,0.1)]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-20 animate-pulse rounded-full" />
              <img 
                src={gifUrl1} 
                alt="Cute pleading gif" 
                className="w-56 h-56 object-cover rounded-full shadow-2xl border-4 border-white/50 relative z-10"
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-medium text-rose-600 dark:text-rose-400 italic">Dear {partnerName},</h3>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-foreground leading-tight">
                {questionText}
              </h2>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-8 pt-8 w-full h-32 relative">
              <motion.div
                animate={{ scale: getYesButtonSize() }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="z-20 absolute left-1/4 -translate-x-1/2"
              >
                <Button 
                  size="lg" 
                  className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-lg px-8 sm:px-10 h-14 shadow-xl shadow-rose-500/40 border border-rose-400/50"
                  onClick={() => setAccepted(true)}
                >
                  {yesButtonText}
                </Button>
              </motion.div>

              <motion.div
                animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="absolute right-1/4 translate-x-1/2 z-30"
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full border-2 border-foreground/10 text-foreground font-bold text-lg px-8 h-14 bg-white/50 dark:bg-black/50 backdrop-blur-md hover:bg-white dark:hover:bg-black"
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover}
                >
                  {noButtonText}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="relative z-10 flex flex-col items-center justify-center text-center space-y-10 w-full max-w-xl"
          >
            <div className="relative">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-4rem] bg-[conic-gradient(from_0deg,transparent,rgba(225,29,72,0.2),transparent)] rounded-full blur-xl"
              />
              <img 
                src={gifUrl2} 
                alt="Happy celebration gif" 
                className="w-72 h-72 object-cover rounded-[3rem] shadow-[0_20px_50px_rgba(225,29,72,0.3)] border-8 border-white/50 relative z-10"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/60 dark:bg-black/60 backdrop-blur-xl px-10 py-6 rounded-3xl border border-white/20 shadow-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-pink-600">
                {successMessage}
              </h2>
            </motion.div>
            
            {/* Celebration Hearts Explosion */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`explosion-${i}`}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: Math.random() * 2 + 1,
                  x: (Math.random() - 0.5) * 500,
                  y: (Math.random() - 0.5) * 500
                }}
                transition={{ duration: 1 + Math.random(), ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 text-rose-500"
              >
                <Heart fill="currentColor" className="w-6 h-6" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <BackgroundMusic url={metadata?.musicUrl} />
    </div>
  );
}
