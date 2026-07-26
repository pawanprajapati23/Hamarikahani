export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  coverImage: string;
  previewUrl: string; // The route to preview it with dummy data
  createUrl: string;  // The route to customize it
}

export const TEMPLATES: Template[] = [
  {
    id: "valentine_template",
    name: "Will You Be My Valentine?",
    description: "A fun, interactive Yes/No surprise for your partner with dodging buttons.",
    category: "Love",
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2940&auto=format&fit=crop",
    previewUrl: "/preview/valentine",
    createUrl: "/templates/valentine/create",
  },
  {
    id: "birthday_template",
    name: "Birthday Surprise Reveal",
    description: "An animated gift box that bursts into a beautiful birthday cake with confetti.",
    category: "Birthday",
    coverImage: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=2940&auto=format&fit=crop",
    previewUrl: "/preview/birthday",
    createUrl: "/templates/birthday/create",
  },
  {
    id: "anniversary_template",
    name: "Happy Anniversary",
    description: "Celebrate your milestone with an elegant memory timeline.",
    category: "Anniversary",
    coverImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2940&auto=format&fit=crop",
    previewUrl: "/preview/anniversary",
    createUrl: "/templates/anniversary/create",
  },
  {
    id: "sorry_template",
    name: "I Am Sorry",
    description: "A cute apology card to make them smile and forgive you.",
    category: "Sorry",
    coverImage: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=2940&auto=format&fit=crop",
    previewUrl: "/preview/sorry",
    createUrl: "/templates/sorry/create",
  },
  {
    id: "miss_you_template",
    name: "I Miss You",
    description: "Let them know they are always on your mind.",
    category: "Miss You",
    coverImage: "https://images.unsplash.com/photo-1516239482977-b550ba7253f2?q=80&w=2940&auto=format&fit=crop",
    previewUrl: "/preview/miss_you",
    createUrl: "/templates/miss_you/create",
  }
];
