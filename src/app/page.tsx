import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { HeroSection } from "@/features/marketing/components/HeroSection";
import { HowItWorksSection } from "@/features/marketing/components/HowItWorksSection";
import { CategoriesSection } from "@/features/marketing/components/CategoriesSection";
import { ThemesSection } from "@/features/marketing/components/ThemesSection";
import { TestimonialsSection } from "@/features/marketing/components/TestimonialsSection";
import { FAQSection } from "@/features/marketing/components/FAQSection";
import { faqData } from "@/features/marketing/constants/faq";
import { CTASection } from "@/features/marketing/components/CTASection";

export const metadata: Metadata = {
  title: "HamariKahani - Premium Digital Storytelling",
  description: "Create beautiful, personalized surprise pages for your loved ones.",
  openGraph: {
    title: "HamariKahani",
    description: "Create beautiful, personalized surprise pages for your loved ones.",
    url: "https://hamarikahani.in",
    siteName: "HamariKahani",
    images: [
      {
        url: "https://hamarikahani.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HamariKahani Preview Image",
      }
    ],
    locale: "en_IN",
    type: "website",
  }
};

export default function HomePage() {
  // Structured Data (JSON-LD) for Search Engines
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "HamariKahani",
      url: "https://hamarikahani.in",
      description: "Premium digital storytelling platform for emotional surprises.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://hamarikahani.in/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <ScrollProgress />
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <HowItWorksSection />
        <CategoriesSection />
        <ThemesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
