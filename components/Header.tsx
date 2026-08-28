import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl flex items-center gap-2 text-slate-900 tracking-tight">
          <Image src="/logo.png" alt="HamaraKahani Logo" width={32} height={32} className="object-contain rounded" />
          HamaraKahani <span className="text-blue-600">Jobs</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link href="/jobs" className="text-sm text-slate-600 hover:text-blue-600 font-semibold transition-colors">Browse Jobs</Link>
          <Link href="/about" className="text-sm text-slate-600 hover:text-blue-600 font-semibold transition-colors">About Us</Link>
          <Link href="/contact" className="text-sm text-slate-600 hover:text-blue-600 font-semibold transition-colors">Contact</Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/jobs" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2 px-5 rounded-full transition-all shadow-md">
            Find Jobs
          </Link>
        </div>
      </div>
    </header>
  );
}
