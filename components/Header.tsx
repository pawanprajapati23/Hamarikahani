import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="border-b bg-white border-orange-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl flex items-center gap-2 text-blue-700">
          <img src="/favicon.svg" alt="Logo" className="w-8 h-8 object-contain rounded" />
          HamaraKahani <span className="text-orange-600">Jobs</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/jobs" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Browse Jobs</Link>
          <Link href="/jobs/noida" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Noida</Link>
          <Link href="/jobs/gurugram" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Gurugram</Link>
          <Link href="/admin" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Admin</Link>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button could go here */}
        </div>
      </div>
    </header>
  );
}
