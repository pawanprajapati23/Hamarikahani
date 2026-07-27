import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AppProvider } from "@/providers/app-provider";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1b2a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    template: "%s | HamariKahani",
    default: "HamariKahani - Premium Digital Storytelling",
  },
  description: "Create beautiful, personalized surprise pages for your loved ones.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hamarikahani.in",
    siteName: "HamariKahani",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HamariKahani - Premium Digital Storytelling",
    description: "Create beautiful, personalized surprise pages for your loved ones.",
  },
  metadataBase: new URL("https://hamarikahani.in"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[hsl(340,20%,98%)] font-sans antialiased relative">
        <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-pink-200/20 blur-[150px] rounded-full pointer-events-none z-0" />
        <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-200/15 blur-[150px] rounded-full pointer-events-none z-0" />
        <FloatingHearts />
        <div className="relative z-10">
          <AppProvider>{children}</AppProvider>
        </div>
      </body>
    </html>
  );
}
