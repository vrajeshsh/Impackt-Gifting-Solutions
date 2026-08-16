'use client';

import { useCart } from '@/lib/cart-context';
import { X, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { CartItem as CartItemType } from '@/types';
import { FALLBACK_IMAGE } from '@/lib/theme-context';

function CartDrawerItem({ item, onUpdateQuantity, onRemove }: { item: CartItemType; onUpdateQuantity: (productId: string, quantity: number) => void; onRemove: (productId: string) => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex gap-5 pb-8 border-b border-soft-beige/30 dark:border-stone-800 last:border-0">
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
            <p className="text-warm-gray dark:text-stone-400 text-xs mb-2">{item.product.subcategory}</p>
          </div>
          <button onClick={() => onRemove(item.product.id)} className="p-1 text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory transition-colors flex-shrink-0" aria-label="Remove item">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="font-medium text-sm mb-3 text-charcoal dark:text-ivory">&#8377;{(item.product.inrPrice * item.quantity).toLocaleString('en-IN')}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            className="w-8 h-8 border border-soft-beige/50 dark:border-stone-700 flex items-center justify-center hover:border-charcoal dark:hover:border-ivory transition-colors duration-300 text-charcoal dark:text-ivory"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm w-6 text-center text-charcoal dark:text-ivory">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            className="w-8 h-8 border border-soft-beige/50 dark:border-stone-700 flex items-center justify-center hover:border-charcoal dark:hover:border-ivory transition-colors duration-300 text-charcoal dark:text-ivory"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { items, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useCart();

  if (!isCartOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.inrPrice * item.quantity, 0);

  return (
    <>
      <div className="fixed inset-0 bg-charcoal/30 dark:bg-black/60 backdrop-blur-sm z-50" onClick={toggleCart} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-ivory dark:bg-stone-900 z-50 shadow-2xl flex flex-col transition-colors duration-300">
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-soft-beige/30 dark:border-stone-800">
          <div>
            <p className="text-xs text-warm-gray dark:text-stone-400 uppercase tracking-[0.2em] mb-1">Shopping Bag</p>
            <h2 className="font-display text-2xl text-charcoal dark:text-ivory">{items.length} {items.length === 1 ? 'item' : 'items'}</h2>
          </div>
          <button onClick={toggleCart} className="p-2 hover:text-accent transition-colors duration-300" aria-label="Close cart">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-warm-gray dark:text-stone-400 text-lg font-light">Your bag is empty</p>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <CartDrawerItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-6 md:p-8 border-t border-soft-beige/30 dark:border-stone-800 space-y-6">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-warm-gray dark:text-stone-400 font-light">Subtotal</span>
              <span className="font-display text-xl text-charcoal dark:text-ivory">&#8377;{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-warm-gray dark:text-stone-400 text-xs font-light">Shipping and taxes calculated at checkout</p>
            <button className="w-full btn-primary">Checkout</button>
            <button onClick={toggleCart} className="w-full btn-secondary">Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
}
