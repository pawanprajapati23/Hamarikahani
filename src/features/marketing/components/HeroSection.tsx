"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function HeroSection() {
  return (
    <Section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12">
      <div className="absolute inset-0 -z-10 bg-background overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-primary/20 rounded-full blur-[100px] sm:blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-secondary/30 rounded-full blur-[120px] sm:blur-[150px]"
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 text-foreground text-sm font-semibold shadow-sm"
          >
            <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
            <span>Create a stunning digital experience</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight leading-[1.1]"
          >
            A beautiful, creative way to share your <span className="text-primary italic">love.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="text-lg sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-medium"
          >
            Create an emotional, premium digital surprise for your loved one in just a few minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 w-full sm:w-auto"
          >
            <Button size="lg" className="w-full sm:w-auto rounded-full text-lg px-10 h-14" asChild>
              <Link href="/auth/signup">
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Start Creating
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full text-lg px-10 h-14 bg-card/50 backdrop-blur-md hover:bg-card border-border/50 transition-all hover:-translate-y-1" asChild>
              <Link href="/themes">
                View Examples
              </Link>
            </Button>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
