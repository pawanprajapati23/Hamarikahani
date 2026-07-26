"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AnniversaryTemplate({ metadata }: { metadata: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    coupleNames = "Rahul & Priya",
    years = "5",
    anniversaryDate = "Oct 12, 2021",
    message = "Every love story is beautiful, but ours is my favorite. Happy Anniversary!",
    timelineEvents = [
      { year: "2018", title: "First Met", image: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=2940&auto=format&fit=crop" },
      { year: "2021", title: "Tied the Knot", image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2940&auto=format&fit=crop" },
    ],
    coverPhoto = "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2940&auto=format&fit=crop",
    musicUrl = ""
  } = metadata || {};

  return (
    <div className="w-full relative z-10 bg-background min-h-screen pb-24 overflow-x-hidden">
      
      {/* 3D Greeting Card Hero Section */}
      <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center py-12 perspective-1000">
        
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-12 z-50 animate-bounce text-muted-foreground font-medium flex flex-col items-center gap-2"
          >
            <span>Tap the card to open</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        )}

        <div className="relative w-full max-w-sm md:max-w-md aspect-[3/4] cursor-pointer group z-20 mx-auto" onClick={() => setIsOpen(!isOpen)}>
          {/* Back/Inside of the Card (Right side when open) */}
          <div className="absolute inset-0 bg-card rounded-2xl shadow-2xl border border-border/50 p-6 md:p-8 flex flex-col items-center text-center justify-between">
            <Heart className="w-8 h-8 text-rose-500 animate-pulse mt-4" />
            <div className="space-y-4 w-full">
              <h3 className="text-xl md:text-2xl font-playfair font-bold text-foreground">
                Happy Anniversary!
              </h3>
              <p className="text-sm md:text-base text-foreground/80 font-medium italic leading-relaxed">
                "{message}"
              </p>
            </div>
            
            {/* Polaroid inside */}
            <div className="bg-white p-3 pb-8 rounded-sm shadow-md transform rotate-3 mt-6 w-4/5 mx-auto border border-gray-100">
              <img 
                src={timelineEvents?.[0]?.image || coverPhoto} 
                className="w-full h-32 md:h-40 object-cover rounded-sm grayscale-[20%]" 
                alt="Memory"
              />
              <p className="text-gray-800 font-handwriting text-xs text-center pt-4 transform -rotate-2">
                {anniversaryDate}
              </p>
            </div>
          </div>

          {/* Front Flap of the Card (Rotates open) */}
          <motion.div 
            className="absolute inset-0 origin-left"
            initial={false}
            animate={{ 
              rotateY: isOpen ? -160 : 0,
              x: isOpen ? '-20%' : '0%' // Slightly shift left when open for better mobile view
            }}
            transition={{ duration: 0.8, type: "spring", stiffness: 50, damping: 15 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front Cover (Visible when closed) */}
            <div className="absolute inset-0 bg-card rounded-2xl shadow-[5px_5px_15px_rgba(0,0,0,0.1)] overflow-hidden border border-border/50 backface-hidden z-20">
              <div className="absolute inset-0 bg-black/30 z-10" />
              <img src={coverPhoto} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center space-y-4">
                <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest border border-white/30">
                  {years} Years
                </span>
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white leading-tight drop-shadow-xl">
                  {coupleNames}
                </h2>
                <div className="w-16 h-px bg-white/50 mt-4" />
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent z-30" /> {/* Spine shadow */}
            </div>

            {/* Inner Cover (Visible when open, back of the front flap) */}
            <div 
              className="absolute inset-0 bg-card rounded-2xl shadow-inner border border-border/50 backface-hidden flex flex-col items-center justify-center p-8 text-center"
              style={{ transform: "rotateY(180deg)" }}
            >
              <h3 className="text-2xl font-playfair font-bold text-foreground/20 opacity-50 transform -rotate-12">
                {coupleNames}
              </h3>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 flex flex-col items-center gap-2 text-muted-foreground animate-bounce"
            >
              <span className="text-sm font-medium tracking-widest uppercase">Our Journey</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Timeline Section */}
      <AnimatePresence>
        {isOpen && timelineEvents && timelineEvents.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto px-6 py-24 border-t border-border/50 mt-12"
          >
            <h3 className="text-center text-xl font-medium text-muted-foreground uppercase tracking-widest mb-24">The Timeline of Us</h3>
            
            <div className="space-y-32 relative">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/50 transform md:-translate-x-1/2 hidden md:block" />

              {timelineEvents.map((event: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="w-full md:w-1/2 relative group">
                    <div className="absolute inset-0 bg-primary/20 transform rotate-3 rounded-2xl transition-transform group-hover:rotate-6" />
                    <img 
                      src={event.image || "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2940&auto=format&fit=crop"} 
                      alt={event.title} 
                      className="relative w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl border border-border"
                    />
                  </div>
                  
                  {/* Timeline Dot (Desktop only) */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background z-20" />

                  <div className={`w-full md:w-1/2 space-y-4 text-center md:text-left ${idx % 2 === 1 ? 'md:text-right' : ''}`}>
                    <h4 className="text-5xl md:text-7xl font-playfair font-bold text-primary/10 -mb-6 md:-mb-10">{event.year}</h4>
                    <h3 className="text-3xl font-bold text-foreground relative z-10">{event.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BackgroundMusic url={musicUrl} />
      
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .backface-hidden { backface-visibility: hidden; }
        .font-handwriting { font-family: 'Caveat', 'Comic Sans MS', cursive; }
      `}} />
    </div>
  );
}
