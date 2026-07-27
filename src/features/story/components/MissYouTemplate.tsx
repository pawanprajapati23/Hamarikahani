"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Heart, Sparkles, Quote } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function MissYouTemplate({ metadata }: { metadata: any }) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const {
    recipientName = "My Love",
    senderName = "Me",
    message = "Days feel so long without you. I miss you more than words can say.",
    photos = [
      "https://images.unsplash.com/photo-1516239482977-b550ba7253f2?q=80&w=2940&auto=format&fit=crop"
    ],
    musicUrl = ""
  } = metadata || {};

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="min-h-[100dvh] w-full relative bg-[#0a0a0a] overflow-hidden font-sans selection:bg-rose-500/30"
    >
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,24,39,1)_0%,_rgba(0,0,0,1)_100%)]" />
        <motion.div 
          animate={{ 
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-rose-900/30 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.25, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/30 blur-[150px]"
        />
        
        {/* Floating dust/stars particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{ 
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
              opacity: [null, Math.random() * 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-rose-200/40 rounded-full"
            style={{ filter: 'blur(1px)' }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center w-full max-w-3xl mb-24"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            className="w-20 h-20 mx-auto mb-10 rounded-full bg-gradient-to-tr from-rose-500/10 to-indigo-500/10 border border-white/5 flex items-center justify-center backdrop-blur-md shadow-[0_0_40px_rgba(244,63,94,0.15)]"
          >
            <Heart className="w-8 h-8 text-rose-300/80 fill-rose-400/20" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-playfair font-semibold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-8 tracking-tight">
            Dear {recipientName},
          </h1>
          
          <div className="relative py-8">
            <Quote className="absolute top-0 left-0 -translate-x-1/2 w-12 h-12 text-white/5 rotate-180" />
            <p className="text-2xl md:text-4xl font-playfair text-white/80 leading-relaxed italic font-light z-10 relative">
              {message}
            </p>
            <Quote className="absolute bottom-0 right-0 translate-x-1/2 w-12 h-12 text-white/5" />
          </div>

          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "120px" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent mx-auto mt-16 mb-8"
          />
          
          <p className="text-lg md:text-xl font-light tracking-[0.2em] text-white/50 uppercase">
            Always yours, <span className="text-rose-200/80 font-medium">{senderName}</span>
          </p>
        </motion.div>

        {/* Masonry Gallery Section */}
        {photos && photos.length > 0 && (
          <div className="w-full mt-10 pb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex items-center justify-center gap-4 mb-16"
            >
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <div className="flex items-center gap-2 px-4">
                <Sparkles className="w-4 h-4 text-rose-300/50" />
                <h3 className="text-sm tracking-[0.3em] uppercase text-white/40 font-medium">Our Memories</h3>
                <Sparkles className="w-4 h-4 text-rose-300/50" />
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </motion.div>

            <div className={`columns-1 sm:columns-2 ${photos.length > 2 ? 'lg:columns-3' : ''} gap-6 space-y-6`}>
              {photos.map((photo: string, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: idx * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  className="relative group break-inside-avoid rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 p-2.5 shadow-2xl backdrop-blur-sm"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-black/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10" />
                    <motion.img 
                      src={photo} 
                      alt={`Memory ${idx + 1}`}
                      className="w-full h-auto object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                    {/* Subtle glass reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full z-20 pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BackgroundMusic url={musicUrl} />
    </div>
  );
}
