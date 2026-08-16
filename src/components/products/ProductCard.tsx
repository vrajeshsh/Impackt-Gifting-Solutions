'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { Heart, Eye, Plus } from 'lucide-react';
import { FALLBACK_IMAGE } from '@/lib/theme-context';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [imgError, setImgError] = useState(false);
  const [hoverImgError, setHoverImgError] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const primaryTag = product.discount
    ? { label: `${product.discount}% OFF`, variant: 'discount' }
    : product.bestseller
      ? { label: 'Best Seller', variant: 'bestseller' }
      : product.newArrival
        ? { label: 'New', variant: 'new' }
        : null;

  const hasHoverImage = product.images[1] && !hoverImgError && !imgError;
  const primarySrc = imgError ? FALLBACK_IMAGE : product.images[0];
  const hoverSrc = hoverImgError ? FALLBACK_IMAGE : (product.images[1] || FALLBACK_IMAGE);

  return (
    <div className="group bg-white dark:bg-stone-900 border border-soft-beige/30 dark:border-stone-800 rounded-lg overflow-hidden transition-colors duration-300 h-full flex flex-col">
      <Link href={`/shop/${product.slug}`} className="block relative aspect-square overflow-hidden bg-cream dark:bg-stone-800 flex-shrink-0 rounded-t-lg">
        <img
          loading="lazy"
          src={primarySrc}
          alt={product.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        
        {hasHoverImage && (
          <img
            loading="lazy"
            src={hoverSrc}
            alt={product.name}
            onError={() => setHoverImgError(true)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out opacity-0 group-hover:opacity-100"
          />
        )}
        
        {/* Top-Left: Single primary pill only */}
        {primaryTag && (
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full backdrop-blur-sm ${
              primaryTag.variant === 'discount'
                ? 'bg-amber-500/90 text-white'
                : primaryTag.variant === 'bestseller'
                  ? 'bg-ivory/95 dark:bg-stone-900/90 text-charcoal dark:text-ivory'
                  : 'bg-charcoal/90 dark:bg-charcoal text-ivory'
            }`}>
              {primaryTag.label}
            </span>
          </div>
        )}
        
        {/* Top-Right: Wishlist icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out translate-x-2 group-hover:translate-x-0">
          <button 
            onClick={handleWishlist}
            title={inWishlist ? 'Remove from wishlist' : 'Add to favorites'}
            className={`p-2 backdrop-blur-sm shadow-sm transition-all duration-300 rounded-full ${
              inWishlist
                ? 'bg-accent text-ivory'
                : 'bg-ivory/95 dark:bg-stone-900/90 hover:bg-ivory dark:hover:bg-stone-900 text-charcoal dark:text-ivory'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>
      </Link>
      
      <div className="pt-4 pb-2 px-4 flex-1 flex flex-col">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-display text-sm md:text-base text-charcoal dark:text-ivory mb-0.5 group-hover:text-accent transition-colors duration-500 ease-out line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-warm-gray dark:text-stone-400 text-xs mb-2 font-light">{product.subcategory}</p>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-medium text-charcoal dark:text-ivory text-sm">₹{product.inrPrice.toLocaleString('en-IN')}</span>
          {product.originalPrice && product.originalPrice > product.inrPrice && (
            <>
              <span className="text-warm-gray/70 dark:text-stone-500 line-through text-xs">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              <span className="text-accent text-xs font-medium">{Math.round((1 - product.inrPrice / product.originalPrice) * 100)}% off</span>
            </>
          )}
        </div>
        
        {product.personalizable && (
          <p className="text-warm-gray dark:text-stone-500 text-xs mb-3 font-light">Personalizable</p>
        )}
        
        <div className="mt-auto">
          <button
            onClick={() => addToCart(product)}
            className="w-full border border-stone-800 dark:border-stone-700 text-stone-900 dark:text-stone-200 hover:bg-stone-900 dark:hover:bg-stone-100 hover:text-white dark:hover:text-stone-900 transition-all text-xs tracking-wider uppercase rounded-md py-2 flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
