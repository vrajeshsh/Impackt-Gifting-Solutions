'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function CorporateGiftingPage() {
  return (
    <div>
      <section className="relative h-[70vh] min-h-[500px] flex items-center bg-charcoal">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://picsum.photos/seed/corporate-gifting/1920/1080"
            alt="Corporate gifting"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-6 text-ivory">
            For Business
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-ivory mb-6 leading-tight">
            Corporate Gifting,<br />Made Remarkable.
          </h1>
          <p className="text-xl text-ivory/70 max-w-2xl mb-10 font-light">
            Premium curated gifts that strengthen relationships, celebrate milestones, and reflect your brand.
          </p>
          <Link href="#quote-form" className="btn-primary inline-flex items-center gap-2">
            Request a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="text-center mb-20">
            <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
              What We Offer
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              End-to-End Solutions
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto font-light">
              Tailored corporate gifting solutions for every business need
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Employee Gifting', desc: 'Onboarding kits, milestone celebrations, and festival gifts that make your team feel valued.' },
              { title: 'Client Gifting', desc: 'Strengthen business relationships with thoughtful, premium gifts that leave a lasting impression.' },
              { title: 'Bulk Gifting', desc: 'Seamless handling of large-volume orders with consistent quality and timely delivery.' },
              { title: 'Event Gifting', desc: 'Conference swag, seminar gifts, and event hampers customized for your audience.' },
              { title: 'Festive Gifting', desc: 'Diwali, Christmas, New Year, and festive hampers curated with seasonal flair.' },
              { title: 'Custom Branding', desc: 'Logo embossing, custom packaging, and branded inserts that align with your identity.' },
            ].map((service) => (
              <div key={service.title} className="p-8 md:p-10 bg-white border border-soft-beige/30 hover:border-accent/30 transition-all duration-500 group">
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent/20 transition-colors duration-300">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-3">{service.title}</h3>
                <p className="text-warm-gray leading-relaxed font-light">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="quote-form" className="section-padding bg-cream/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
                Get Started
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
                Request a Quote
              </h2>
              <p className="text-warm-gray text-lg font-light">
                Tell us about your requirements and we will get back to you within 24 hours.
              </p>
            </div>
            
            <form className="bg-white p-8 md:p-12 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal">Full Name *</label>
                  <input type="text" required className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal">Company Name *</label>
                  <input type="text" required className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal">Work Email *</label>
                  <input type="email" required className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal">Phone Number *</label>
                  <input type="tel" required placeholder="+91 98765 43210" className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal">Number of Gifts *</label>
                  <input type="number" required className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal">Budget Per Gift (₹) *</label>
                  <input type="text" required placeholder="e.g., ₹1,000" className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal">Event Type *</label>
                  <select required className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm">
                    <option value="">Select event type</option>
                    <option>Employee Onboarding</option>
                    <option>Employee Appreciation</option>
                    <option>Client Gifting</option>
                    <option>Festive Gifting</option>
                    <option>Conference / Event</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal">Required Delivery Date</label>
                  <input type="date" className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-3 text-charcoal">Preferred Product Category</label>
                  <select className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm">
                    <option value="">Select category</option>
                    <option>Drinkware</option>
                    <option>Bags</option>
                    <option>Electronics and Tech</option>
                    <option>Promotional Gifting</option>
                    <option>Apparel</option>
                    
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-3 text-charcoal">Custom Branding Required?</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="branding" value="yes" className="accent-accent" />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="branding" value="no" className="accent-accent" />
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-3 text-charcoal">Packaging Requirements</label>
                  <textarea rows={3} className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors resize-none text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-3 text-charcoal">Additional Requirements</label>
                  <textarea rows={4} className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors resize-none text-sm" />
                </div>
              </div>
              <button type="submit" className="w-full btn-primary">Submit Inquiry</button>
            </form>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
              Why Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              The Impackt Difference
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '60-Year Legacy', desc: 'Built on six decades of trust and excellence in gifting.' },
              { title: 'Premium Quality', desc: 'Curated products from trusted suppliers and artisans.' },
              { title: 'End-to-End Service', desc: 'From concept to delivery, we handle everything.' },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 md:p-10">
                <h3 className="font-display text-2xl text-charcoal mb-4">{item.title}</h3>
                <p className="text-warm-gray font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
