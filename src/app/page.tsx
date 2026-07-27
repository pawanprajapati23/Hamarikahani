import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomeContent } from "@/features/marketing/components/HomeContent";

export const metadata: Metadata = {
  title: "HamariKahani — Create Magical Digital Surprises for Your Loved Ones",
  description: "Choose a cinematic experience, add your photos, messages & music, and share a beautiful link that makes them smile, cry, laugh — and remember it forever. Just ₹99.",
  keywords: ["digital surprise", "birthday surprise", "valentine surprise", "anniversary gift", "love letter", "HamariKahani", "surprise page"],
  openGraph: {
    title: "HamariKahani — Make Someone Feel Loved Today",
    description: "Create a stunning digital surprise for your loved one in minutes. Interactive, cinematic, unforgettable. Just ₹99.",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HomeContent />
      <Footer />
    </>
  );
}
