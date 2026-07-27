"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";
import type { User } from "@supabase/supabase-js";
import { cn } from "@/utils/cn";

interface NavbarClientProps {
  user: User | null;
}

export function NavbarClient({ user }: NavbarClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Templates", href: "/#templates" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Pricing", href: "/#pricing" },
  ];

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "glass-navbar-scrolled"
          : "glass-navbar"
      )}
    >
      <Container>
        <div className="flex h-16 md:h-18 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform hover:opacity-80 active:scale-95 z-50 relative"
            aria-label="HamariKahani Home"
            onClick={closeMenu}
          >
            <Image
              src="/logo.png"
              alt="HamariKahani Logo"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="font-playfair font-bold text-2xl tracking-tight bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              HamariKahani
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Actions & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-3" aria-label="User Actions">
              {user ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 bg-pink-50 rounded-full pl-2 pr-4 py-1.5 border border-pink-100 hover:bg-pink-100/50 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                    {user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}
                  </span>
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Button asChild size="sm" className="rounded-full glow-button bg-gradient-to-r from-pink-500 to-purple-500 border-0 hover:opacity-90">
                    <Link href="/auth/signup">✨ Create Surprise</Link>
                  </Button>
                </>
              )}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-full hover:bg-slate-100 transition-colors z-50 relative"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-5 h-4 flex flex-col justify-between relative">
                <motion.span
                  className="w-full h-[2px] bg-slate-800 rounded-full block origin-left"
                  animate={isMobileMenuOpen ? { rotate: 45, y: -2, x: 2 } : { rotate: 0, y: 0, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-full h-[2px] bg-slate-800 rounded-full block"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="w-full h-[2px] bg-slate-800 rounded-full block origin-left"
                  animate={isMobileMenuOpen ? { rotate: -45, y: 2, x: 2 } : { rotate: 0, y: 0, x: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl md:hidden pt-20 px-5 flex flex-col min-h-[100dvh]"
          >
            <div className="flex-1 flex flex-col">
              <nav className="flex flex-col items-center gap-6 mt-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center justify-center min-h-[56px] text-2xl font-medium text-slate-800 hover:text-pink-600 transition-colors w-full"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-auto mb-12 flex flex-col gap-4 w-full"
              >
                {user ? (
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-3 bg-pink-50 rounded-full py-4 border border-pink-100 hover:bg-pink-100/50 transition-colors w-full"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-medium text-slate-700">
                      {user.user_metadata?.full_name || user.email?.split("@")[0] || "User"} Dashboard
                    </span>
                  </Link>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full rounded-full min-h-[56px] text-lg border-pink-200 text-pink-600 hover:bg-pink-50"
                    >
                      <Link href="/auth/login" onClick={closeMenu}>
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      className="w-full rounded-full min-h-[56px] text-lg glow-button bg-gradient-to-r from-pink-500 to-purple-500 border-0 hover:opacity-90"
                    >
                      <Link href="/auth/signup" onClick={closeMenu}>
                        ✨ Create Surprise
                      </Link>
                    </Button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
