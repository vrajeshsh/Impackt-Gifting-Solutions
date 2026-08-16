'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ShoppingBag, User, ChevronRight, Moon, Sun, LogOut, Heart, Settings, LogIn, UserPlus } from 'lucide-react';
import { categories } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useTheme } from '@/lib/theme-context';
import { useAuth } from '@/lib/auth-context';
import SearchModal from '@/components/search/SearchModal';
import AuthModal from '@/components/auth/AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup' | 'reset'>('signin');
  const accountRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { toggleCart, items } = useCart();
  const { toggleTheme, theme } = useTheme();
  const { user, profile, isLoading, signOut, isConfigured } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authModal = params.get('auth-modal');
    if (authModal === 'reset') {
      setAuthModalTab('reset');
      setIsAuthModalOpen(true);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('auth-modal');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, []);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '?');

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest';

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-ivory/95 dark:bg-obsidian/95 backdrop-blur-md shadow-sm' : 'bg-ivory dark:bg-obsidian'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-24">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 -ml-2 text-charcoal dark:text-ivory hover:text-accent transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                title="Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/" className="block shrink-0">
                <img
                  src="https://impacktgifting.com/wp-content/uploads/2024/08/IGS-Logo-2.png"
                  alt="Impackt Gifting Solutions"
                  className="h-10 md:h-12 w-auto max-w-[160px] object-contain"
                />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              <Link href="/shop" className={`text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${isActive('/shop') ? 'text-accent' : 'text-charcoal dark:text-ivory hover:text-accent'}`}>Shop</Link>
              <div className="relative group">
                <button className="text-sm font-medium text-charcoal dark:text-ivory hover:text-accent transition-colors tracking-wide flex items-center gap-1 whitespace-nowrap">
                  Categories
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white dark:bg-stone-900 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-soft-beige/30 dark:border-stone-800">
                  <div className="py-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.slug}`}
                        className="block px-6 py-3 text-sm text-charcoal dark:text-ivory hover:bg-cream dark:hover:bg-stone-800 hover:text-accent transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link href="/corporate-gifting" className={`text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${isActive('/corporate-gifting') ? 'text-accent' : 'text-charcoal dark:text-ivory hover:text-accent'}`}>Corporate Gifting</Link>
              <Link href="/about" className={`text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${isActive('/about') ? 'text-accent' : 'text-charcoal dark:text-ivory hover:text-accent'}`}>About</Link>
              <Link href="/contact" className={`text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${isActive('/contact') ? 'text-accent' : 'text-charcoal dark:text-ivory hover:text-accent'}`}>Contact</Link>
            </nav>

            <div className="flex items-center gap-1 md:gap-3">
              <button onClick={() => setIsSearchOpen(true)} title="Search products" className="p-2 text-charcoal dark:text-ivory hover:text-accent transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              
              <div className="relative" ref={accountRef}>
                <button 
                  onClick={() => setIsAccountOpen(!isAccountOpen)} 
                  title="Account & Settings"
                  className="p-2 text-charcoal dark:text-ivory hover:text-accent transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" 
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </button>
                
                {isAccountOpen && (
                  <div className="absolute right-0 top-full mt-4 w-72 bg-white dark:bg-stone-900 shadow-2xl border border-soft-beige/30 dark:border-stone-800 rounded-sm overflow-hidden z-50">
                    <div className="p-5 border-b border-soft-beige/30 dark:border-stone-800">
                      <p className="font-display text-lg text-charcoal dark:text-ivory">Welcome, {displayName}</p>
                      <p className="text-warm-gray dark:text-stone-400 text-xs mt-1">Manage your account and preferences</p>
                    </div>
                    <div className="py-2">
                      {user ? (
                        <>
                          <Link href="/account" onClick={() => setIsAccountOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-charcoal dark:text-ivory hover:bg-cream dark:hover:bg-stone-800 hover:text-accent transition-colors">
                            <User className="w-4 h-4" /> My Profile
                          </Link>
                          <Link href="/account?tab=orders" onClick={() => setIsAccountOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-charcoal dark:text-ivory hover:bg-cream dark:hover:bg-stone-800 hover:text-accent transition-colors">
                            <ShoppingBag className="w-4 h-4" /> Orders & Tracking
                          </Link>
                          <Link href="/account?tab=wishlist" onClick={() => setIsAccountOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-charcoal dark:text-ivory hover:bg-cream dark:hover:bg-stone-800 hover:text-accent transition-colors">
                            <Heart className="w-4 h-4" /> Saved Favorites
                          </Link>
                          <Link href="/account?tab=settings" onClick={() => setIsAccountOpen(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-charcoal dark:text-ivory hover:bg-cream dark:hover:bg-stone-800 hover:text-accent transition-colors">
                            <Settings className="w-4 h-4" /> Settings & Preferences
                          </Link>
                        </>
                      ) : (
                        <button 
                          onClick={() => {
                            setIsAccountOpen(false);
                            setAuthModalTab('signin');
                            setIsAuthModalOpen(true);
                          }}
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-charcoal dark:text-ivory hover:bg-cream dark:hover:bg-stone-800 hover:text-accent transition-colors"
                        >
                          <LogIn className="w-4 h-4" /> Sign In
                        </button>
                      )}
                    </div>
                    <div className="p-4 border-t border-soft-beige/30 dark:border-stone-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-charcoal dark:text-ivory flex items-center gap-2">
                          {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                        </span>
                        <button
                          onClick={toggleTheme}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-warm-gold' : 'bg-soft-beige/50'}`}
                          aria-label="Toggle dark mode"
                        >
                          <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      {user ? (
                        <button 
                          onClick={async () => {
                            await signOut();
                            setIsAccountOpen(false);
                          }}
                          className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-charcoal dark:text-ivory border border-soft-beige/50 dark:border-stone-700 hover:bg-cream dark:hover:bg-stone-800 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            setIsAccountOpen(false);
                            setAuthModalTab('signup');
                            setIsAuthModalOpen(true);
                          }}
                          className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-charcoal dark:text-ivory border border-soft-beige/50 dark:border-stone-700 hover:bg-cream dark:hover:bg-stone-800 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Create Account
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <button onClick={toggleCart} title="Shopping Cart" className="p-2 text-charcoal dark:text-ivory hover:text-accent transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Cart">
                <ShoppingBag className="w-5 h-5" />
                {items.length > 0 && (
                  <span className="absolute top-1 right-1 bg-accent text-ivory text-xs w-5 h-5 flex items-center justify-center font-medium">
                    {items.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-ivory dark:bg-obsidian border-t border-soft-beige/30 dark:border-stone-800">
            <nav className="max-w-7xl mx-auto px-6 py-8 space-y-6">
              <Link href="/shop" className="block text-lg font-display text-charcoal dark:text-ivory" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <div className="space-y-3">
                <p className="text-xs text-warm-gray dark:text-stone-400 uppercase tracking-[0.2em]">Categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}`}
                    className="block text-base text-warm-gray dark:text-stone-400 hover:text-accent transition-colors pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
              <Link href="/corporate-gifting" className="block text-lg font-display text-charcoal dark:text-ivory" onClick={() => setIsMenuOpen(false)}>Corporate Gifting</Link>
              <Link href="/about" className="block text-lg font-display text-charcoal dark:text-ivory" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link href="/contact" className="block text-lg font-display text-charcoal dark:text-ivory" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </nav>
          </div>
        )}
      </header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultTab={authModalTab} />
    </>
  );
}
