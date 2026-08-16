'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="section-padding bg-cream/50 dark:bg-stone-900/30 transition-colors duration-300">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-6">
            Stay Connected
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-ivory mb-6">
            Stay Inspired
          </h2>
          <p className="text-warm-gray dark:text-stone-400 text-lg mb-10 font-light max-w-lg mx-auto">
            Subscribe for curated gifting ideas, new arrivals, and exclusive offers.
          </p>
          
          {submitted ? (
            <p className="text-accent text-lg font-display">Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-ivory dark:bg-stone-800 border border-soft-beige/50 dark:border-stone-700 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
