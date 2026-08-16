'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { products } from '@/data/products';
import { FALLBACK_IMAGE } from '@/lib/theme-context';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [results, setResults] = useState(products);
  const inputRef = useRef<HTMLInputElement>(null);

  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const getImgSrc = (productId: string, img: string) => (imgError[productId] ? FALLBACK_IMAGE : img);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery('');
      setResults(products);
      setSuggestions([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const q = query.toLowerCase();
      const filtered = products.filter((p) => {
        const searchText = `${p.name} ${p.description} ${p.category} ${p.subcategory} ${p.tags.join(' ')} ${p.occasions.join(' ')}`.toLowerCase();
        return searchText.includes(q);
      });
      setResults(filtered);

      const uniqueSuggestions = new Set<string>();
      filtered.forEach((p) => {
        if (p.name.toLowerCase().includes(q)) uniqueSuggestions.add(p.name);
        p.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(q)) uniqueSuggestions.add(tag);
        });
      });
      setSuggestions(Array.from(uniqueSuggestions).slice(0, 6));
    } else {
      setResults(products);
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-charcoal/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-ivory dark:bg-stone-900 shadow-2xl w-full max-w-2xl mx-auto mt-20 md:mt-32 mx-4 md:mx-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-soft-beige/30 dark:border-stone-800">
          <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-3">
            <Search className="w-5 h-5 text-warm-gray dark:text-stone-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gifts, categories, occasions..."
              className="flex-1 bg-transparent border-none outline-none text-charcoal dark:text-ivory placeholder:text-warm-gray/60 dark:placeholder:text-stone-500 text-base"
            />
          </form>
          <button onClick={onClose} className="p-2 hover:text-accent transition-colors" aria-label="Close search">
            <X className="w-5 h-5" />
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="p-4 border-b border-soft-beige/30 dark:border-stone-800">
            <p className="text-xs text-warm-gray dark:text-stone-400 uppercase tracking-wider mb-3">Suggestions</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="px-3 py-1.5 bg-cream/50 dark:bg-stone-800 hover:bg-cream dark:hover:bg-stone-700 text-sm text-charcoal dark:text-ivory rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="max-h-80 overflow-y-auto p-4">
          {query.trim().length > 0 && (
            <p className="text-xs text-warm-gray dark:text-stone-400 uppercase tracking-wider mb-3">
              {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
            </p>
          )}
          {results.length === 0 ? (
            <p className="text-warm-gray dark:text-stone-400 text-sm py-8 text-center">No products found. Try a different search term.</p>
          ) : (
            <div className="space-y-3">
              {results.slice(0, 6).map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 hover:bg-cream/50 dark:hover:bg-stone-800/50 rounded-lg transition-colors"
                >
                  <div className="w-12 h-12 bg-cream dark:bg-stone-800 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={getImgSrc(product.id, product.images[0])} 
                      alt={product.name} 
                      className="w-full h-full object-cover" 
                      onError={() => setImgError((prev) => ({ ...prev, [product.id]: true }))}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal dark:text-ivory truncate">{product.name}</p>
                    <p className="text-xs text-warm-gray dark:text-stone-400">{product.subcategory}</p>
                  </div>
                  <span className="text-sm font-medium text-charcoal dark:text-ivory flex-shrink-0">₹{product.inrPrice.toLocaleString('en-IN')}</span>
                </Link>
              ))}
              {results.length > 6 && (
                <Link
                  href={`/shop?search=${encodeURIComponent(query.trim())}`}
                  onClick={onClose}
                  className="block text-center text-sm text-accent hover:text-charcoal dark:hover:text-ivory transition-colors py-3"
                >
                  View all {results.length} results
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
