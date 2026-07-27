"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Heart, Sparkles, Gift, PenTool, Send, PlayCircle,
  Star, ChevronDown, ChevronRight, Quote, Check, Zap,
  MessageCircleHeart, Clock, Globe, Shield
} from "lucide-react";
import { TEMPLATES, Template } from "@/config/templates";

/* ─────────────────────────────────
   Animation Variants
   ───────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number = 0) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  })
};

/* ─────────────────────────────────
   Category Filter Tabs
   ───────────────────────────────── */
const CATEGORIES = ["All", "Love", "Birthday", "Anniversary", "Sorry", "Miss You"];

/* ─────────────────────────────────
   Steps Data
   ───────────────────────────────── */
const STEPS = [
  {
    icon: Gift,
    title: "Choose Experience",
    description: "Browse our collection of premium emotional experiences — each one crafted to tell a unique story.",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    iconColor: "text-pink-600"
  },
  {
    icon: PenTool,
    title: "Pour Your Heart",
    description: "Add your own photos, messages, music, and personal touches to make it truly yours.",
    color: "from-purple-500 to-violet-500",
    bg: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    icon: Send,
    title: "Send the Magic",
    description: "Share a beautiful link. Watch them smile, cry, laugh — and remember this moment forever.",
    color: "from-pink-500 to-purple-500",
    bg: "bg-gradient-to-br from-pink-50 to-purple-50",
    iconColor: "text-pink-600"
  }
];

/* ─────────────────────────────────
   Testimonials Data
   ───────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Ananya S.",
    role: "Sent a Birthday Surprise",
    text: "My best friend cried happy tears when she opened the link. This is NOT a regular greeting card — it's a full emotional experience. Worth every rupee!",
    rating: 5,
    avatar: "A"
  },
  {
    name: "Rahul M.",
    role: "Sent a Valentine Surprise",
    text: "The dodging 'No' button had my girlfriend laughing so hard. And then the photo memories section made her emotional. Perfect combination!",
    rating: 5,
    avatar: "R"
  },
  {
    name: "Priya K.",
    role: "Sent an Anniversary Surprise",
    text: "Our entire love story timeline in one beautiful page with music and photos. My husband said it was the best anniversary gift he ever received.",
    rating: 5,
    avatar: "P"
  }
];

/* ─────────────────────────────────
   FAQ Data
   ───────────────────────────────── */
const FAQS = [
  {
    q: "How does HamariKahani work?",
    a: "Choose a premium experience template, customize it with your photos, messages, and music, pay ₹99, and share a beautiful link with your loved one. They'll experience an interactive, cinematic surprise made just for them."
  },
  {
    q: "How long does the surprise page stay live?",
    a: "Forever! Once published, your surprise page is live permanently. Your loved one can revisit it anytime to relive the beautiful memory."
  },
  {
    q: "Can I edit after publishing?",
    a: "Currently, surprises are locked after publishing to preserve the authentic moment. We recommend previewing thoroughly before publishing."
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. We use industry-standard encryption. Your photos and messages are stored securely and only accessible via your unique surprise link."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, credit/debit cards, net banking, and wallets through our secure Razorpay payment gateway. All Indian payment methods are supported."
  }
];

/* ─────────────────────────────────
   Main Home Content Component
   ───────────────────────────────── */
