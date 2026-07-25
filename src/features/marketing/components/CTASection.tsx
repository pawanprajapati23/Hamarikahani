"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function CTASection() {
  return (
    <Section className="relative overflow-hidden bg-foreground text-background">
      {/* Subtle animated ambient background using Framer Motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-primary/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-secondary/30 rounded-full blur-[100px]"
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto py-12 md:py-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Ready to make them smile?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-background/80 leading-relaxed max-w-2xl"
          >
            It takes just a few minutes to craft a memory that will last a lifetime. No coding, no hassle—just pure emotion.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
          >
            {/* Primary Button inverted to match the dark section background */}
            <Button 
              size="lg" 
              className="w-full sm:w-auto rounded-full text-base group bg-background text-foreground hover:bg-background/90 font-semibold" 
              asChild
            >
              <Link href="/auth/signup">
                Create Your Story
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </Button>
            
            {/* Secondary Button ghosted out */}
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto rounded-full text-base group border-background/20 text-background hover:bg-background/10 font-semibold" 
              asChild
            >
              <Link href="/themes">
                <Play className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" aria-hidden="true" />
                View Demo
              </Link>
            </Button>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
