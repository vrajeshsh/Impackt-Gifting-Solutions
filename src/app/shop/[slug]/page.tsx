'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { Heart, Share2, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { FALLBACK_IMAGE } from '@/lib/theme-context';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [mainImgError, setMainImgError] = useState(false);
  const [thumbErrors, setThumbErrors] = useState<boolean[]>([]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Product Not Found</h1>
          <Link href="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const inWishlist = isInWishlist(product.id);

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-cream/50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-warm-gray">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/shop" className="hover:text-charcoal transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-charcoal">{product.name}</span>
          </nav>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-cream">
              <img
                src={mainImgError ? FALLBACK_IMAGE : product.images[activeImage]}
                alt={product.name}
                onError={() => setMainImgError(true)}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square bg-cream transition-all duration-300 ${activeImage === idx ? 'ring-2 ring-charcoal ring-offset-2' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <img 
                      src={thumbErrors[idx] ? FALLBACK_IMAGE : img} 
                      alt="" 
                      className="w-full h-full object-cover"
                      onError={() => setThumbErrors((prev) => {
                        const next = [...prev];
                        next[idx] = true;
                        return next;
                      })}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <div className="mb-6">
              {product.bestseller && <span className="text-accent text-sm font-medium uppercase tracking-[0.2em]">Best Seller</span>}
              {product.newArrival && <span className="text-accent text-sm font-medium uppercase tracking-[0.2em] ml-4">New Arrival</span>}
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-4 leading-tight">{product.name}</h1>
            <p className="text-warm-gray mb-8 font-light">{product.subcategory}</p>
            
            <div className="flex items-baseline gap-4 mb-10">
              <span className="font-display text-3xl text-charcoal">&#8377;{product.inrPrice.toLocaleString('en-IN')}</span>
              {product.originalPrice && product.originalPrice > product.inrPrice && (
                <>
                  <span className="text-warm-gray/70 line-through text-xl">&#8377;{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="text-accent text-lg font-medium">{Math.round((1 - product.inrPrice / product.originalPrice) * 100)}% off</span>
                </>
              )}
            </div>
            
            <div className="w-full h-px bg-soft-beige/50 mb-8" />
            
            <p className="text-warm-gray leading-relaxed mb-10 font-light text-lg">{product.description}</p>
            
            <div className="space-y-4 mb-10">
              {product.material && (
                <div className="flex gap-6">
                  <span className="text-warm-gray text-sm w-24 font-light">Material</span>
                  <span className="text-charcoal text-sm">{product.material}</span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex gap-6">
                  <span className="text-warm-gray text-sm w-24 font-light">Dimensions</span>
                  <span className="text-charcoal text-sm">{product.dimensions}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-6 mb-10">
              <span className="text-sm text-warm-gray font-light">Quantity</span>
              <div className="flex items-center border border-soft-beige/50">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-3 hover:bg-cream transition-colors text-charcoal">-</button>
                <span className="px-6 py-3 border-x border-soft-beige/50 min-w-[4rem] text-center text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-3 hover:bg-cream transition-colors text-charcoal">+</button>
              </div>
            </div>
            
            {product.personalizable && (
              <div className="mb-10 p-6 bg-cream/50 border border-soft-beige/30">
                <label className="block text-sm font-medium mb-3 text-charcoal">Personalization</label>
                <input
                  type="text"
                  placeholder="Enter name or message (optional)"
                  className="w-full px-4 py-3 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm"
                />
              </div>
            )}
            
            <div className="flex gap-4 mb-10">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 btn-primary"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleWishlist}
                className={`p-4 border transition-colors ${inWishlist ? 'bg-accent text-ivory border-accent' : 'border-soft-beige/50 hover:border-accent'}`}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
              <button className="p-4 border border-soft-beige/50 hover:border-accent transition-colors" aria-label="Share">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-soft-beige/30">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto mb-3 text-accent" />
                <p className="text-xs text-warm-gray font-light">Free shipping over &#8377;999</p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto mb-3 text-accent" />
                <p className="text-xs text-warm-gray font-light">Secure checkout</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 mx-auto mb-3 text-accent" />
                <p className="text-xs text-warm-gray font-light">Easy returns</p>
              </div>
            </div>
          </div>
        </div>
        
        {related.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">You May Also Like</p>
                <h2 className="font-display text-4xl md:text-5xl text-charcoal">Related Products</h2>
              </div>
            </div>
            <ProductGrid products={related} />
          </section>
        )}
      </div>
    </div>
  );
}
