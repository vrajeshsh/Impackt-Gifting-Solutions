import { siteContent } from '@/data/content';

export default function PrivacyPolicyPage() {
  return (
    <div>
      <section className="bg-cream/50 py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Legal
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal mb-4">
            Privacy Policy
          </h1>
          <p className="text-warm-gray text-lg font-light max-w-xl">
            Last updated: August 2025
          </p>
        </div>
      </section>
      
      <section className="section-padding bg-ivory">
        <div className="container-custom max-w-4xl">
          <div className="space-y-8 text-warm-gray font-light leading-relaxed">
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This may include your name, email address, phone number, shipping address, and payment information.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to process your orders, communicate with you about your purchases, improve our services, and send you promotional content if you have opted in to receive it.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">3. Information Sharing</h2>
              <p>We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting business.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">4. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">5. Cookies</h2>
              <p>We use cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at {siteContent.contact.email} or call us at {siteContent.contact.phone}.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}