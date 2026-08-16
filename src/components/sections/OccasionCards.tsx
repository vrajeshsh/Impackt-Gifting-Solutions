'use client';

import Link from 'next/link';
import { Gift, Briefcase, PartyPopper, Heart, Star } from 'lucide-react';

const occasions = [
  { name: 'Birthday', slug: 'birthday', icon: Gift, description: 'Make their day special' },
  { name: 'Corporate / Employee Gifting', slug: 'corporate', icon: Briefcase, description: 'Appreciate your team' },
  { name: 'Festivals', slug: 'festival', icon: PartyPopper, description: 'Diwali, Rakhi and more' },
  { name: 'Celebrations', slug: 'celebrations', icon: Star, description: 'Milestones and achievements' },
  { name: 'Thank You', slug: 'thank-you', icon: Heart, description: 'Show appreciation' },
];

export default function OccasionCards() {
  return (
    <section className="section-padding bg-ivory dark:bg-obsidian transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Moments
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-ivory mb-6">
            Shop by Occasion
          </h2>
          <p className="text-warm-gray dark:text-stone-400 text-lg max-w-2xl mx-auto font-light">
            Find the perfect gift for every moment
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {occasions.map((occasion) => {
            const Icon = occasion.icon;
            return (
              <Link
                key={occasion.slug}
                href={`/shop?occasion=${occasion.slug}`}
                className="group p-8 md:p-10 bg-white dark:bg-stone-900 border border-soft-beige/50 dark:border-stone-800 hover:border-accent/30 transition-all duration-500 text-center"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 dark:bg-warm-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent dark:text-warm-gold" />
                </div>
                <h3 className="font-display text-xl text-charcoal dark:text-ivory mb-2 group-hover:text-accent transition-colors duration-300">
                  {occasion.name}
                </h3>
                <p className="text-warm-gray dark:text-stone-400 text-sm font-light">
                  {occasion.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
