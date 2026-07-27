"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);
  const [dots, setDots] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      size: 8 + Math.random() * 12,
    }));
    setHearts(newHearts);

    const newDots = Array.from({ length: 6 }).map((_, i) => ({
      id: i + 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      size: 4 + Math.random() * 6,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-100px] text-pink-300/15"
          style={{ left: `${heart.left}%` }}
          animate={{
            y: ["0vh", "-120vh"],
            x: ["0px", `${Math.random() * 100 - 50}px`, "0px"],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg 
            width={heart.size} 
            height={heart.size} 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"/>
          </svg>
        </motion.div>
      ))}
      
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute bottom-[-100px] rounded-full bg-purple-300/10"
          style={{ 
            left: `${dot.left}%`,
            width: dot.size,
            height: dot.size
          }}
          animate={{
            y: ["0vh", "-120vh"],
            x: ["0px", `${Math.random() * 60 - 30}px`, "0px"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
