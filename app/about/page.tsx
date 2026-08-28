import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Hamarikahani.in - Founded by Pawan Prajapati',
  description: 'Learn about Hamarikahani.in, the premier automated job platform connecting top talent with the best opportunities. Founded by Pawan Prajapati.',
};

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "HamariKahani",
      "url": "https://hamarikahani.in",
      "logo": "https://hamarikahani.in/logo.png",
      "founder": {
        "@type": "Person",
        "name": "Pawan Prajapati",
        "email": "diplomawithbtech@gmail.com",
        "jobTitle": "Founder & CEO",
        "url": "https://hamarikahani.in/about"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "diplomawithbtech@gmail.com",
        "contactType": "customer support"
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            About <span className="text-blue-600">HamariKahani.in</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We are building the future of automated job discovery. Our platform connects thousands of job seekers with real-time opportunities using cutting-edge AI technology.
          </p>
        </div>

        {/* Corporate Mission */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Finding the right job shouldn't be a manual, exhausting process. At HamariKahani.in, we believe in utilizing advanced AI and intelligent scraping algorithms to curate the freshest, most relevant opportunities the internet has to offer, delivering them directly to our users in real-time.
              </p>
              <ul className="space-y-4">
                {['100% Automated Discovery', 'SEO-Optimized Job Listings', 'Verified Corporate Postings'].map(item => (
                  <li key={item} className="flex items-center text-slate-700 font-medium">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-8 text-center border border-blue-100">
               <h3 className="text-4xl font-black text-blue-600 mb-2">30K+</h3>
               <p className="text-slate-600 font-medium mb-6">Jobs Processed Monthly</p>
               
               <h3 className="text-4xl font-black text-blue-600 mb-2">100%</h3>
               <p className="text-slate-600 font-medium">AI-Driven Pipeline</p>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-2 bg-blue-600 p-8 md:p-12 flex flex-col justify-center items-center text-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-5xl mb-6 shadow-inner">
                PP
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Pawan Prajapati</h2>
              <p className="text-blue-200 font-medium tracking-wide uppercase text-sm">Founder & CEO</p>
            </div>
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-4">Leadership Vision</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                "HamariKahani was built out of a necessity to bridge the gap between talented professionals and rapidly opening positions across top startups and enterprises. By leveraging state-of-the-art AI models, we're ensuring that our users are always the first to know when their dream job goes live."
              </p>
              <div className="border-t border-slate-700 pt-6">
                <p className="text-slate-400 text-sm mb-1">Get in touch directly:</p>
                <a href="mailto:diplomawithbtech@gmail.com" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  diplomawithbtech@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
