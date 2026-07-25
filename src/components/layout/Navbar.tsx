import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "./Container";

export function Navbar() {
  return (
    <header className="sticky top-0 w-full border-b border-foreground/5 bg-background/80 backdrop-blur-md z-40 transition-colors">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95" aria-label="HamariKahani Home">
            <Image src="/logo.png" alt="HamariKahani Logo" width={28} height={28} className="rounded-md" />
            <span className="font-playfair font-bold text-xl tracking-tight text-foreground">HamariKahani</span>
          </Link>
          
          {/* Navigation Actions */}
          <nav className="flex items-center gap-4" aria-label="Primary Navigation">
            <Link href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 py-1">
              Sign In
            </Link>
            <Button asChild size="sm" className="hidden sm:inline-flex rounded-full">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
