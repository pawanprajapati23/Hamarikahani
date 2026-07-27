export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  coverImage: string;
  originalPrice: number;
  price: number;
  previewUrl: string; // The route to preview it with dummy data
  createUrl: string;  // The route to customize it
}

export const TEMPLATES: Template[] = [
  {
    id: "valentine_template",
    name: "Will You Be My Valentine?",
    description: "A fun, interactive Yes/No surprise with dodging buttons, heart explosions, and a beautiful memory gallery.",
    category: "Love",
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2940&auto=format&fit=crop",
    originalPrice: 499,
    price: 99,
    previewUrl: "/preview/valentine",
    createUrl: "/templates/valentine/create",
  },
  {
    id: "birthday_template",
    name: "Birthday Surprise Reveal",
    description: "A cinematic birthday experience — envelope opening, confetti, cake, photos, and a grand birthday wish.",
    category: "Birthday",
    coverImage: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=2940&auto=format&fit=crop",
    originalPrice: 499,
    price: 99,
    previewUrl: "/preview/birthday",
    createUrl: "/templates/birthday/create",
  },
  {
    id: "anniversary_template",
    name: "Happy Anniversary",
    description: "A cinematic love timeline with parallax photos, animated year counter, and an elegant 'Forever & Always' ending.",
    category: "Anniversary",
    coverImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2940&auto=format&fit=crop",
    originalPrice: 499,
    price: 99,
    previewUrl: "/preview/anniversary",
    createUrl: "/templates/anniversary/create",
  },
  {
    id: "sorry_template",
    name: "I Am Sorry",
    description: "An emotional apology with rain, a heartfelt letter, a forgiveness button, and a beautiful transformation to sunshine.",
    category: "Sorry",
    coverImage: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=2940&auto=format&fit=crop",
    originalPrice: 499,
    price: 99,
    previewUrl: "/preview/sorry",
    createUrl: "/templates/sorry/create",
  },
  {
    id: "miss_you_template",
    name: "I Miss You",
    description: "A beautiful night-sky experience with shooting stars, heartfelt words, and a photo gallery of cherished memories.",
    category: "Miss You",
    coverImage: "https://images.unsplash.com/photo-1516239482977-b550ba7253f2?q=80&w=2940&auto=format&fit=crop",
    originalPrice: 499,
    price: 99,
    previewUrl: "/preview/miss_you",
    createUrl: "/templates/miss_you/create",
  },
  {
    id: "friendship_template",
    name: "Best Friends Forever",
    description: "A fun, energetic celebration of friendship — emoji bursts, photo collages, inside jokes, and a grand 'Friends Forever' finale.",
    category: "Friendship",
    coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2940&auto=format&fit=crop",
    originalPrice: 499,
    price: 99,
    previewUrl: "/preview/friendship",
    createUrl: "/templates/friendship/create",
  }
];
