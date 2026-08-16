'use client';

import { categories } from '@/data/products';
import Link from 'next/link';

export default function CategoryShowcase() {
  return (
    <section className="section-padding bg-ivory dark:bg-obsidian transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Collections
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-ivory mb-6">
            Shop by Category
          </h2>
          <p className="text-warm-gray dark:text-stone-400 text-lg max-w-2xl mx-auto font-light">
            Explore our carefully curated collections of premium gifts
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-cream dark:bg-stone-800"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-end p-6 md:p-8">
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-ivory mb-1">
                    {category.name}
                  </h3>
                  <p className="text-ivory/80 text-sm font-light">
                    {category.productCount} products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
