export default function PrivacyPolicy() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        </div>
      </section>

      {/* Content */}
      <div className="container py-16 max-w-3xl">
        <div className="prose dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
            <p>
              Ashwagandha Premium ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Personal Data: Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
              <li>Financial Data: Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase products from the Site.</li>
              <li>Data From Social Networks: User information from social networks, including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts.</li>
              <li>Mobile Device Data: Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Generate a personal profile about you so that future visits to the Site will be personalized as possible.</li>
              <li>Increase the efficiency and operation of the Site.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Notify you of updates to the Site.</li>
              <li>Offer new products, services, and/or recommendations to you.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Disclosure of Your Information</h2>
            <p>We may share information we have collected about you in certain situations:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>By Law or to Protect Rights</li>
              <li>Third-Party Service Providers</li>
              <li>Marketing Communications</li>
              <li>Online Postings</li>
              <li>Third-Party Advertisers</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              Ashwagandha Premium<br />
              Email: privacy@ashwagandha.com<br />
              Phone: +91 XXXXXXXXXX
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
