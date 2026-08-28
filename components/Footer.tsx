import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-auto border-t-4 border-orange-500">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/favicon.svg" alt="Logo" className="w-6 h-6 object-contain rounded opacity-90" />
            <h3 className="font-bold text-lg text-blue-200">HamaraKahani <span className="text-orange-500">Jobs</span></h3>
          </div>
          <p className="text-gray-400 text-sm">
            Find the Right Job Near You in Noida, Greater Noida & Gurugram.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-200">Top Locations</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/jobs/noida" className="hover:text-orange-400 transition-colors">Jobs in Noida</Link></li>
            <li><Link href="/jobs/greater-noida" className="hover:text-orange-400 transition-colors">Jobs in Greater Noida</Link></li>
            <li><Link href="/jobs/gurugram" className="hover:text-orange-400 transition-colors">Jobs in Gurugram</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-200">Categories</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/jobs?category=it" className="hover:text-orange-400 transition-colors">IT & Software</Link></li>
            <li><Link href="/jobs?category=bpo" className="hover:text-orange-400 transition-colors">BPO / Customer Support</Link></li>
            <li><Link href="/jobs?category=fresher" className="hover:text-orange-400 transition-colors">Fresher Jobs</Link></li>
            <li><Link href="/jobs?category=internship" className="hover:text-orange-400 transition-colors">Internships</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-200">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/privacy-policy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-orange-400 transition-colors">Terms of Use</Link></li>
            <li><Link href="/disclaimer" className="hover:text-orange-400 transition-colors">Disclaimer</Link></li>
            <li><Link href="/contact" className="hover:text-orange-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-700 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} HamaraKahani.in. All rights reserved.
      </div>
    </footer>
  );
}
