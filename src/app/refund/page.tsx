import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Refund Policy - HamariKahani',
  description: 'Refund Policy for HamariKahani digital surprise platform',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50/50 via-white to-purple-50/50">
      <Navbar />
      <main className="flex-grow py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-100/50">
            <div className="mb-10 text-center">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Refund Policy
              </h1>
              <p className="text-sm text-slate-500">Last Updated: July 2026</p>
            </div>

            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  1. Nature of Our Products
                </h2>
                <p>
                  At HamariKahani, we offer customizable digital surprise templates. Because our products are entirely digital and immediately accessible upon link generation, we generally cannot offer refunds once a product has been purchased and the unique link has been successfully generated.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  2. Refund Exceptions
                </h2>
                <p className="mb-3">
                  We stand by the quality of our platform. However, we understand that issues may occasionally arise. Refunds may be granted under the following circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Technical Issues:</strong> If you paid but the link failed to generate or the final page is completely broken due to a bug on our platform.</li>
                  <li><strong>Payment Errors:</strong> If you were double-charged for a single transaction due to a payment gateway error.</li>
                </ul>
                <p className="mt-3">
                  Refunds will <strong>not</strong> be granted for user errors, such as typos in the content provided, uploading incorrect images, or simply changing your mind after the link is generated.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  3. How to Request a Refund
                </h2>
                <p className="mb-3">
                  To request a refund under the exceptions listed above, please follow these steps:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Contact us at <a href="mailto:diplomawithbtech@gmail.com" className="text-pink-600 hover:text-pink-700 font-medium transition-colors">diplomawithbtech@gmail.com</a> within 3 days of purchase.</li>
                  <li>Include your full name and the email address used for the purchase.</li>
                  <li>Provide your Razorpay transaction ID.</li>
                  <li>Clearly explain the technical issue or payment error, including screenshots if applicable.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  4. Processing Time
                </h2>
                <p>
                  If your refund request is approved, we will initiate a refund to your original method of payment. You will receive the credit within 5-7 business days, depending on your card issuer's policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-playfair font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  5. Contact Information
                </h2>
                <p>
                  For any questions regarding our Refund Policy, please get in touch:
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