export function HomeContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  const filteredTemplates = activeCategory === "All"
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === activeCategory);

  return (
    <main className="flex-1 flex flex-col min-h-[100dvh] bg-page text-slate-800 overflow-hidden">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO SECTION — Cinematic Opening
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 sm:px-8 pt-24 pb-16 overflow-hidden"
      >
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[5%] left-[10%] w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] bg-pink-300/25 rounded-full blur-[100px] sm:blur-[130px]"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-[10%] right-[5%] w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-purple-300/20 rounded-full blur-[120px] sm:blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            className="absolute top-[40%] right-[30%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-amber-200/15 rounded-full blur-[100px]"
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full"
        >
          {/* Pill Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-pink-100/50 text-pink-600 font-semibold text-xs sm:text-sm shadow-sm mb-6 sm:mb-8"
          >
            <Heart className="w-3.5 h-3.5 fill-current animate-heartbeat" />
            <span>Create magical digital surprises</span>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-[2.5rem] leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl font-bold font-playfair tracking-tight text-slate-900 mb-5 sm:mb-6 text-balance"
          >
            Make Someone{" "}
            <span className="shimmer-text italic">Feel Loved</span>
            {" "}Today
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-base sm:text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed font-medium mb-8 sm:mb-10 text-pretty"
          >
            Choose a cinematic experience. Add your photos, messages & music. 
            Share a link that makes them smile, cry, laugh — and remember it forever.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-base sm:text-lg px-8 sm:px-10 h-14 sm:h-16 glow-button hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 font-semibold"
              asChild
            >
              <Link href="#templates">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Creating
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-full text-base sm:text-lg px-8 sm:px-10 h-14 sm:h-16 bg-white/50 backdrop-blur-md border-pink-200/50 text-slate-700 hover:bg-white/70 hover:border-pink-300/50 transition-all duration-300 font-medium"
              asChild
            >
              <Link href="#how-it-works">
                See How It Works
              </Link>
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center gap-3 sm:gap-6"
          >
            <div className="flex -space-x-2">
              {["R", "A", "S", "P"].map((letter, i) => (
                <div
                  key={i}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">
                Loved by 1000+ people across India
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-medium">Discover</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-slate-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HOW IT WORKS — 3-Step Journey
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="how-it-works" className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="hk-badge mb-4 sm:mb-6 mx-auto">
              <Zap className="w-3.5 h-3.5" />
              <span>Simple & Beautiful</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="hk-section-title">
              Three Steps to{" "}
              <span className="text-gradient">Magic</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="hk-section-subtitle">
              Creating an emotional surprise takes less than 5 minutes
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            {/* Connecting Line (desktop only) */}
            <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-pink-200/50 via-purple-200/50 to-pink-200/50 z-0" />

            {STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={scaleIn}
                custom={index}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Step Number + Icon */}
                <div className="relative mb-6 sm:mb-8">
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl ${step.bg} flex items-center justify-center shadow-luxury group-hover:shadow-luxury-md transition-all duration-500 group-hover:scale-105`}>
                    <step.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${step.iconColor}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-playfair mb-2 sm:mb-3 text-slate-900">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TEMPLATES — Experience Showcase
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="templates" className="section-padding relative">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-10 sm:mb-14"
          >
            <motion.div variants={fadeUp} custom={0} className="hk-badge mb-4 sm:mb-6 mx-auto">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Handcrafted Experiences</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="hk-section-title">
              Choose Your{" "}
              <span className="text-gradient">Experience</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="hk-section-subtitle">
              Each experience is a mini movie — with music, animations, interactions, and emotion
            </motion.p>
          </motion.div>

          {/* Category Filter Tabs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 sm:justify-center scrollbar-hide px-1"
          >
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 touch-target ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md glow-button"
                    : "bg-white/60 backdrop-blur-md text-slate-600 hover:bg-white/80 hover:text-pink-600 border border-pink-100/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Template Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
            >
              {filteredTemplates.map((template, index) => (
                <TemplateCard key={template.id} template={template} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PRICING — Simple & Transparent
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="pricing" className="section-padding relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center"
          >
            <motion.div variants={fadeUp} custom={0} className="hk-badge mb-4 sm:mb-6 mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent Pricing</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="hk-section-title mb-6 sm:mb-10">
              One Price.{" "}
              <span className="text-gradient">Infinite Love.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="relative"
          >
            {/* Glow Effect Behind Card */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-[2.5rem] blur-3xl" />

            <div className="relative glass-card rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-center overflow-hidden">
              {/* Gold Corner Accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-200/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-200/20 to-transparent" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200/50 text-amber-700 text-xs font-bold tracking-wide mb-6 sm:mb-8">
                  <Star className="w-3 h-3 fill-current" />
                  MOST POPULAR
                </div>

                <div className="flex items-end justify-center gap-2 mb-3 sm:mb-4">
                  <span className="text-slate-400 line-through text-lg sm:text-xl font-medium">₹499</span>
                  <span className="text-5xl sm:text-7xl md:text-8xl font-bold text-gradient font-playfair">₹99</span>
                </div>
                <p className="text-slate-500 text-base sm:text-lg font-medium mb-8 sm:mb-10">
                  per surprise • one-time payment • lives forever
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto mb-8 sm:mb-10 text-left">
                  {[
                    { icon: Heart, text: "Interactive emotional experience" },
                    { icon: Globe, text: "Permanent surprise page" },
                    { icon: MessageCircleHeart, text: "Custom photos & messages" },
                    { icon: Clock, text: "Create in under 5 minutes" },
                    { icon: Shield, text: "Secure & private" },
                    { icon: Send, text: "Easy sharing via link" },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-4 h-4 text-pink-500" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-700 font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-base sm:text-lg px-10 h-14 sm:h-16 glow-button hover:scale-[1.02] active:scale-[0.97] transition-all font-semibold"
                  asChild
                >
                  <Link href="#templates">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Create Your Surprise
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TESTIMONIALS — Real Love Stories
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-10 sm:mb-14"
          >
            <motion.div variants={fadeUp} custom={0} className="hk-badge mb-4 sm:mb-6 mx-auto">
              <Quote className="w-3.5 h-3.5" />
              <span>Real Love Stories</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="hk-section-title">
              What People{" "}
              <span className="text-gradient">Feel</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="hk-section-subtitle">
              Real reactions from people who created surprises for their loved ones
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={scaleIn}
                custom={index}
                className="glass-card-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-pink-100/30">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-800">{testimonial.name}</p>
                    <p className="text-xs text-pink-500 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FAQ — Common Questions
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-padding relative">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-10 sm:mb-14"
          >
            <motion.h2 variants={fadeUp} custom={0} className="hk-section-title">
              Common{" "}
              <span className="text-gradient">Questions</span>
            </motion.h2>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index * 0.5}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full glass-card rounded-2xl p-5 sm:p-6 text-left transition-all duration-300 hover:bg-white/70 group touch-target"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-sm sm:text-base text-slate-800 pr-4">
                      {faq.q}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center group-hover:bg-pink-100 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-pink-500" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-3 sm:mt-4 pr-12">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FINAL CTA — Create Your Story
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-padding-lg relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-400 fill-pink-400 mx-auto mb-6 sm:mb-8 animate-heartbeat" />
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-5xl md:text-6xl font-bold font-playfair text-slate-900 mb-4 sm:mb-6 text-balance">
              Ready to make someone feel{" "}
              <span className="shimmer-text">truly special</span>?
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-base sm:text-xl text-slate-500 mb-8 sm:mb-10 max-w-2xl mx-auto">
              It takes less than 5 minutes to create a surprise they'll remember forever.
            </motion.p>
            <motion.div variants={fadeUp} custom={3}>
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-base sm:text-lg px-10 h-14 sm:h-16 glow-button hover:scale-[1.02] active:scale-[0.97] transition-all font-semibold"
                asChild
              >
                <Link href="#templates">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create Surprise — ₹99
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* ─────────────────────────────────
   Template Card Component
   ───────────────────────────────── */
function TemplateCard({ template, index }: { template: Template; index: number }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      custom={index}
      className="group hk-card flex flex-col"
    >
      {/* Cover Image */}
      <div className="aspect-[4/3] w-full overflow-hidden relative">
        <img
          src={template.coverImage}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 hk-badge">
          {template.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <h3 className="text-xl sm:text-2xl font-bold font-playfair mb-2 text-slate-900 group-hover:text-pink-700 transition-colors">
          {template.name}
        </h3>
        <p className="text-slate-500 text-sm sm:text-base flex-1 mb-6 leading-relaxed line-clamp-2">
          {template.description}
        </p>

        <div className="flex flex-col gap-4 mt-auto">
          {/* Price */}
          <div className="flex items-center justify-between border-t border-pink-100/30 pt-4">
            <span className="text-slate-400 line-through text-sm font-medium">₹{template.originalPrice}</span>
            <span className="text-xl sm:text-2xl font-bold text-gradient">₹{template.price}</span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <Button
              variant="outline"
              className="w-full rounded-full gap-1.5 sm:gap-2 font-semibold border-pink-200 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition-all h-11 sm:h-12 text-sm press-effect"
              asChild
            >
              <Link href={template.previewUrl} target="_blank">
                <PlayCircle className="w-4 h-4" /> Preview
              </Link>
            </Button>
            <Button
              className="w-full rounded-full gap-1.5 sm:gap-2 font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-[1.02] active:scale-[0.97] shadow-md transition-all h-11 sm:h-12 text-sm"
              asChild
            >
              <Link href={template.createUrl}>
                <PenTool className="w-4 h-4" /> Create
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
