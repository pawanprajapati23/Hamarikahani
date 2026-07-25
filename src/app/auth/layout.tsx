import { ReactNode } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Mobile-first centered content area */}
      <main className="flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-sm mx-auto space-y-8 relative z-10">
          {children}
        </div>
      </main>

      {/* Desktop-only premium brand presentation */}
      <aside className="hidden lg:flex flex-col justify-between bg-primary/10 p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,transparent,hsl(var(--primary)/0.2))] z-0" />
        
        <Link href="/" className="relative z-10 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 w-fit">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="font-playfair font-bold text-2xl tracking-tight text-foreground">HamariKahani</span>
        </Link>
        
        <div className="relative z-10 space-y-6">
          <h1 className="font-playfair text-5xl font-bold leading-tight text-foreground">
            Every story <br/>
            deserves to be told <br/>
            beautifully.
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Create an emotional, premium digital surprise for the people you love the most in just a few minutes.
          </p>
        </div>
      </aside>
    </div>
  );
}
