'use client';

import { siteContent } from '@/data/content';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/hero-gifting/1920/1080"
          alt="Premium gifting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />
      </div>
      
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-3xl animate-fade-in-up">
            <p className="text-ivory text-sm md:text-base font-medium uppercase tracking-[0.3em] mb-6">
              Premium Gifting Solutions
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory mb-8 leading-[0.95]">
              Gifts That Make an Impression.
            </h1>
            <p className="text-lg md:text-xl text-ivory/80 mb-12 leading-relaxed max-w-xl font-light">
              Thoughtfully curated gifts for life's special moments, celebrations, and the people who matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="btn-primary">
                Shop Gifts <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/corporate-gifting" className="btn-secondary border-ivory text-ivory hover:bg-ivory hover:text-charcoal">
                Corporate Gifting
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8 text-ivory/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-ivory/40" />
              <span>Scroll to explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
