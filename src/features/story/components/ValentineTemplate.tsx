"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ValentineTemplate({ metadata }: { metadata: any }) {
  const [accepted, setAccepted] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);

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
    // Generate random coordinates between -150 and 150 pixels from original position
    const randomX = Math.floor(Math.random() * 300) - 150;
    const randomY = Math.floor(Math.random() * 300) - 150;
    
    setNoButtonPosition({ x: randomX, y: randomY });
    setNoCount((prev) => prev + 1);
  };

  const getYesButtonSize = () => {
    return 1 + (noCount * 0.2); // Yes button grows by 20% every time they try to click No
  };

  if (accepted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in zoom-in duration-500 w-full relative z-10">
        <img 
          src={gifUrl2} 
          alt="Happy celebration gif" 
          className="w-64 h-64 object-cover rounded-3xl shadow-2xl"
        />
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-rose-500">
          {successMessage}
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 w-full relative z-10">
      <img 
        src={gifUrl1} 
        alt="Cute pleading gif" 
        className="w-64 h-64 object-cover rounded-3xl shadow-xl"
      />
      
      <div className="space-y-4">
        <h3 className="text-2xl font-medium text-foreground opacity-80">Dear {partnerName},</h3>
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground">
          {questionText}
        </h2>
      </div>

      <div className="flex items-center justify-center gap-6 pt-8 relative w-full max-w-sm mx-auto h-24">
        <motion.div
          animate={{ scale: getYesButtonSize() }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="z-20 absolute left-1/4 -translate-x-1/2"
        >
          <Button 
            size="lg" 
            className="rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg px-8 h-14 shadow-lg shadow-rose-500/30"
            onClick={() => setAccepted(true)}
          >
            {yesButtonText}
          </Button>
        </motion.div>

        <motion.div
          animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="absolute right-1/4 translate-x-1/2 z-30"
        >
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full border-2 border-foreground/20 text-foreground font-bold text-lg px-8 h-14 bg-background"
            onMouseEnter={handleNoHover}
            onClick={handleNoHover} // For mobile taps
          >
            {noButtonText}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
