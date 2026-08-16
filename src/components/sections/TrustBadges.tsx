'use client';

import { Truck, Printer, Lock, Star } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: Truck,
      title: 'Pan-India Express Shipping',
      description: 'Free delivery on orders above ₹999',
    },
    {
      icon: Printer,
      title: 'Free Custom Logo Printing',
      description: 'On bulk orders of 25+ units',
    },
    {
      icon: Lock,
      title: '100% Secure Checkout',
      description: 'SSL encrypted payments',
    },
    {
      icon: Star,
      title: '4.9/5 Rating',
      description: 'Over 50,000+ gifts delivered',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-ivory dark:bg-obsidian border-y border-soft-beige/30 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-accent/10 dark:bg-warm-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-accent dark:text-warm-gold" />
                </div>
                <h3 className="font-display text-lg text-charcoal dark:text-ivory mb-2">{badge.title}</h3>
                <p className="text-warm-gray dark:text-stone-400 text-sm font-light">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
