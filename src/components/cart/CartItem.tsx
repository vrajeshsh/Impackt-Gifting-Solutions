'use client';

import { useState } from 'react';
import { CartItem as CartItemType } from '@/types';
import { Minus, Plus, X } from 'lucide-react';
import { FALLBACK_IMAGE } from '@/lib/theme-context';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex gap-5 py-6 border-b border-soft-beige/30 dark:border-stone-800 last:border-0">
      <div className="relative w-20 h-24 bg-cream dark:bg-stone-800 flex-shrink-0">
        <img loading="lazy"
          src={imgError ? FALLBACK_IMAGE : item.product.images[0]}
          alt={item.product.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-4">
          <div>
            <h3 className="font-display text-base mb-1 truncate text-charcoal dark:text-ivory">{item.product.name}</h3>
            <p className="text-warm-gray dark:text-stone-400 text-xs">{item.product.subcategory}</p>
          </div>
          <button onClick={() => onRemove(item.product.id)} className="p-1 text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory transition-colors flex-shrink-0" aria-label="Remove">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-end justify-between mt-4">
          <div className="flex items-center border border-soft-beige/50 dark:border-stone-700">
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-cream dark:hover:bg-stone-800 transition-colors duration-300 text-charcoal dark:text-ivory"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 h-8 flex items-center justify-center border-x border-soft-beige/50 dark:border-stone-700 text-sm text-charcoal dark:text-ivory">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center hover:bg-cream dark:hover:bg-stone-800 transition-colors duration-300 text-charcoal dark:text-ivory"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          
          <div className="text-right">
            <p className="font-medium text-sm text-charcoal dark:text-ivory">&#8377;{(item.product.inrPrice * item.quantity).toLocaleString('en-IN')}</p>
            {item.quantity > 1 && (
              <p className="text-warm-gray dark:text-stone-400 text-xs">&#8377;{item.product.inrPrice.toLocaleString('en-IN')} each</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
