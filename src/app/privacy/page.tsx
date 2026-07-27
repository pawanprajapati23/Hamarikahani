import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Privacy Policy - HamariKahani',
  description: 'Privacy Policy for HamariKahani digital surprise platform',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/50 via-white to-purple-50/50">
      <Navbar />
      <main className="flex-grow py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-100/50">
            <div className="mb-10 text-center">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Privacy Policy
              </h1>
              <p className="text-sm text-slate-500">Last Updated: July 2026</p>
            </div>

            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  1. Information We Collect
                </h2>
                <p className="mb-3">
                  At HamariKahani, we collect information that helps us provide our digital surprise platform services to you. This includes:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Personal Information:</strong> Your name and email address when you create an account or make a purchase.</li>
                  <li><strong>Payment Information:</strong> Processed securely via Razorpay. We do not store your full credit card details.</li>
                  <li><strong>Content Data:</strong> Images, text, and messages you upload to create your digital surprises.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="mb-3">We use the information we collect to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Provide, maintain, and improve our services.</li>
                  <li>Process transactions and send related information, including confirmations and receipts.</li>
                  <li>Send technical notices, updates, security alerts, and support messages.</li>
                  <li>Respond to your comments, questions, and customer service requests.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  3. Third-Party Services
                </h2>
                <p className="mb-3">
                  We use trusted third-party services to ensure the best experience and security:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Supabase:</strong> For secure database and user authentication.</li>
                  <li><strong>Razorpay:</strong> For secure payment processing.</li>
                  <li><strong>Cloudinary:</strong> For storing and serving uploaded images securely.</li>
                  <li><strong>Vercel:</strong> For hosting and delivering our platform.</li>
                </ul>
                <p className="mt-3">
                  These services have their own privacy policies addressing how they use your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  4. Cookies and Tracking
                </h2>
                <p>
                  We use cookies to improve your experience on our site, analyze site usage, and assist in our marketing efforts. You can control cookies through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  5. Data Retention
                </h2>
                <p>
                  We retain personal information we collect from you where we have an ongoing legitimate business need to do so (for example, to provide you with a service you have requested or to comply with applicable legal, tax, or accounting requirements).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  6. Your Privacy Rights
                </h2>
                <p>
                  You have the right to access, update, or delete your personal information. If you wish to exercise any of these rights, please contact us at the email address provided below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  7. Contact Information
                </h2>
                <p>
                  If you have any questions or concerns about our Privacy Policy or data practices, please contact:
                </p>
                <div className="mt-4 p-4 bg-pink-50/50 rounded-xl border border-pink-100">
                  <p><strong>Name:</strong> Pawan Prajapati</p>
                  <p><strong>Email:</strong> <a href="mailto:diplomawithbtech@gmail.com" className="text-pink-600 hover:text-pink-700 font-medium transition-colors">diplomawithbtech@gmail.com</a></p>
                  <p><strong>Website:</strong> <a href="https://hamarikahani.in" className="text-pink-600 hover:text-pink-700 font-medium transition-colors">https://hamarikahani.in</a></p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
