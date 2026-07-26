"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BirthdayTemplate({ metadata }: { metadata: any }) {
  const [opened, setOpened] = useState(false);

  const {
    birthdayName = "My Friend",
    birthdayAge = "",
    customMessage = "Wishing you a lifetime of happiness, joy, and endless surprises! Have a wonderful day!",
    giftGif = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjUzYzZhMzBiMmQ5MGI2YTkzMzE2YmY2MTI2MzcxYzcxZmE1ZGU3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRv0ThflsHCqDrG/giphy.gif",
    cakeGif = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTNjOWUzNGMwMDRkNWJjZGRiZjZhNDZmNjUyZWEzMmQyMTA1NWFmZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LMB3W50H8y5GOO1hg/giphy.gif",
    cardColor = "bg-rose-500",
  } = metadata || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center w-full relative z-10 overflow-hidden px-4">
      
      {/* Step 1: Unopened Gift */}
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="unopened"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-8 cursor-pointer"
            onClick={() => setOpened(true)}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <img 
                src={giftGif} 
                alt="Tap to open gift" 
                className="w-64 h-64 object-contain drop-shadow-2xl"
              />
            </motion.div>
            <h2 className="text-3xl font-playfair font-bold text-foreground animate-pulse">
              Tap the gift to open!
            </h2>
          </motion.div>
        ) : (
          /* Step 2: Opened Birthday Card */
          <motion.div
            key="opened"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="flex flex-col items-center space-y-6 w-full"
          >
            {/* Confetti / Balloon Emojis Background Effect */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "100vh", x: Math.random() * 200 - 100, opacity: 1 }}
                animate={{ y: "-10vh", x: Math.random() * 200 - 100, opacity: 0 }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
                className="absolute text-4xl z-0"
                style={{ left: `${15 + (i * 15)}%` }}
              >
                {i % 2 === 0 ? "🎈" : "✨"}
              </motion.div>
            ))}

            <img 
              src={cakeGif} 
              alt="Birthday Cake" 
              className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-full shadow-2xl border-4 border-white/20 relative z-10"
            />
            
            <div className="space-y-4 relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
              <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-foreground leading-tight">
                Happy Birthday, <br/>
                <span className={cardColor.replace("bg-", "text-")}>{birthdayName}!</span>
              </h1>
              
              {birthdayAge && (
                <div className={`inline-block px-4 py-1 rounded-full ${cardColor} text-white font-bold text-sm tracking-wider uppercase shadow-md`}>
                  Turning {birthdayAge}
                </div>
              )}

              <p className="text-lg font-medium text-foreground/90 pt-4 leading-relaxed whitespace-pre-wrap">
                "{customMessage}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
