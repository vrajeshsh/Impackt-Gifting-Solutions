'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import QuickQuoteModal from '@/components/sections/QuickQuoteModal';

export default function CorporateCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 md:py-28 bg-charcoal text-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
                For Enterprises
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory mb-6 leading-tight">
                Planning Gifting for Your Enterprise Team?
              </h2>
              <p className="text-ivory/70 text-lg font-light max-w-2xl leading-relaxed">
                Get custom branding, bulk pricing, and dedicated support for your corporate gifting needs.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary whitespace-nowrap"
            >
              Get Quick Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <QuickQuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
