export const THEME_ENGINE: Record<string, { name: string; category: string; bg: string; text: string; font: string; border: string }> = {
  // Love Themes
  "uuid-1": { name: "Midnight Romance", category: "Love", bg: "bg-slate-950", text: "text-slate-100", font: "font-serif", border: "border-slate-800" },
  "uuid-2": { name: "Rose Petals", category: "Love", bg: "bg-rose-50", text: "text-rose-950", font: "font-serif", border: "border-rose-200" },
  
  // Birthday Themes
  "uuid-3": { name: "Neon Party", category: "Birthday", bg: "bg-fuchsia-950", text: "text-fuchsia-100", font: "font-sans", border: "border-fuchsia-800" },
  
  // Anniversary Themes
  "uuid-4": { name: "Timeless", category: "Anniversary", bg: "bg-stone-100", text: "text-stone-900", font: "font-serif", border: "border-stone-300" },
};

// Fallback theme if ID is missing or invalid
export const FALLBACK_THEME = {
  name: "Default", category: "Any", bg: "bg-background", text: "text-foreground", font: "font-sans", border: "border-foreground/10"
};
