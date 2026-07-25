"use client";

import { useEditorStore } from "../store/editor";
import { THEME_ENGINE, FALLBACK_THEME } from "../utils/themes";
import { motion } from "framer-motion";

export function PreviewStep() {
  const { title, blocks, themeId } = useEditorStore();
  
  // Dynamically inject the theme tokens. If the mock ID isn't found, fallback gracefully.
  const theme = THEME_ENGINE[themeId] || FALLBACK_THEME;

  return (
    <div className={`w-full max-w-3xl mx-auto min-h-[85vh] shadow-2xl rounded-[3rem] overflow-hidden ${theme.bg} ${theme.text} transition-colors duration-700 animate-in fade-in slide-in-from-bottom-8`}>
      <div className={`p-8 sm:p-16 space-y-12 ${theme.font}`}>
        
        {/* Story Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center leading-tight mb-16 tracking-tight"
        >
          {title || "Untitled Story"}
        </motion.h1>

        {/* Live Block Renderer */}
        <div className="space-y-8">
          {blocks.length === 0 && (
            <p className="text-center opacity-50 italic">Your story canvas is currently empty.</p>
          )}

          {blocks.map((block, index) => (
            <motion.div 
              key={block.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              {block.type === "text" && (
                <p className="text-lg sm:text-xl leading-relaxed whitespace-pre-wrap opacity-90">
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
                <div className="rounded-3xl overflow-hidden shadow-2xl my-12">
                  <img src={block.content} alt="Story visual" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              )}

              {block.type === "spacer" && (
                <div style={{ height: block.metadata?.height === "large" ? "128px" : block.metadata?.height === "small" ? "32px" : "64px" }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
