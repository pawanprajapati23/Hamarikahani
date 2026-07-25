"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Gift, Gem, Frown, Flower2, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const categories = [
  {
    id: "love",
    title: "Love Story",
    description: "Express your deepest feelings with a romantic digital canvas.",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    id: "birthday",
    title: "Birthday",
    description: "Celebrate another trip around the sun with joy and memories.",
    icon: Gift,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    id: "anniversary",
    title: "Anniversary",
    description: "Commemorate your special day and the journey you share together.",
    icon: Gem,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    id: "miss-you",
    title: "Miss You",
    description: "Bridge the distance by reminding them they are always on your mind.",
    icon: Frown,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    id: "sorry",
    title: "Sorry",
    description: "Mend fences with a heartfelt, beautifully crafted digital apology.",
    icon: Flower2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function CategoriesSection() {
  return (
    <Section className="bg-foreground/[0.02]">
      <Container>
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
            A canvas for every emotion
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose a starting point that matches your feelings. Our universal editor adapts to whatever story you want to tell.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.id} variants={itemVariants}>
                <Link 
                  href={`/auth/signup?category=${category.id}`} 
                  className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl"
                  aria-label={`Create a ${category.title} story`}
                >
                  <div className="h-full p-8 rounded-3xl bg-background border border-foreground/5 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${category.bg} transition-transform group-hover:scale-110 duration-300`}>
                      <Icon className={`w-7 h-7 ${category.color}`} aria-hidden="true" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-foreground mb-3">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      Create Story 
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
