"use client";

import { motion } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

export function MissYouTemplate({ metadata }: { metadata: any }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
    <div className="flex flex-col items-center min-h-[90vh] w-full relative z-10 py-16 px-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 shadow-2xl">
      
      {/* Starry Night / Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: window.innerHeight }}
            animate={{ 
              opacity: [0, 0.8, 0],
              y: -100,
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute rounded-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%"
            }}
          />
        ))}
        {/* Soft Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-3xl mx-auto space-y-16 relative z-10"
      >
        <div className="text-center space-y-8 bg-black/20 backdrop-blur-sm p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center border border-white/20 mb-6"
          >
            <Heart className="w-8 h-8 text-rose-400 fill-rose-400/20" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white tracking-wide">
            Hey {recipientName},
          </h2>
          
          <p className="text-2xl md:text-4xl font-playfair text-white/80 italic leading-relaxed px-4">
            "{message}"
          </p>
          
          <div className="pt-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-6" />
            <p className="text-lg font-medium text-white/60 uppercase tracking-[0.3em]">
              Yours, {senderName}
            </p>
          </div>
        </div>

        {photos && photos.length > 0 && (
          <div className={`grid grid-cols-1 ${photos.length > 1 ? 'md:grid-cols-2' : ''} gap-8 pt-4`}>
            {photos.map((photo: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6 + (idx * 0.2), duration: 0.8, type: "spring" }}
                whileHover={{ scale: 1.03, rotate: idx % 2 === 0 ? 1 : -1 }}
                className={`group rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 bg-white/5 p-3 backdrop-blur-md ${idx === 0 && photos.length === 1 ? 'md:col-span-2 max-w-2xl mx-auto' : ''}`}
              >
                <div className="relative overflow-hidden rounded-2xl w-full h-72 md:h-96">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img 
                    src={photo} 
                    alt="Memory" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <BackgroundMusic url={musicUrl} />
    </div>
  );
}
