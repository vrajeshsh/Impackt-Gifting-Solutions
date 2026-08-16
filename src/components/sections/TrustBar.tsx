'use client';

import { siteContent } from '@/data/content';

export default function TrustBar() {
  return (
    <section className="py-20 px-6 bg-ivory border-y border-soft-beige/30">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-warm-gray text-xs uppercase tracking-[0.3em] mb-10">
          Trusted by Leading Brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-50">
          {siteContent.clients.map((client) => (
            <span key={client} className="font-display text-xl md:text-2xl text-charcoal tracking-wide">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
