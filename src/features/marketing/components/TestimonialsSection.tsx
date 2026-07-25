"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/utils/cn";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    initial: "P",
    color: "bg-rose-500",
    role: "Created an Anniversary Story",
    text: "I made a digital surprise for my husband's 5th anniversary. He literally cried when he saw the timeline of our photos. It felt so incredibly premium.",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    initial: "R",
    color: "bg-blue-500",
    role: "Created a Birthday Story",
    text: "The easiest 10 minutes of my life for the biggest reaction. The neon party theme was perfect for my sister's 21st birthday. Highly recommend!",
  },
  {
    id: 3,
    name: "Anjali Gupta",
    initial: "A",
    color: "bg-emerald-500",
    role: "Created a Miss You Story",
    text: "My boyfriend is working abroad. Sending him this beautifully crafted page made the distance feel just a little bit smaller. Beautiful UI.",
  },
  {
    id: 4,
    name: "Karan Desai",
    initial: "K",
    color: "bg-amber-500",
    role: "Created a Sorry Story",
    text: "Messed up big time. I used this to send a heartfelt apology with our memories. It worked. The elegant minimalist theme set the perfect tone.",
  },
  {
    id: 5,
    name: "Sneha Reddy",
    initial: "S",
    color: "bg-purple-500",
    role: "Created a Birthday Story",
    text: "I am terrible at designing things, but HamariKahani made me look like a pro. The typography and animations are absolutely world-class.",
  },
  {
    id: 6,
    name: "Vikram Singh",
    initial: "V",
    color: "bg-teal-500",
    role: "Created a Love Story",
    text: "Used this to propose digitally before the actual ring. The dark mode romance theme is simply stunning. Best money I've ever spent.",
  },
];

export function TestimonialsSection() {
  return (
    <Section className="bg-foreground/[0.02] overflow-hidden">
      <Container>
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
            Stories that matter
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of people who are using HamariKahani to create unforgettable emotional moments.
          </p>
        </div>

        {/* Mobile: CSS Scroll Snap Carousel | Desktop: Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={testimonial.id}
              className="min-w-[85vw] sm:min-w-0 snap-center bg-background rounded-3xl p-8 shadow-sm border border-foreground/5 flex flex-col h-full hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              
              <p className="text-foreground text-lg leading-relaxed mb-8 flex-grow">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg", testimonial.color)} aria-hidden="true">
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
