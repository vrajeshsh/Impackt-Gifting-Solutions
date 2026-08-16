'use client';

import { categories, occasions, priceRanges } from '@/data/products';

interface ProductFiltersProps {
  selectedCategory?: string;
  selectedOccasion?: string;
  selectedPriceRange?: string;
  onCategoryChange: (slug: string | undefined) => void;
  onOccasionChange: (slug: string | undefined) => void;
  onPriceRangeChange: (id: string | undefined) => void;
}

export default function ProductFilters({
  selectedCategory,
  selectedOccasion,
  selectedPriceRange,
  onCategoryChange,
  onOccasionChange,
  onPriceRangeChange,
}: ProductFiltersProps) {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="font-display text-lg text-charcoal dark:text-ivory mb-5 uppercase tracking-wider">Categories</h3>
        <div className="space-y-3">
          <button
            onClick={() => onCategoryChange(undefined)}
            className={`block w-full text-left text-sm transition-colors duration-300 ${!selectedCategory ? 'text-accent font-medium' : 'text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory'}`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug === selectedCategory ? undefined : cat.slug)}
              className={`block w-full text-left text-sm transition-colors duration-300 ${selectedCategory === cat.slug ? 'text-accent font-medium' : 'text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-display text-lg text-charcoal dark:text-ivory mb-5 uppercase tracking-wider">Occasions</h3>
        <div className="space-y-3">
          <button
            onClick={() => onOccasionChange(undefined)}
            className={`block w-full text-left text-sm transition-colors duration-300 ${!selectedOccasion ? 'text-accent font-medium' : 'text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory'}`}
          >
            All Occasions
          </button>
          {occasions.map((occ) => (
            <button
              key={occ.id}
              onClick={() => onOccasionChange(occ.slug === selectedOccasion ? undefined : occ.slug)}
              className={`block w-full text-left text-sm transition-colors duration-300 ${selectedOccasion === occ.slug ? 'text-accent font-medium' : 'text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory'}`}
            >
              {occ.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-display text-lg text-charcoal dark:text-ivory mb-5 uppercase tracking-wider">Price</h3>
        <div className="space-y-3">
          <button
            onClick={() => onPriceRangeChange(undefined)}
            className={`block w-full text-left text-sm transition-colors duration-300 ${!selectedPriceRange ? 'text-accent font-medium' : 'text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory'}`}
          >
            All Prices
          </button>
          {priceRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => onPriceRangeChange(range.id === selectedPriceRange ? undefined : range.id)}
              className={`block w-full text-left text-sm transition-colors duration-300 ${selectedPriceRange === range.id ? 'text-accent font-medium' : 'text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory'}`}
            >
              {range.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
