"use client";

import { useState } from "react";
import { THEME_ENGINE, FALLBACK_THEME } from "@/features/editor/utils/themes";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Copy, Check, Facebook, Twitter, Link as LinkIcon, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ValentineTemplate } from "./ValentineTemplate";

export function PublicStoryRenderer({ title, blocks, themeId, slug }: { title: string, blocks: any[], themeId: string, slug?: string }) {
  const theme = THEME_ENGINE[themeId] || FALLBACK_THEME;
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const publicUrl = typeof window !== "undefined" ? `${window.location.origin}/s/${slug}` : `https://hamarikahani.in/s/${slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`I made a surprise for you! ${publicUrl}`)}`, '_blank');
  };

  return (
    <div className={`w-full min-h-screen ${theme.bg} ${theme.text} transition-colors duration-700`}>
      <div className={`max-w-3xl mx-auto p-8 sm:p-16 space-y-12 ${theme.font} pb-32`}>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center leading-tight mb-16 tracking-tight"
        >
          {title}
        </motion.h1>

        <div className="space-y-8">
          {blocks.map((block, index) => (
            <motion.div 
              key={block.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              {block.type === "text" && (
                <p className="text-lg sm:text-xl leading-relaxed whitespace-pre-wrap opacity-95">
                  {block.content}
                </p>
              )}
              
              {block.type === "quote" && (
                <blockquote className={`border-l-4 ${theme.border} pl-6 py-2 my-12 italic text-2xl sm:text-3xl font-playfair opacity-90`}>
                  "{block.content}"
                  {block.metadata?.author && (
                    <footer className="text-base font-sans font-medium mt-6 opacity-70 uppercase tracking-widest">
                      — {block.metadata.author}
                    </footer>
                  )}
                </blockquote>
              )}

              {block.type === "image" && block.content && (
                <div className="rounded-3xl overflow-hidden shadow-2xl my-12 relative group">
                  <img src={block.content} alt="Story visual" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}

              {block.type === "spacer" && (
                <div style={{ height: block.metadata?.height === "large" ? "128px" : block.metadata?.height === "small" ? "32px" : "64px" }} />
              )}

              {block.type === "valentine_template" && (
                <ValentineTemplate metadata={block.metadata} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Action Button (FAB) for Sharing */}
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {showShare && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-16 right-0 bg-card border border-foreground/10 rounded-2xl shadow-2xl p-4 w-64 flex flex-col gap-3"
            >
              <h4 className="font-semibold text-foreground text-sm px-2">Share Story</h4>
              <Button variant="outline" className="justify-start gap-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border-transparent" onClick={shareWhatsApp}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                WhatsApp
              </Button>
              <Button variant="outline" className="justify-start gap-3 text-foreground" onClick={copyLink}>
                {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <LinkIcon className="w-5 h-5 text-muted-foreground" />}
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Button 
          size="lg"
          onClick={() => setShowShare(!showShare)} 
          className="rounded-full shadow-2xl h-14 w-14 p-0 bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105"
          aria-label="Share story"
        >
          <Share2 className="w-6 h-6" />
        </Button>
      </div>

      <div className="text-center pb-8 opacity-50 flex items-center justify-center gap-2">
        <Heart className="w-4 h-4" />
        <span className="text-sm font-medium">Powered by HamariKahani</span>
      </div>
    </div>
  );
}
