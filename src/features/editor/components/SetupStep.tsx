"use client";

import { useEditorStore } from "../store/editor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";

const CATEGORIES = ["Love", "Birthday", "Anniversary", "Miss You", "Sorry"];

const MOCK_THEMES = [
  { id: "uuid-1", name: "Midnight Romance", category: "Love", color: "bg-slate-900" },
  { id: "uuid-2", name: "Rose Petals", category: "Love", color: "bg-rose-500" },
  { id: "uuid-3", name: "Neon Party", category: "Birthday", color: "bg-fuchsia-600" },
  { id: "uuid-4", name: "Timeless", category: "Anniversary", color: "bg-amber-100" },
];

export function SetupStep() {
  const { category, setCategory, themeId, setThemeId, title, setTitle } = useEditorStore();

  const availableThemes = MOCK_THEMES.filter(t => !category || t.category === category);

  return (
    <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 py-8">
      
      {/* Category Selection */}
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-playfair font-bold">1. What are we celebrating?</h2>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setThemeId(""); }}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                category === cat 
                  ? "bg-foreground text-background shadow-md scale-105" 
                  : "bg-card border border-foreground/10 hover:border-foreground/30 text-muted-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Title Selection */}
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-playfair font-bold">2. Give it a title</h2>
        <Input 
          placeholder="e.g. Happy 5th Anniversary, Sarah! ❤️" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg h-14 bg-card border-foreground/10 rounded-2xl"
        />
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-playfair font-bold">3. Choose a vibe</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {availableThemes.map(theme => (
            <button 
              key={theme.id}
              onClick={() => setThemeId(theme.id)}
              className={cn(
                "cursor-pointer rounded-2xl border-2 transition-all overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                themeId === theme.id 
                  ? "border-primary shadow-lg scale-[1.02]" 
                  : "border-transparent ring-1 ring-foreground/10 hover:ring-foreground/30 hover:scale-[1.02]"
              )}
            >
              <div className={cn("h-32 w-full", theme.color)} aria-hidden="true" />
              <div className="p-3 bg-card font-medium text-sm text-foreground">
                {theme.name}
              </div>
            </button>
          ))}
          {availableThemes.length === 0 && (
            <p className="text-muted-foreground italic p-4">Select a category to see available themes.</p>
          )}
        </div>
      </div>
      
    </div>
  );
}
