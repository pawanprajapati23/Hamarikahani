"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

import { faqData } from "../constants/faq";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  return (
    <Section className="bg-background">
      <Container>
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
            Common Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about the product and billing.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border border-foreground/10 rounded-2xl overflow-hidden bg-card"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left focus-visible:outline-none focus-visible:bg-foreground/5 transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="font-semibold text-lg pr-8">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
