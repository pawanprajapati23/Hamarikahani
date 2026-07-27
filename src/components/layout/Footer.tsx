import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { Heart, Instagram, Mail, ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden animate-fade-in-up">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-300 to-purple-300 opacity-50" />
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-50/30 pointer-events-none -z-10" />

      <Container className="pt-16 pb-safe sm:pb-8 lg:pt-24">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 text-center sm:text-left">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-luxury-md group-hover:shadow-luxury transition-all duration-300 border border-white/60">
                <Image 
                  src="/logo.png" 
                  alt="HamariKahani Logo" 
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <span className="font-playfair font-bold text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                HamariKahani
              </span>
            </Link>
            
            <p className="text-slate-500/90 leading-relaxed max-w-sm font-inter text-base">
              Because some emotions are too beautiful to stay hidden. Craft digital experiences that make them smile, cry, and feel truly loved.
            </p>

            <a 
              href="https://instagram.com/hamarikahani" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center sm:justify-start gap-2.5 text-slate-500 hover:text-pink-600 transition-colors duration-300 group py-2"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 border border-pink-100 shadow-sm group-hover:shadow-md group-hover:border-pink-200 transition-all text-pink-500">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="font-medium text-sm flex items-center gap-1.5">
                Follow our story <Heart className="w-3.5 h-3.5 text-pink-400 group-hover:fill-pink-400 transition-colors duration-300" />
              </span>
            </a>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 flex flex-col items-center sm:items-start space-y-5">
            <h4 className="font-playfair font-semibold text-lg text-slate-800">Explore</h4>
            <ul className="flex flex-col space-y-1 w-full items-center sm:items-start">
              {[
                { name: "Home", href: "/" },
                { name: "Templates", href: "/#templates" },
                { name: "How It Works", href: "/how-it-works" },
                { name: "Pricing", href: "/pricing" },
                { name: "Dashboard", href: "/dashboard" },
              ].map((link) => (
                <li key={link.name} className="w-full">
                  <Link 
                    href={link.href} 
                    className="inline-flex items-center justify-center sm:justify-start w-full min-h-[44px] text-slate-500 hover:text-pink-600 sm:hover:translate-x-1 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 flex flex-col items-center sm:items-start space-y-5">
            <h4 className="font-playfair font-semibold text-lg text-slate-800">Legal</h4>
            <ul className="flex flex-col space-y-1 w-full items-center sm:items-start">
              {[
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Refund Policy", href: "/refund" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name} className="w-full">
                  <Link 
                    href={link.href} 
                    className="inline-flex items-center justify-center sm:justify-start w-full min-h-[44px] text-slate-500 hover:text-pink-600 sm:hover:translate-x-1 transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start space-y-5 bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 sm:p-8 shadow-luxury-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-110" />
            
            <h4 className="font-playfair font-semibold text-xl text-slate-800">
              Create your first surprise
            </h4>
            <p className="text-sm text-slate-500/90 leading-relaxed text-center sm:text-left">
              Join us to craft unforgettable digital emotional experiences. Get inspiration and exclusive early access.
            </p>
            
            <form className="w-full flex flex-col gap-3 mt-2">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full h-12 pl-11 pr-4 rounded-full bg-white/70 border border-pink-100/50 focus:border-pink-300 focus:ring-2 focus:ring-pink-200/50 focus:outline-none transition-all placeholder:text-slate-400 text-slate-700 shadow-inner"
                  required
                />
              </div>
              <button 
                type="button"
                className="group/btn relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-luxury hover:shadow-luxury-md transition-all duration-300 active:scale-[0.98]"
              >
                <span className="font-medium tracking-wide">Start Creating</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative pt-8 border-t border-white/30 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500 font-medium">
            &copy; {currentYear} HamariKahani. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 text-sm text-slate-600 shadow-sm transition-all hover:shadow-md hover:bg-white/60">
            <span>Made with</span>
            <span className="animate-heartbeat flex items-center justify-center">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            </span>
            <span>in India</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
