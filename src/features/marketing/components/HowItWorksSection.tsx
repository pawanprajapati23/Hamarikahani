"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Edit3, CreditCard, Send } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const steps = [
  {
    id: 1,
    icon: MousePointerClick,
    title: "1. Choose Category",
    description: "Select the perfect emotion or occasion from our curated list of categories.",
  },
  {
    id: 2,
    icon: Edit3,
    title: "2. Customize",
    description: "Upload photos, write a heartfelt message, and pick a beautiful premium theme.",
  },
  {
    id: 3,
    icon: CreditCard,
    title: "3. Complete Payment",
    description: "Securely pay a one-time fee to publish your personalized digital surprise.",
  },
  {
    id: 4,
    icon: Send,
    title: "4. Share the Magic",
    description: "Get a private, beautifully crafted URL to send instantly to your loved one.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function HowItWorksSection() {
  return (
    <Section className="bg-background relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" aria-hidden="true" />
      
      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg">
            Create an unforgettable emotional experience in four simple steps. No coding or design skills required.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative"
        >
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-foreground/5 z-0" aria-hidden="true" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.id} variants={itemVariants} className="relative z-10">
                <div className="flex flex-col items-center text-center space-y-4 group">
                  <div className="w-24 h-24 rounded-full bg-background border-4 border-foreground/5 shadow-sm flex items-center justify-center text-primary group-hover:border-primary/30 group-hover:scale-105 transition-all duration-300">
                    <Icon className="w-10 h-10" aria-hidden="true" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
