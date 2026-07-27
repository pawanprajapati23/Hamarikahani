"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Confetti } from "@/components/ui/Confetti";
import { Heart, Stars, Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";

export function ValentineTemplate({ metadata }: { metadata: any }) {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ id: number; left: number; duration: number; delay: number; scale: number; rotate: number; isStar: boolean }[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generate particles only on the client side to prevent hydration errors
    const generatedParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      scale: Math.random() * 1.5 + 0.5,
      rotate: Math.random() * 360,
      isStar: i % 3 === 0
    }));
    setParticles(generatedParticles);
  }, []);

  const {
    partnerName = "My Love",
    questionText = "Will you be my Valentine?",
    yesButtonText = "Yes!",
    noButtonText = "No",
    successMessage = "Yayy! I love you! ❤️",
    gifUrl1 = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTV5Nzd5cndxdDFxYm8zYXdxZ2hxdHQyYTV2amc5MTJhMnNhZWxyciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LnjD7MN2RtpEIAtSls/giphy.gif",
    gifUrl2 = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0MmlkNjIzbWNxdjF3aGRyZjNha2l0Z3J4NDV5dDRyZHhtMnhqMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif",
    photos = []
  } = metadata || {};

  const handleNoInteraction = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    const randomX = Math.floor(Math.random() * 150) - 75;
    const randomY = Math.floor(Math.random() * 150) - 75;
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoCount((prev) => prev + 1);
  };

  const getYesButtonSize = () => {
    return 1 + (noCount * 0.2); 
  };

  if (!mounted) return null;

  return (
    <div className="relative flex flex-col items-center justify-start min-h-[100dvh] w-full p-5 sm:p-8 lg:p-12 overflow-x-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 shadow-2xl font-sans">
      
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-rose-400/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-[120px]" />
        
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "120vh", left: `${p.left}%`, opacity: 0, scale: 0 }}
            animate={{ 
              y: "-20vh", 
              opacity: [0, 0.8, 0],
              scale: p.scale,
              rotate: p.rotate
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute text-rose-300/40"
          >
            {p.isStar ? <Stars className="w-6 h-6" /> : <Heart fill="currentColor" className="w-8 h-8" />}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div 
            key="question"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] w-full max-w-xl mx-auto mt-10"
          >
            <div className="bg-white/60 backdrop-blur-2xl p-6 sm:p-12 rounded-3xl border border-white/50 shadow-luxury text-center w-full">
              <div className="relative inline-block mb-6 sm:mb-8">
                <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-30 animate-pulse rounded-full" />
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src={gifUrl1} 
                  alt="Question gif" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full shadow-2xl border-4 border-white/80 relative z-10"
                />
              </div>
              
              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                <h3 className="text-xl sm:text-2xl font-medium text-rose-500 italic font-serif">Dear {partnerName},</h3>
                <h2 className="text-3xl sm:text-5xl font-bold text-slate-800 leading-tight">
                  {questionText}
                </h2>
                {noCount >= 5 && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg font-medium text-purple-600 mt-4"
                  >
                    Come on, you know the answer! 💕
                  </motion.p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4 min-h-[120px] relative w-full">
                <motion.div
                  animate={{ scale: getYesButtonSize() }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="z-20 relative w-full sm:w-auto"
                >
                  <Button 
                    size="lg" 
                    className={cn(
                      "w-full sm:w-auto rounded-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-lg px-10 h-[56px] shadow-xl transition-all",
                      noCount >= 3 ? "shadow-[0_0_30px_rgba(250,204,21,0.6)] border-2 border-yellow-400" : "shadow-rose-500/30 border border-rose-400/50"
                    )}
                    onClick={() => setAccepted(true)}
                  >
                    {yesButtonText}
                  </Button>
                </motion.div>

                <motion.div
                  animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-full sm:w-auto sm:absolute sm:right-[15%] z-30"
                  onMouseEnter={(e) => {
                    // Only trigger mouse enter if it's a mouse event (not touch emulation)
                    if (window.matchMedia("(hover: hover)").matches) {
                      handleNoInteraction(e as any);
                    }
                  }}
                  onClick={handleNoInteraction}
                  onTouchStart={handleNoInteraction}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto rounded-full border-2 border-slate-200 text-slate-600 font-bold text-lg px-8 h-[56px] bg-white/50 backdrop-blur-md hover:bg-white"
                  >
                    {noButtonText}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 flex flex-col items-center w-full pt-10 pb-24"
          >
            <Confetti active={true} duration={5000} />
            <motion.div 
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
              className="text-center w-full max-w-2xl mx-auto flex flex-col items-center space-y-8 mt-10"
            >
              <div className="relative inline-block mt-8">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-4rem] bg-[conic-gradient(from_0deg,transparent,rgba(225,29,72,0.3),rgba(147,51,234,0.3),transparent)] rounded-full blur-2xl"
                />
                <img 
                  src={gifUrl2} 
                  alt="Happy celebration gif" 
                  className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-3xl shadow-[0_20px_50px_rgba(225,29,72,0.3)] border-8 border-white/80 relative z-10"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-full p-4 shadow-2xl z-20 border border-rose-100"
                >
                  <Sparkles className="w-8 h-8 text-rose-500 animate-pulse" />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/60 backdrop-blur-2xl px-6 py-6 sm:px-12 sm:py-8 rounded-3xl border border-white/50 shadow-luxury"
              >
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600 leading-tight">
                  {successMessage}
                </h2>
              </motion.div>
            </motion.div>

            {/* Premium Memory Gallery */}
            {photos && photos.filter((p: string) => p.trim() !== "").length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-20 sm:mt-24 w-full max-w-5xl"
              >
                <div className="flex items-center justify-center gap-4 mb-8 sm:mb-12">
                  <div className="h-px bg-gradient-to-r from-transparent to-rose-400 w-1/4 sm:w-1/3" />
                  <h3 className="text-xl sm:text-2xl font-serif text-rose-500 font-semibold tracking-widest uppercase text-center">Our Memories</h3>
                  <div className="h-px bg-gradient-to-l from-transparent to-rose-400 w-1/4 sm:w-1/3" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                  {photos.filter((p: string) => p.trim() !== "").map((photo: string, idx: number) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, y: -5 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + (idx * 0.1) }}
                      className="group relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury-md border border-white/60 bg-white/40 backdrop-blur-sm"
                    >
                      <div className="absolute inset-0 bg-rose-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      <img 
                        src={photo} 
                        alt={`Memory ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end justify-center pb-6">
                        <Heart className="text-white w-8 h-8 fill-current drop-shadow-md" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Celebration Hearts Explosion */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`explosion-${i}`}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: 0, 
                  scale: Math.random() * 3 + 1,
                  x: (Math.random() - 0.5) * 800,
                  y: (Math.random() - 0.5) * 800
                }}
                transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
                className="absolute top-[30%] left-1/2 text-rose-500 pointer-events-none z-50"
              >
                <Heart fill="currentColor" className="w-8 h-8" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <BackgroundMusic url={metadata?.musicUrl} />
    </div>
  );
}
