"use client";

import { motion } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";
import { Heart } from "lucide-react";

export function AnniversaryTemplate({ metadata }: { metadata: any }) {
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
    <div className="w-full relative z-10 bg-background min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src={coverPhoto} 
          alt="Couple" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-white font-medium tracking-widest uppercase text-sm"
          >
            {years} Years of Love
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-playfair font-bold text-white tracking-tight"
          >
            {coupleNames}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/80 font-medium tracking-widest uppercase text-sm"
          >
            {anniversaryDate}
          </motion.p>
        </div>
      </div>

      {/* Message Section */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center space-y-6">
        <Heart className="w-8 h-8 text-rose-500 mx-auto animate-pulse" />
        <h2 className="text-2xl md:text-4xl font-playfair font-bold text-foreground leading-relaxed">
          "{message}"
        </h2>
      </div>

      {/* Timeline Section */}
      {timelineEvents && timelineEvents.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h3 className="text-center text-xl font-medium text-muted-foreground uppercase tracking-widest mb-16">Our Journey</h3>
          
          <div className="space-y-24">
            {timelineEvents.map((event: any, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="w-full md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-primary/20 transform rotate-3 rounded-2xl transition-transform group-hover:rotate-6" />
                  <img 
                    src={event.image || "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2940&auto=format&fit=crop"} 
                    alt={event.title} 
                    className="relative w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl border border-border"
                  />
                </div>
                <div className={`w-full md:w-1/2 space-y-4 text-center md:text-left ${idx % 2 === 1 ? 'md:text-right' : ''}`}>
                  <h4 className="text-5xl font-playfair font-bold text-primary/20">{event.year}</h4>
                  <h3 className="text-3xl font-bold text-foreground">{event.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <BackgroundMusic url={musicUrl} />
    </div>
  );
}
