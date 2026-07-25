import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-foreground/5 bg-background py-12 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="HamariKahani Logo" width={28} height={28} className="rounded-md opacity-80 hover:opacity-100 transition-opacity" />
            <span className="font-playfair font-bold text-xl tracking-tight text-foreground">HamariKahani</span>
          </div>
          
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground/60">
          <p>&copy; {new Date().getFullYear()} HamariKahani. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
