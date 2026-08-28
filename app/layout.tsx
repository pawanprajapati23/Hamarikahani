import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'HamaraKahani Jobs | Find the Right Job Near You',
    template: '%s | HamaraKahani Jobs'
  },
  description: 'Find top jobs in Noida, Greater Noida, and Gurugram. We discover and aggregate the best IT, BPO, fresher, and local jobs from trusted sources.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'HamaraKahani Jobs',
    description: 'Find top jobs in Noida, Greater Noida, and Gurugram.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50" suppressHydrationWarning>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
