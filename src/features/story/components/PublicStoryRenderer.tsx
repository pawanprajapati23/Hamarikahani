"use client";

import { useState } from "react";
import { THEME_ENGINE, FALLBACK_THEME } from "@/features/editor/utils/themes";
import { motion } from "framer-motion";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ValentineTemplate } from "./ValentineTemplate";
import { BirthdayTemplate } from "./BirthdayTemplate";
import { AnniversaryTemplate } from "./AnniversaryTemplate";
import { SorryTemplate } from "./SorryTemplate";
import { MissYouTemplate } from "./MissYouTemplate";
import { FriendshipTemplate } from "./FriendshipTemplate";
import { ShareModal } from "@/components/ui/ShareModal";

export function PublicStoryRenderer({ title, blocks, themeId, slug }: { title: string, blocks: any[], themeId: string, slug?: string }) {
  const theme = THEME_ENGINE[themeId] || FALLBACK_THEME;
  const [showShareModal, setShowShareModal] = useState(false);

  const publicUrl = typeof window !== "undefined" ? `${window.location.origin}/s/${slug}` : `https://hamarikahani.in/s/${slug}`;

  // Check if the first block is a full-page template experience
  const firstBlock = blocks[0];
  const isFullPageExperience = firstBlock && [
    "valentine_template",
    "birthday_template",
    "anniversary_template",
    "sorry_template",
    "miss_you_template",
    "friendship_template"
  ].includes(firstBlock.type);

  return (
    <div className={`w-full min-h-[100dvh] ${isFullPageExperience ? '' : `${theme.bg} ${theme.text}`} transition-colors duration-700`}>

      {/* For full-page template experiences, render ONLY the template */}
      {isFullPageExperience ? (
        <div className="w-full">
          {firstBlock.type === "valentine_template" && (
            <ValentineTemplate metadata={firstBlock.metadata} />
          )}
          {firstBlock.type === "birthday_template" && (
            <BirthdayTemplate metadata={firstBlock.metadata} />
          )}
          {firstBlock.type === "anniversary_template" && (
            <AnniversaryTemplate metadata={firstBlock.metadata} />
          )}
          {firstBlock.type === "sorry_template" && (
            <SorryTemplate metadata={firstBlock.metadata} />
          )}
          {firstBlock.type === "miss_you_template" && (
            <MissYouTemplate metadata={firstBlock.metadata} />
          )}
          {firstBlock.type === "friendship_template" && (
            <FriendshipTemplate metadata={firstBlock.metadata} />
          )}
        </div>
      ) : (
        /* For generic block-based stories */
        <div className={`max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-16 space-y-8 sm:space-y-12 ${theme.font} pb-32`}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight mb-10 sm:mb-16 tracking-tight font-playfair"
          >
            {title}
          </motion.h1>

          <div className="space-y-6 sm:space-y-8">
            {blocks.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {block.type === "text" && (
                  <p className="text-base sm:text-lg md:text-xl leading-relaxed whitespace-pre-wrap opacity-95">
                    {block.content}
                  </p>
                )}

                {block.type === "quote" && (
                  <blockquote className={`border-l-4 ${theme.border} pl-5 sm:pl-6 py-2 my-8 sm:my-12 italic text-xl sm:text-2xl md:text-3xl font-playfair opacity-90`}>
                    &ldquo;{block.content}&rdquo;
                    {block.metadata?.author && (
                      <footer className="text-sm sm:text-base font-sans font-medium mt-4 sm:mt-6 opacity-70 uppercase tracking-widest">
                        — {block.metadata.author}
                      </footer>
                    )}
                  </blockquote>
                )}

                {block.type === "image" && block.content && (
                  <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-luxury-lg my-8 sm:my-12 relative group">
                    <img
                      src={block.content}
                      alt="Story visual"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                )}

                {block.type === "spacer" && (
                  <div style={{ height: block.metadata?.height === "large" ? "96px" : block.metadata?.height === "small" ? "24px" : "48px" }} />
                )}

                {/* Template Blocks (for mixed-content stories) */}
                {block.type === "valentine_template" && <ValentineTemplate metadata={block.metadata} />}
                {block.type === "birthday_template" && <BirthdayTemplate metadata={block.metadata} />}
                {block.type === "anniversary_template" && <AnniversaryTemplate metadata={block.metadata} />}
                {block.type === "sorry_template" && <SorryTemplate metadata={block.metadata} />}
                {block.type === "miss_you_template" && <MissYouTemplate metadata={block.metadata} />}
                {block.type === "friendship_template" && <FriendshipTemplate metadata={block.metadata} />}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Share Button */}
      <div className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50">
        <Button
          size="lg"
          onClick={() => setShowShareModal(true)}
          className="rounded-full shadow-luxury-lg h-14 w-14 p-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 active:scale-95 transition-all duration-300 glow-button touch-target-lg"
          aria-label="Share surprise"
        >
          <Share2 className="w-6 h-6" />
        </Button>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={publicUrl}
        title={title || "A special surprise"}
      />

      {/* Powered By Footer */}
      <div className="text-center py-6 sm:py-8 opacity-40 flex items-center justify-center gap-2">
        <Heart className="w-3.5 h-3.5 fill-current" />
        <span className="text-xs sm:text-sm font-medium tracking-wide">Powered by HamariKahani</span>
      </div>
    </div>
  );
}
