import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { Mail, Clock, MapPin, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - HamariKahani',
  description: 'Get in touch with HamariKahani digital surprise platform',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/50 via-white to-purple-50/50">
      <Navbar />
      <main className="flex-grow py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-100/50">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-slate-600">
                Have questions about creating a beautiful digital surprise? We're here to help make your special moments even more memorable.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-pink-50/50 rounded-2xl border border-pink-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center text-pink-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-playfair font-semibold text-xl text-slate-800 mb-2">Email Us</h3>
                  <a href="mailto:diplomawithbtech@gmail.com" className="text-pink-600 hover:text-pink-700 font-medium transition-colors break-all">
                    diplomawithbtech@gmail.com
                  </a>
                </div>
              </div>

              <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-100 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-playfair font-semibold text-xl text-slate-800 mb-2">Response Time</h3>
                  <p className="text-slate-600">
                    We aim to respond to all inquiries within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center text-pink-600">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-playfair font-semibold text-xl text-slate-800 mb-2">Business Info</h3>
                  <p className="text-slate-600">HamariKahani - Digital Surprise Platform</p>
                  <p className="text-slate-600">Managed by: Pawan Prajapati</p>
                  <a href="https://hamarikahani.in" className="text-pink-600 hover:text-pink-700 font-medium transition-colors mt-2 inline-block">
                    https://hamarikahani.in
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-playfair font-bold text-center bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-8">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="p-5 border border-pink-100 rounded-2xl bg-white/50">
                  <h3 className="font-semibold text-slate-800 mb-2">How quickly is my digital surprise ready?</h3>
                  <p className="text-slate-600">Your custom webpage is generated instantly as soon as you complete the payment and finalizes your design.</p>
                </div>
                
                <div className="p-5 border border-pink-100 rounded-2xl bg-white/50">
                  <h3 className="font-semibold text-slate-800 mb-2">Can I edit my page after creating it?</h3>
                  <p className="text-slate-600">Currently, pages are finalized once generated to ensure the link works perfectly. Please double-check all text and photos before completing your purchase.</p>
                </div>
                
                <div className="p-5 border border-pink-100 rounded-2xl bg-white/50">
                  <h3 className="font-semibold text-slate-800 mb-2">How long will the link remain active?</h3>
                  <p className="text-slate-600">Your unique digital surprise link will remain active indefinitely on our platform.</p>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
