import { siteContent } from '@/data/content';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Terms and Conditions | Impackt Gifting Solutions',
    description: 'Read the terms and conditions for using Impackt Gifting Solutions website. Information about orders, payments, shipping, returns, and intellectual property for corporate gifting.',
    alternates: {
      canonical: '/terms-and-conditions',
    },
  };
};

export default function TermsAndConditionsPage() {
  return (
    <div>
      <section className="bg-cream/50 py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Legal
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal mb-4">
            Terms and Conditions
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
              <h2 className="font-display text-2xl text-charcoal mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using the Impackt Gifting Solutions website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">2. Products and Pricing</h2>
              <p>All products displayed on our website are subject to availability. We reserve the right to discontinue any product or modify prices at any time without prior notice. Prices are listed in Indian Rupees (INR) and include applicable taxes unless otherwise stated.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">3. Orders and Payments</h2>
              <p>Orders are confirmed upon receipt of payment. We accept various payment methods as indicated on our checkout page. All payments must be completed before orders are processed for shipping.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">4. Shipping and Delivery</h2>
              <p>We strive to deliver products within the estimated timeframe. Delivery times may vary based on location and product availability. We are not liable for delays caused by external factors beyond our control.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">5. Returns and Refunds</h2>
              <p>We accept returns within 7 days of delivery for unused products in original packaging. Refunds will be processed within 10-15 business days after we receive the returned item. Customized or personalized products are non-returnable.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">6. Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, and images, is the property of Impackt Gifting Solutions and is protected by copyright and trademark laws.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">7. Limitation of Liability</h2>
              <p>Impackt Gifting Solutions shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">8. Governing Law</h2>
              <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Kolkata, West Bengal.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-4">9. Contact Information</h2>
              <p>For any questions regarding these Terms and Conditions, please contact us at {siteContent.contact.email} or call us at {siteContent.contact.phone}.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}