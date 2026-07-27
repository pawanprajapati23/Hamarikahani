import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Terms of Service - HamariKahani',
  description: 'Terms of Service for HamariKahani digital surprise platform',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/50 via-white to-purple-50/50">
      <Navbar />
      <main className="flex-grow py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-100/50">
            <div className="mb-10 text-center">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Terms of Service
              </h1>
              <p className="text-sm text-slate-500">Last Updated: July 2026</p>
            </div>

            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using HamariKahani (https://hamarikahani.in), you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  2. Description of Service
                </h2>
                <p>
                  HamariKahani is a digital surprise platform that allows users to create personalized web pages for special occasions, such as birthdays, anniversaries, and romantic surprises. We provide the tools, templates, and hosting for these digital experiences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  3. User Accounts
                </h2>
                <p>
                  To use certain features of the service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  4. Payments and Pricing
                </h2>
                <p>
                  Our digital surprise pages are priced at ₹99 per template. As these are digital products, once purchased and generated, the payment is non-refundable (subject to exceptions noted in our Refund Policy). All payments are processed securely through Razorpay.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  5. Content Guidelines
                </h2>
                <p className="mb-3">
                  You are solely responsible for the content you upload to HamariKahani. You agree not to upload, post, or otherwise transmit any content that:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, or obscene.</li>
                  <li>Infringes any patent, trademark, trade secret, copyright, or other proprietary rights of any party.</li>
                  <li>Contains software viruses or any other computer code designed to interrupt, destroy, or limit the functionality of any computer software.</li>
                </ul>
                <p className="mt-3">We reserve the right to remove any content that violates these guidelines without notice.</p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  6. Intellectual Property
                </h2>
                <p>
                  The service and its original content, features, and functionality are owned by HamariKahani and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  7. Limitation of Liability
                </h2>
                <p>
                  In no event shall HamariKahani, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  8. Termination
                </h2>
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  9. Contact Us
                </h2>
                <p>
                  If you have any questions about these Terms, please contact us:
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
