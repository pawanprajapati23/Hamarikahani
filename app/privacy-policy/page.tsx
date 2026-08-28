export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose max-w-none text-gray-700 space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold text-gray-900 mt-6">1. Introduction</h2>
        <p>Welcome to HamaraKahani Jobs ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.</p>
        
        <h2 className="text-xl font-semibold text-gray-900 mt-6">2. Information We Collect</h2>
        <p>We only collect information necessary to provide our services. We do not require you to create an account to search for jobs. When you click on a job to apply, you are redirected to the original employer or source's website, where their respective privacy policies apply.</p>
        
        <h2 className="text-xl font-semibold text-gray-900 mt-6">3. Use of Information</h2>
        <p>We use the information we collect or receive to operate our platform, improve user experience, and analyze usage trends. We do not sell your personal data to third parties.</p>
        
        <h2 className="text-xl font-semibold text-gray-900 mt-6">4. Contact Us</h2>
        <p>If you have questions or comments about this policy, you may contact us using the information provided on our Contact page.</p>
      </div>
    </div>
  );
}
