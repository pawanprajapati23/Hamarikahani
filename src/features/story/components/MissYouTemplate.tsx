"use client";

import { motion } from "framer-motion";
import { BackgroundMusic } from "@/components/ui/BackgroundMusic";

export function MissYouTemplate({ metadata }: { metadata: any }) {
  const {
    recipientName = "My Love",
    senderName = "Me",
    message = "Days feel so long without you. I miss you more than words can say.",
    photos = [
      "https://images.unsplash.com/photo-1516239482977-b550ba7253f2?q=80&w=2940&auto=format&fit=crop"
    ],
    musicUrl = ""
  } = metadata || {};

  return (
    <div className="flex flex-col items-center min-h-[80vh] w-full relative z-10 py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl mx-auto space-y-12"
      >
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground">
            Hey {recipientName},
          </h2>
          <p className="text-xl md:text-3xl font-playfair text-foreground/70 italic leading-relaxed">
            "{message}"
          </p>
          <p className="text-lg font-medium text-foreground/60 uppercase tracking-widest pt-4">
            - Yours, {senderName}
          </p>
        </div>

        {photos && photos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {photos.map((photo: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + (idx * 0.2), duration: 0.6 }}
                className={`rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 ${idx === 0 && photos.length === 1 ? 'md:col-span-2' : ''}`}
              >
                <img 
                  src={photo} 
                  alt="Memory" 
                  className="w-full h-64 md:h-80 object-cover"
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <BackgroundMusic url={musicUrl} />
    </div>
  );
}
