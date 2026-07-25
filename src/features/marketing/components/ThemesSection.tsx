"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/utils/cn";

type CategoryKey = "Love" | "Birthday" | "Anniversary" | "Miss You" | "Sorry";

const categories: CategoryKey[] = ["Love", "Birthday", "Anniversary", "Miss You", "Sorry"];

const themesData: Record<CategoryKey, Array<{ id: string; name: string; desc: string; gradient: string }>> = {
  Love: [
    { id: "l1", name: "Midnight Romance", desc: "Deep dark blues with starlight accents.", gradient: "from-slate-900 to-blue-900" },
    { id: "l2", name: "Rose Petals", desc: "Soft pinks and warm romantic hues.", gradient: "from-rose-400 to-red-500" },
    { id: "l3", name: "Classic Elegance", desc: "Minimalist black, white, and gold.", gradient: "from-stone-800 to-stone-900" },
  ],
  Birthday: [
    { id: "b1", name: "Confetti Pop", desc: "Bright, energetic, and full of joy.", gradient: "from-yellow-400 to-orange-500" },
    { id: "b2", name: "Neon Party", desc: "Vibrant neon colors on a dark canvas.", gradient: "from-fuchsia-600 to-purple-600" },
    { id: "b3", name: "Pastel Dream", desc: "Soft, gentle colors for a sweet celebration.", gradient: "from-teal-200 to-emerald-200" },
  ],
  Anniversary: [
    { id: "a1", name: "Golden Years", desc: "Rich golds and deep elegant blacks.", gradient: "from-amber-600 to-yellow-900" },
    { id: "a2", name: "Timeless", desc: "A classic sepia-toned nostalgic journey.", gradient: "from-orange-100 to-orange-300" },
    { id: "a3", name: "Modern Love", desc: "Clean, crisp whites with subtle pinks.", gradient: "from-pink-100 to-rose-200" },
  ],
  "Miss You": [
    { id: "m1", name: "Rainy Day", desc: "Soft grays and melancholic blues.", gradient: "from-slate-400 to-slate-600" },
    { id: "m2", name: "Distance", desc: "A minimal, vast expanse of gentle colors.", gradient: "from-sky-200 to-indigo-300" },
    { id: "m3", name: "Warm Hug", desc: "Comforting terracottas and warm hues.", gradient: "from-orange-300 to-rose-400" },
  ],
  Sorry: [
    { id: "s1", name: "Fresh Start", desc: "Clean, calming mints and whites.", gradient: "from-teal-100 to-emerald-200" },
    { id: "s2", name: "Sincere", desc: "Soft, grounded earth tones.", gradient: "from-stone-300 to-stone-500" },
    { id: "s3", name: "Peace Offering", desc: "Gentle lavenders and soothing purples.", gradient: "from-purple-200 to-fuchsia-300" },
  ]
};

export function ThemesSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("Love");

  return (
    <Section className="bg-background">
      <Container>
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
            Curated Themes
          </h2>
          <p className="text-muted-foreground text-lg">
            Every story is unique. Choose from our professionally designed templates crafted for every specific emotion.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" role="tablist">
          {categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                activeCategory === category 
                  ? "bg-foreground text-background shadow-md" 
                  : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Themes Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {themesData[activeCategory].map((theme) => (
                <div key={theme.id} className="group relative rounded-3xl overflow-hidden border border-foreground/5 shadow-sm hover:shadow-xl transition-all duration-500 bg-card flex flex-col h-full">
                  
                  {/* CSS Gradient Theme Preview */}
                  <div className={cn("w-full h-48 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105", theme.gradient)} aria-hidden="true" />
                  
                  <div className="p-6 flex flex-col flex-grow bg-background">
                    <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
                      {theme.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 flex-grow">
                      {theme.desc}
                    </p>
                    
                    <Link 
                      href={`/auth/signup?category=${activeCategory.toLowerCase().replace(' ', '-')}&theme=${theme.id}`}
                      className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                    >
                      Use This Theme
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
