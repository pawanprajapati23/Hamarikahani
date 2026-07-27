import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { Heart, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-pink-100/50 bg-gradient-to-b from-transparent to-pink-50/30 py-16 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="HamariKahani" width={28} height={28} className="rounded-md" />
              <span className="font-playfair font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">HamariKahani</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Create beautiful digital surprises for the people you love. Every emotion deserves a story.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/" className="hover:text-pink-600 transition-colors">Home</Link></li>
              <li><Link href="/#templates" className="hover:text-pink-600 transition-colors">Templates</Link></li>
              <li><Link href="/auth/login" className="hover:text-pink-600 transition-colors">Sign In</Link></li>
              <li><Link href="/dashboard" className="hover:text-pink-600 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/privacy" className="hover:text-pink-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-pink-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-pink-600 transition-colors">Refund Policy</Link></li>
              <li><Link href="/contact" className="hover:text-pink-600 transition-colors">Contact Us</Link></li>
            </ul>
            <div className="pt-2">
              <a href="https://instagram.com/hamarikahani" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-pink-600 transition-colors">
                <Instagram className="w-4 h-4" /> @hamarikahani
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-pink-100/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} HamariKahani. All rights reserved.
          </p>
          <p className="text-sm text-slate-400 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-pink-400 fill-pink-400" /> in India
          </p>
        </div>
      </Container>
    </footer>
  );
}
