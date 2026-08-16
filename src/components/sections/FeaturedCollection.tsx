'use client';

import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';

interface FeaturedCollectionProps {
  title: string;
  filter: 'bestseller' | 'newArrival' | 'corporateFavorite' | 'featured';
}

export default function FeaturedCollection({ title, filter }: FeaturedCollectionProps) {
  const filtered = products.filter((p) => p[filter]).slice(0, 8);
  
  if (filtered.length === 0) return null;

  return (
    <section className="section-padding bg-ivory dark:bg-obsidian transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
              {filter === 'bestseller' ? 'Most Loved' : filter === 'newArrival' ? 'Just Arrived' : 'Featured'}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal dark:text-ivory">
              {title}
            </h2>
          </div>
          <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm font-medium text-charcoal dark:text-ivory hover:text-accent transition-colors group">
            View All 
            <span className="w-8 h-px bg-charcoal dark:bg-ivory group-hover:w-12 group-hover:bg-accent transition-all duration-300" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/shop" className="btn-secondary">View All Products</Link>
        </div>
      </div>
    </section>
  );
}
