import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";
import { createClient } from "@/lib/supabase/server";
import { User } from "lucide-react";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 w-full bg-white/70 backdrop-blur-2xl border-b border-pink-100/50 z-40 transition-all">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-transform hover:opacity-80 active:scale-95" aria-label="HamariKahani Home">
            <Image src="/logo.png" alt="HamariKahani Logo" width={28} height={28} className="rounded-md" />
            <span className="font-playfair font-bold text-2xl tracking-tight bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">HamariKahani</span>
          </Link>
          
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
            <Link href="/#templates" className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">Templates</Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">How It Works</Link>
            <Link href="/#pricing" className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">Pricing</Link>
          </nav>

          {/* Auth Actions */}
          <nav className="flex items-center gap-3" aria-label="User Actions">
            {user ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2 bg-pink-50 rounded-full pl-2 pr-4 py-1.5 border border-pink-100 hover:bg-pink-100/50 transition-colors cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || "User"}
                  </span>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-medium text-slate-600 hover:text-pink-600 transition-colors">
                  Sign In
                </Link>
                <Button asChild size="sm" className="hidden sm:inline-flex">
                  <Link href="/auth/signup">✨ Create Surprise</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}
