"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Button } from "@/components/ui/button";
import { HeartCrack, Heart } from "lucide-react";

export function SorryTemplate({ metadata }: { metadata: any }) {
  const [forgiven, setForgiven] = useState(false);

  const {
    recipientName = "My Friend",
    senderName = "Me",
    message = "I messed up and I'm really sorry. Please forgive me?",
    promiseText = "I promise to do better and never hurt you again.",
    sadGifUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHk1NjhzMnlybnR6ZWg4OTMwcThnbWdmeGk1Nnd2M2NxdHJqMXZpZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L95W4wv8nnb9K/giphy.gif",
    happyGifUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0MmlkNjIzbWNxdjF3aGRyZjNha2l0Z3J4NDV5dDRyZHhtMnhqMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif",
    musicUrl = ""
  } = metadata || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center w-full relative z-10 p-6">
      <AnimatePresence mode="wait">
        {!forgiven ? (
          <motion.div
            key="unforgiven"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-8 w-full max-w-lg bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-foreground/10 shadow-2xl"
          >
            <div className="relative">
              <HeartCrack className="w-12 h-12 text-rose-500 absolute -top-4 -right-4 animate-bounce opacity-50" />
              <img 
                src={sadGifUrl} 
                alt="I am sorry" 
                className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full shadow-inner border-4 border-foreground/10"
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-playfair font-bold text-foreground">Dear {recipientName},</h2>
              <p className="text-lg md:text-xl font-medium text-foreground/80 leading-relaxed italic">
                "{message}"
              </p>
              <div className="bg-foreground/5 p-4 rounded-xl border border-foreground/10 mt-6">
                <p className="text-sm font-semibold text-foreground uppercase tracking-widest mb-2">My Promise</p>
                <p className="text-foreground/70 font-medium">{promiseText}</p>
              </div>
            </div>

            <div className="pt-4 w-full space-y-4">
              <Button 
                onClick={() => setForgiven(true)}
                size="lg"
                className="w-full rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-14 shadow-lg shadow-emerald-500/20"
              >
                I Forgive You, {senderName}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="forgiven"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="flex flex-col items-center space-y-6"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "100vh", x: Math.random() * 200 - 100, opacity: 1 }}
                animate={{ y: "-10vh", x: Math.random() * 200 - 100, opacity: 0 }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
                className="absolute text-4xl z-0"
                style={{ left: `${10 + (i * 10)}%` }}
              >
                ❤️
              </motion.div>
            ))}

            <Heart className="w-16 h-16 text-rose-500 animate-pulse drop-shadow-lg" />
            <img 
              src={happyGifUrl} 
              alt="Happy" 
              className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-3xl shadow-2xl relative z-10"
            />
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-emerald-500 pt-4 relative z-10">
              Thank You!
            </h2>
            <p className="text-xl font-medium text-foreground/80 relative z-10">
              You are the best!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <BackgroundMusic url={musicUrl} />
    </div>
  );
}
