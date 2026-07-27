import { ReactNode } from "react";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[hsl(340,20%,98%)] relative">
      {/* Background blobs for mobile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none lg:hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl" />
      </div>

      {/* Mobile-first centered content area */}
      <main className="flex items-center justify-center p-6 sm:p-12 lg:p-16 relative z-10">
        <div className="w-full max-w-sm mx-auto space-y-8">
          {children}
        </div>
      </main>

      {/* Desktop-only premium brand presentation */}
      <aside className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-pink-50 to-purple-50 p-16 relative overflow-hidden border-l border-pink-100">
        {/* Floating decorative elements */}
        <div className="absolute top-20 right-20 text-pink-300/40 animate-pulse">
          <Heart className="w-24 h-24" />
        </div>
        <div className="absolute bottom-40 left-20 text-purple-300/40 animate-pulse" style={{ animationDelay: "1s" }}>
          <Sparkles className="w-16 h-16" />
        </div>

        <Link href="/" className="relative z-10 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 w-fit">
          <Sparkles className="w-6 h-6 text-pink-600" />
          <span className="font-playfair font-bold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">HamariKahani</span>
        </Link>
        
        <div className="relative z-10 space-y-6">
          <h1 className="font-playfair text-5xl font-bold leading-tight text-slate-900">
            Every story <br/>
            deserves to be told <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 italic">beautifully.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-md leading-relaxed">
            Create an emotional, premium digital surprise for the people you love the most in just a few minutes.
          </p>
        </div>
      </aside>
    </div>
  );
}
