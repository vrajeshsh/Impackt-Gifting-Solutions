'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CorporateSection() {
  return (
    <section className="section-padding bg-charcoal text-ivory dark:bg-obsidian dark:text-stone-200 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://picsum.photos/seed/corporate-gifting/1920/1080"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-6">
              For Business
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight text-ivory dark:text-ivory">
              Corporate Gifting,<br />Made Remarkable.
            </h2>
            <p className="text-ivory/70 dark:text-stone-400 text-lg mb-10 leading-relaxed font-light max-w-lg">
              From employee onboarding kits to client appreciation gifts, we curate 
              premium corporate gifting solutions that reflect your brand identity 
              and leave a lasting impression.
            </p>
            <ul className="grid grid-cols-2 gap-3 mb-12">
              {['Employee Gifting', 'Client Gifting', 'Bulk Orders', 'Custom Branding', 'Festive Gifting', 'Event Gifting'].map((item) => (
                <li key={item} className="flex items-center text-ivory/90 dark:text-stone-300 text-sm">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/corporate-gifting" className="btn-primary">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="relative aspect-[4/5] bg-ivory/5 dark:bg-stone-800/50 p-4 hidden lg:block">
            <img
              src="https://picsum.photos/seed/corporate-gift/800/800"
              alt="Corporate gifting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
