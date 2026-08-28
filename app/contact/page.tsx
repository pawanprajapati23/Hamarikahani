import { Metadata } from 'next';
import { Mail, MapPin, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Hamarikahani.in',
  description: 'Get in touch with the team at Hamarikahani.in for business inquiries, support, and partnerships.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Contact Our Team</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you're an enterprise looking to partner with us, or a user needing support, our executive team is here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Email Us</h3>
            <p className="text-slate-500 text-sm mb-4">For direct inquiries, reach out to our CEO.</p>
            <a href="mailto:diplomawithbtech@gmail.com" className="text-blue-600 font-medium hover:underline break-all">
              diplomawithbtech@gmail.com
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Corporate Leadership</h3>
            <p className="text-slate-500 text-sm mb-4">Pawan Prajapati</p>
            <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-semibold">Founder & CEO</span>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Headquarters</h3>
            <p className="text-slate-500 text-sm">
              Noida, Uttar Pradesh<br/>
              India
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="john@company.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none" placeholder="Your message here..."></textarea>
              </div>
              <button type="button" className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/30">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
