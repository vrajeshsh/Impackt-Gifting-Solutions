'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Gift, Search } from 'lucide-react';

export default function GiftFinder() {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('');

  const handleFind = () => {
    const params = new URLSearchParams();
    if (recipient) params.set('recipient', recipient);
    if (occasion) params.set('occasion', occasion);
    if (budget) params.set('budget', budget);
    window.location.href = `/shop?${params.toString()}`;
  };

  return (
    <section className="section-padding bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Not sure what to gift?
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
            Find the Perfect Gift
          </h2>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto font-light">
            Tell us who you are gifting to and we will handpick the best options for you.
          </p>
        </div>

        <div className="bg-white border border-soft-beige/30 p-6 md:p-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium mb-3 text-charcoal">Select Recipient</label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm appearance-none"
              >
                <option value="">Who are you gifting?</option>
                <option value="client">Client</option>
                <option value="employee">Employee</option>
                <option value="friend">Friend</option>
                <option value="family">Family</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3 text-charcoal">Occasion</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm appearance-none"
              >
                <option value="">Select occasion</option>
                <option value="birthday">Birthday</option>
                <option value="corporate">Corporate / Employee Gifting</option>
                <option value="festival">Festivals</option>
                <option value="celebrations">Celebrations</option>
                <option value="thank-you">Thank You</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3 text-charcoal">Budget Range</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm appearance-none"
              >
                <option value="">Select budget</option>
                <option value="under-500">Under ₹500</option>
                <option value="500-1000">₹500 – ₹1,000</option>
                <option value="1000-2500">₹1,000 – ₹2,500</option>
                <option value="2500-5000">₹2,500 – ₹5,000</option>
                <option value="5000-plus">₹5,000+</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleFind}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Find Perfect Gift
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
