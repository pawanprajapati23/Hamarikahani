"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Sparkles, Heart, Stars, Share2, RotateCcw, ChevronDown } from "lucide-react";
import { Confetti } from "@/components/ui/Confetti";

type SceneType = 'envelope' | 'opening' | 'reveal' | 'age' | 'message' | 'photo' | 'finale';
interface SceneDef {
  type: SceneType;
  photoIndex?: number;
  photoUrl?: string;
}

function AnimatedCounter({ to }: { to: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = to / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [to]);
  
  return <span>{count}</span>;
}

interface BirthdayMetadata {
  birthdayName?: string;
  birthdayAge?: string;
  customMessage?: string;
  giftGif?: string;
  cakeGif?: string;
  cardColor?: string;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  photo4?: string;
  musicUrl?: string;
}

export function BirthdayTemplate({ metadata }: { metadata: BirthdayMetadata }) {
  const [currentScene, setCurrentScene] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const isScrolling = useRef(false);

  const {
    birthdayName = "My Friend",
    birthdayAge = "",
    customMessage = "Wishing you a lifetime of happiness, joy, and endless surprises! Have a wonderful day!",
    cakeGif = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTNjOWUzNGMwMDRkNWJjZGRiZjZhNDZmNjUyZWEzMmQyMTA1NWFmZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LMB3W50H8y5GOO1hg/giphy.gif",
    photo1,
    photo2,
    photo3,
    photo4,
    musicUrl
  } = metadata || {};

  const photos = [photo1, photo2, photo3, photo4].filter(Boolean);

  const scenes = useMemo(() => {
    const s: SceneDef[] = [
      { type: 'envelope' },
      { type: 'opening' },
      { type: 'reveal' }
    ];
    
    const parsedAge = parseInt(birthdayAge);
    if (!isNaN(parsedAge) && parsedAge > 0) {
      s.push({ type: 'age' });
    }
    
    if (customMessage) {
      s.push({ type: 'message' });
    }
    
    photos.forEach((photo, idx) => {
      s.push({ type: 'photo', photoIndex: idx, photoUrl: photo });
    });
    
    s.push({ type: 'finale' });
    return s;
  }, [birthdayAge, customMessage, photos]);

  // Handle auto-advancing scenes
  useEffect(() => {
    const current = scenes[currentScene];
    if (!current) return;
    
    if (current.type === 'opening') {
      const timer = setTimeout(() => {
        setCurrentScene(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
    
    if (current.type === 'age') {
      const timer = setTimeout(() => {
        setCurrentScene(prev => prev + 1);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [currentScene, scenes]);

  // Handle wheel scrolling for manual progression
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (currentScene < 2) return;
      
      const current = scenes[currentScene];
      if (current.type === 'age' || current.type === 'opening') return;
      
      if (isScrolling.current) return;
      
      if (e.deltaY > 40) {
        isScrolling.current = true;
        setCurrentScene(prev => Math.min(prev + 1, scenes.length - 1));
        setTimeout(() => { isScrolling.current = false; }, 1000);
      } else if (e.deltaY < -40) {
        isScrolling.current = true;
        setCurrentScene(prev => Math.max(2, prev - 1));
        setTimeout(() => { isScrolling.current = false; }, 1000);
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentScene, scenes]);

  // Handle touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (currentScene < 2) return;
    
    const current = scenes[currentScene];
    if (current.type === 'age' || current.type === 'opening') return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (diff > 50) {
      setCurrentScene(prev => Math.min(prev + 1, scenes.length - 1));
    } else if (diff < -50) {
      setCurrentScene(prev => Math.max(2, prev - 1));
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday ${birthdayName}!`,
          url: window.location.href
        });
      } catch (_err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  const currentSceneDef = scenes[currentScene];
  
  // Progress indicators
  const showProgress = currentScene >= 2 && currentScene < scenes.length - 1;

  return (
    <div 
      className="fixed inset-0 w-full h-[100dvh] bg-slate-950 overflow-hidden font-sans text-slate-100 touch-none selection:bg-rose-500/30"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/30 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-rose-600/30 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
      </div>

      <AnimatePresence mode="wait">
        {currentSceneDef?.type === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center px-4"
            onClick={() => setCurrentScene(1)}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative cursor-pointer group"
            >
              <div className="absolute inset-0 bg-rose-500/30 blur-[60px] rounded-full scale-150 group-hover:scale-[1.75] transition-transform duration-700" />
              <div className="relative w-[280px] h-[200px] sm:w-[360px] sm:h-[240px] bg-gradient-to-br from-rose-900 to-slate-900 rounded-xl shadow-[0_0_50px_rgba(225,29,72,0.4)] border border-rose-800/50 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[55%] bg-gradient-to-b from-rose-800 to-rose-900/80 [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-2xl z-10 border-b border-rose-700/50" />
                <div className="absolute inset-0 bg-rose-950/20 [clip-path:polygon(0_100%,100%_100%,100%_0,50%_50%,0_0)] z-0" />
                <div className="relative z-20 mt-12 bg-slate-950/50 p-3 rounded-full backdrop-blur-md border border-rose-500/30">
                  <Heart className="w-8 h-8 text-rose-400 drop-shadow-lg animate-pulse" fill="currentColor" />
                </div>
              </div>
            </motion.div>
            
            <motion.div className="mt-20 flex flex-col items-center gap-6 cursor-pointer relative z-10 text-center">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-medium text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-rose-200 tracking-[0.15em] max-w-[80vw]">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    Someone has a surprise for you...
                  </motion.span>
                </h2>
                <Sparkles className="w-5 h-5 text-rose-400" />
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm text-rose-100 tracking-[0.3em] uppercase font-semibold animate-pulse bg-white/10 px-8 py-3 rounded-full border border-white/20 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Tap to Open
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {currentSceneDef?.type === 'opening' && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center px-4 bg-white/5 backdrop-blur-sm"
          >
            <Confetti />
            <motion.div
              initial={{ rotateX: 0, scale: 1, y: 0 }}
              animate={{ rotateX: 180, scale: 1.2, opacity: 0, y: 100 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              className="relative w-[280px] h-[200px] sm:w-[360px] sm:h-[240px] bg-gradient-to-br from-rose-900 to-slate-900 rounded-xl shadow-2xl flex flex-col items-center justify-center"
            >
              <div className="absolute top-0 inset-x-0 h-[55%] bg-rose-800 [clip-path:polygon(0_0,100%_0,50%_100%)] origin-top transition-transform duration-1000 ease-out" style={{ transform: 'rotateX(180deg)' }} />
              <div className="absolute inset-4 bg-white/90 rounded shadow-inner flex items-center justify-center transform -rotateX-180 opacity-0 transition-opacity duration-300 delay-300">
                <Heart className="w-16 h-16 text-rose-500" fill="currentColor" />
              </div>
            </motion.div>
          </motion.div>
        )}

        {currentSceneDef?.type === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 sm:px-8 text-center"
          >
            <div className="relative group mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-500 blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity duration-700 rounded-full scale-150" />
              <motion.div
                initial={{ rotate: -10, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="relative p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
              >
                <img 
                  src={cakeGif} 
                  alt="Birthday Cake" 
                  className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full"
                />
              </motion.div>
            </div>
            
            <div className="flex items-center gap-3 text-rose-300 mb-6">
              <Stars className="w-4 h-4" />
              <p className="text-xs sm:text-sm tracking-[0.4em] uppercase font-semibold">
                A Day To Remember
              </p>
              <Stars className="w-4 h-4" />
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-6xl sm:text-7xl md:text-9xl font-playfair font-bold text-white leading-[1.1] drop-shadow-2xl"
            >
              Happy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">
                Birthday
              </span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="relative px-12 py-5 mt-8 border-y border-white/20 bg-white/5 backdrop-blur-sm"
            >
              <h2 className="text-3xl sm:text-5xl font-playfair italic text-white/95 font-light tracking-wider">
                {birthdayName}
              </h2>
            </motion.div>
          </motion.div>
        )}

        {currentSceneDef?.type === 'age' && (
          <motion.div
            key="age"
            initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 15 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4"
          >
            <Confetti />
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full scale-150" />
              <div className="relative flex flex-col items-center bg-white/5 p-12 sm:p-20 rounded-[3rem] border border-white/10 backdrop-blur-2xl shadow-2xl">
                <Sparkles className="absolute top-8 left-8 w-8 h-8 text-yellow-400 animate-pulse" />
                <Sparkles className="absolute bottom-8 right-8 w-8 h-8 text-rose-400 animate-pulse" />
                
                <h3 className="text-2xl sm:text-3xl tracking-[0.3em] uppercase text-slate-300 mb-8 font-light">
                  Turning
                </h3>
                
                <div className="text-8xl sm:text-[12rem] font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)] leading-none">
                  <AnimatedCounter to={parseInt(birthdayAge) || 0} />
                </div>
                
                <p className="mt-8 text-xl sm:text-2xl font-playfair italic text-white/70">
                  Years of Awesomeness
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {currentSceneDef?.type === 'message' && (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-10 flex items-center justify-center px-5 sm:px-8 md:px-12"
          >
            <div className="relative w-full max-w-4xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-16 shadow-2xl">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 p-4 rounded-full border border-white/10 shadow-xl">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500/20" />
              </div>
              
              <div className="text-center mt-6">
                <div className="flex flex-wrap justify-center gap-x-[0.4em] gap-y-2 text-2xl sm:text-3xl md:text-5xl font-playfair leading-[1.6] text-white/90 font-light">
                  {customMessage.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="flex justify-center gap-6 pt-12 mt-12 border-t border-white/10"
              >
                <Stars className="w-5 h-5 text-rose-400/50" />
                <Stars className="w-5 h-5 text-purple-400/50" />
                <Stars className="w-5 h-5 text-pink-400/50" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentSceneDef?.type === 'photo' && (
          <motion.div
            key={`photo-${currentSceneDef.photoIndex}`}
            initial={{ opacity: 0, scale: 0.8, rotateY: 45, z: -100 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotateY: -45, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 perspective-1000"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
              <Stars className="w-4 h-4 text-rose-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-semibold">
                Memory {currentSceneDef.photoIndex! + 1}
              </span>
            </div>
            
            <div className="relative p-4 sm:p-6 bg-white rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform-style-3d max-w-sm sm:max-w-md w-full rotate-[-2deg]">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-inner bg-slate-100">
                <motion.img
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6, ease: "easeOut" }}
                  src={currentSceneDef.photoUrl}
                  alt={`Memory ${currentSceneDef.photoIndex! + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              <div className="h-16 flex items-center justify-center font-playfair italic text-2xl sm:text-3xl text-slate-800 opacity-80 pt-4">
                Beautiful Moments
              </div>
            </div>
          </motion.div>
        )}

        {currentSceneDef?.type === 'finale' && (
          <motion.div
            key="finale"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center bg-gradient-to-t from-rose-950/80 to-transparent"
          >
            <Confetti />
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-playfair italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-rose-200 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Happy Birthday
              </h2>
              <div className="text-4xl sm:text-5xl font-playfair text-white mt-4">{birthdayName}</div>
              <p className="mt-8 text-rose-300 tracking-[0.5em] uppercase text-sm sm:text-base font-semibold">
                To Many More
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-4 mt-16"
            >
              <button
                onClick={() => setCurrentScene(0)}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Replay</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-400 hover:to-purple-400 rounded-full text-white shadow-lg shadow-rose-500/30 transition-all hover:shadow-rose-500/50"
              >
                <Share2 className="w-5 h-5" />
                <span>Share Surprise</span>
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="absolute bottom-8 text-xs text-white/40 uppercase tracking-widest"
            >
              Powered by HamariKahani
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Navigation Hint */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-0 right-0 z-40 flex flex-col items-center pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex flex-col items-center opacity-60"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] mb-2 text-white/70">Scroll or Swipe</span>
              <ChevronDown className="w-5 h-5 text-white/70" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {musicUrl && currentScene >= 1 && <BackgroundMusic url={musicUrl} />}
    </div>
  );
}
