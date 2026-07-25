"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const faqData = [
  {
    question: "What is HamariKahani?",
    answer: "HamariKahani is a premium digital storytelling platform that allows you to create personalized, emotional surprise web pages for your loved ones without any coding skills.",
  },
  {
    question: "How much does it cost?",
    answer: "We charge a simple, one-time fee per published story. There are absolutely no recurring monthly subscriptions or hidden charges.",
  },
  {
    question: "Can I edit my story after publishing?",
    answer: "Yes! You can edit your published story, swap out photos, or fix typos anytime up to 30 days after publishing.",
  },
  {
    question: "Do I need design or coding skills?",
    answer: "Not at all. Our universal editor handles all the complex design work. You simply upload your photos and text, and we automatically map them to our gorgeous, professionally designed templates.",
  },
  {
    question: "Is the story link private?",
    answer: "Yes. Your story is published to a cryptographically unique URL. It is never indexed by search engines, meaning only the people you explicitly share the link with can view it.",
  },
  {
    question: "Can I add videos alongside photos?",
    answer: "Absolutely. Our rich media editor supports seamless uploading of both high-quality photos and emotional video clips.",
  },
  {
    question: "How long does it take to create a story?",
    answer: "Most users complete their personalized story in under 10 minutes. Our workflow is designed to be mobile-friendly, fast, and completely frictionless.",
  },
  {
    question: "Can I try it before paying?",
    answer: "Yes, you can build your entire story, preview it exactly as it will look, and iterate on the design for free. You only pay when you are ready to publish the final live link.",
  },
];

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
