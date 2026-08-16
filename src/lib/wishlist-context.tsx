'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';
import { supabaseBrowser } from './supabaseClient';

interface WishlistContextType {
  items: Product[];
  isWishlistOpen: boolean;
  toggleWishlist: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabaseBrowser().auth.getSession();
      if (session?.user?.id) {
        setUserId(session.user.id);
        await loadWishlistFromDb(session.user.id);
      }
      setIsLoaded(true);
    };

    init();
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseBrowser().auth.onAuthStateChange((_event, session) => {
      if (session?.user?.id) {
        setUserId(session.user.id);
        loadWishlistFromDb(session.user.id);
      } else {
        setUserId(null);
        setItems([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadWishlistFromDb = async (uid: string) => {
    const supabase = supabaseBrowser();
    const { data, error } = await supabase
      .from('wishlists')
      .select('product_id')
      .eq('user_id', uid);

    if (error || !data) return;

    // For now, keep local items and mark DB-backed ones.
    // Full product hydration would require joining with products table.
    setItems((current) =>
      current.filter((item) => data.some((row) => row.product_id === item.id))
    );
  };

  const addToWishlist = async (product: Product) => {
    setItems((current) => {
      if (current.find((item) => item.id === product.id)) return current;
      return [...current, product];
    });
    setIsWishlistOpen(true);

    if (userId) {
      const supabase = supabaseBrowser();
      await supabase.from('wishlists').insert({
        user_id: userId,
        product_id: product.id,
      });
    }
  };

  const removeFromWishlist = async (productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));

    if (userId) {
      const supabase = supabaseBrowser();
      await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  const toggleWishlist = () => setIsWishlistOpen(!isWishlistOpen);

  return (
    <WishlistContext.Provider
      value={{ items, isWishlistOpen, toggleWishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
