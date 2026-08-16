'use client';

import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';

export default function BudgetGifts() {
  const budgetProducts = products
    .filter((p) => p.inrPrice <= 250)
    .slice(0, 8);

  if (budgetProducts.length === 0) return null;

  return (
    <section className="section-padding bg-cream/30 dark:bg-stone-900/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Value Picks
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-ivory mb-6">
            Pocket-Friendly Gifts (Under ₹250)
          </h2>
          <p className="text-warm-gray dark:text-stone-400 text-lg max-w-2xl mx-auto font-light">
            Thoughtful gifts that fit every budget. Perfect for corporate bulk orders and personal gifting alike.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {budgetProducts.map((product) => (
            <div key={product.id} className="relative">
              <span className="absolute top-2 left-2 z-10 bg-accent text-ivory text-xs px-2 py-1 font-medium">
                Under ₹250
              </span>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/shop?price=under-250" className="btn-secondary">View All Budget Gifts</Link>
        </div>
      </div>
    </section>
  );
}
