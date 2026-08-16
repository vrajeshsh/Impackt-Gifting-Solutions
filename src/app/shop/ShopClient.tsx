'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products as localProducts, occasions, priceRanges } from '@/data/products';
import { getProducts } from '@/lib/productsDb';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { Product } from '@/types';

export default function ShopClient() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedOccasion, setSelectedOccasion] = useState<string | undefined>();
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | undefined>();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [products, setProducts] = useState<Product[]>(localProducts);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory && product.category.toLowerCase().replace(/ and /g, '-').replace(/ /g, '-') !== selectedCategory) return false;
      if (selectedOccasion && !product.occasions.includes(selectedOccasion)) return false;
      if (selectedPriceRange) {
        const range = priceRanges.find((r) => r.id === selectedPriceRange);
        if (range && (product.inrPrice < range.min || product.inrPrice >= range.max)) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const searchText = `${product.name} ${product.description} ${product.category} ${product.subcategory} ${product.tags.join(' ')} ${product.occasions.join(' ')}`.toLowerCase();
        if (!searchText.includes(q)) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedOccasion, selectedPriceRange, searchQuery, products]);

  const hasFilters = selectedCategory || selectedOccasion || selectedPriceRange || searchQuery.trim();

  const clearAll = () => {
    setSelectedCategory(undefined);
    setSelectedOccasion(undefined);
    setSelectedPriceRange(undefined);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-obsidian transition-colors duration-300">
      <div className="bg-cream/50 dark:bg-stone-900/50 py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Our Collection
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal dark:text-ivory mb-4">
            Shop
          </h1>
          <p className="text-warm-gray dark:text-stone-400 text-lg font-light max-w-xl">
            Discover our collection of premium gifts for every occasion
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-sm font-medium text-charcoal dark:text-ivory"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {showFilters ? 'Hide' : 'Filters'}
            </button>
            <span className="text-warm-gray dark:text-stone-400 text-sm font-light">
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {hasFilters && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-sm text-accent hover:text-charcoal dark:hover:text-ivory transition-colors font-medium"
              >
                <X className="w-4 h-4" />
                Clear all
              </button>
            )}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-10 pr-4 py-2.5 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray dark:text-stone-400" />
            </div>
          </div>
        </div>

        <div className="flex gap-16">
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto max-h-[60vh] overflow-y-auto bg-white dark:bg-stone-900 border border-soft-beige/30 dark:border-stone-800 p-6 rounded-sm">
              <ProductFilters
                selectedCategory={selectedCategory}
                selectedOccasion={selectedOccasion}
                selectedPriceRange={selectedPriceRange}
                onCategoryChange={setSelectedCategory}
                onOccasionChange={setSelectedOccasion}
                onPriceRangeChange={setSelectedPriceRange}
              />
            </div>
          </aside>

          <div className="flex-1">
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}
