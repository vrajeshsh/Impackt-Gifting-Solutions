'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { Timer } from 'lucide-react';

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 22, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products
    .filter((p) => p.discount && p.discount >= 20)
    .slice(0, 6);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="section-padding bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
              Limited Time
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory mb-4">
              Flash Sale
            </h2>
            <p className="text-ivory/70 text-lg font-light max-w-xl">
              Grab exclusive deals before they are gone. While stocks last.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <Timer className="w-6 h-6 text-accent" />
            <div className="flex items-center gap-2">
              <span className="bg-ivory/10 px-3 py-2 rounded text-xl font-display">{pad(timeLeft.hours)}</span>
              <span className="text-2xl">:</span>
              <span className="bg-ivory/10 px-3 py-2 rounded text-xl font-display">{pad(timeLeft.minutes)}</span>
              <span className="text-2xl">:</span>
              <span className="bg-ivory/10 px-3 py-2 rounded text-xl font-display">{pad(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {flashProducts.map((product) => (
            <div key={product.id} className="relative">
              {product.discount && (
                <span className="absolute top-2 left-2 z-10 bg-accent text-ivory text-xs px-2 py-1 font-medium">
                  {product.discount}% OFF
                </span>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/shop" className="btn-secondary border-ivory text-ivory hover:bg-ivory hover:text-charcoal">
            View All Deals
          </Link>
        </div>
      </div>
    </section>
  );
}
