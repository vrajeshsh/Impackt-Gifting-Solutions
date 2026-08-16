import { siteContent } from '@/data/content';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Contact Us | Impackt Gifting Solutions',
    description: 'Get in touch with Impackt Gifting Solutions for premium corporate gifting, personalized gifts, and luxury employee gifts. Visit our store in Kolkata or call +91 73372 88823.',
    alternates: {
      canonical: '/contact',
    },
  };
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-cream/50 py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Get in Touch
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal mb-4">
            Contact Us
          </h1>
          <p className="text-warm-gray text-lg font-light max-w-xl">
            We would love to hear from you
          </p>
        </div>
      </section>
      
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            <div className="text-center p-8 md:p-10 bg-white border border-soft-beige/30 hover:border-accent/30 transition-all duration-500 group">
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-xl mb-3 text-charcoal">Visit Us</h3>
              <p className="text-warm-gray text-sm font-light whitespace-pre-line">{siteContent.contact.address}</p>
            </div>
            <div className="text-center p-8 md:p-10 bg-white border border-soft-beige/30 hover:border-accent/30 transition-all duration-500 group">
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-xl mb-3 text-charcoal">Call Us</h3>
              <a href={`tel:${siteContent.contact.phone}`} className="text-warm-gray hover:text-accent transition-colors text-sm font-light block">{siteContent.contact.phone}</a>
            </div>
            <div className="text-center p-8 md:p-10 bg-white border border-soft-beige/30 hover:border-accent/30 transition-all duration-500 group">
              <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-xl mb-3 text-charcoal">Email Us</h3>
              <a href={`mailto:${siteContent.contact.email}`} className="text-warm-gray hover:text-accent transition-colors text-sm font-light block">{siteContent.contact.email}</a>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
                Message
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-8">
                Send us a message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-charcoal">Name *</label>
                    <input type="text" required className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3 text-charcoal">Email *</label>
                    <input type="email" required className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal">Phone</label>
                  <input type="tel" className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal">Subject *</label>
                  <input type="text" required className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-charcoal">Message *</label>
                  <textarea rows={5} required className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors resize-none text-sm" />
                </div>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>
            
            <div className="space-y-8">
              <div className="bg-cream/50 p-8 md:p-10 border border-soft-beige/30">
                <h3 className="font-display text-2xl text-charcoal mb-6">Business Hours</h3>
                <div className="space-y-3 text-warm-gray font-light">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>10:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-cream/50 p-8 md:p-10 border border-soft-beige/30">
                <h3 className="font-display text-2xl text-charcoal mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a href={siteContent.social.facebook} className="w-12 h-12 bg-white border border-soft-beige/50 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300" aria-label="Facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href={siteContent.social.instagram} className="w-12 h-12 bg-white border border-soft-beige/50 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href={siteContent.social.linkedin} className="w-12 h-12 bg-white border border-soft-beige/50 flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

