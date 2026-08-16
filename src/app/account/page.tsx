'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useWishlist } from '@/lib/wishlist-context';
import { useTheme } from '@/lib/theme-context';
import { Product } from '@/types';
import { Heart, User, Settings, LogIn, LogOut, Moon, Sun, Package, Edit3, Save, X } from 'lucide-react';
import { FALLBACK_IMAGE } from '@/lib/theme-context';

type Tab = 'profile' | 'orders' | 'wishlist' | 'addresses' | 'security' | 'settings';

const orders = [
  { id: 'ORD-001', date: 'Aug 10, 2026', total: 2499, status: 'Delivered', items: 3 },
  { id: 'ORD-002', date: 'Aug 5, 2026', total: 1299, status: 'In Transit', items: 1 },
  { id: 'ORD-003', date: 'Jul 28, 2026', total: 899, status: 'Delivered', items: 2 },
];

const addresses = [
  { id: 1, label: 'Home', line1: '19A, Ram Mohan Dutta Rd', line2: 'Sreepally, Bhowanipore', city: 'Kolkata', state: 'West Bengal', pincode: '700020', default: true },
  { id: 2, label: 'Office', line1: '45, Park Street', line2: 'Near Quest Mall', city: 'Kolkata', state: 'West Bengal', pincode: '700016', default: false },
];

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as Tab) || 'profile';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [wishlistImgErrors, setWishlistImgErrors] = useState<Record<string, boolean>>({});
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setEmail('');
    setPhone('');
  };

  const tabs = [
    { id: 'profile' as Tab, label: 'My Profile', icon: User },
    { id: 'orders' as Tab, label: 'Orders', icon: Package },
    { id: 'wishlist' as Tab, label: 'Favorites', icon: Heart },
    { id: 'addresses' as Tab, label: 'Addresses', icon: User },
    { id: 'security' as Tab, label: 'Security', icon: Settings },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-ivory dark:bg-obsidian transition-colors duration-300">
      <div className="bg-cream/50 dark:bg-stone-900/50 py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">Welcome</p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal dark:text-ivory mb-4">
            {isLoggedIn ? `Hello, ${username}` : 'My Account'}
          </h1>
          <p className="text-warm-gray dark:text-stone-400 text-lg font-light max-w-xl">
            {isLoggedIn ? 'Manage your account and preferences' : 'Sign in to access your account'}
          </p>
        </div>
      </div>

      <section className="section-padding bg-ivory dark:bg-obsidian">
        <div className="container-custom max-w-5xl">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-64 flex-shrink-0">
              <div className="bg-white dark:bg-stone-900 border border-soft-beige/30 dark:border-stone-800 p-2 rounded-sm">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-300 rounded-sm ${
                        activeTab === tab.id
                          ? 'bg-cream dark:bg-stone-800 text-charcoal dark:text-ivory'
                          : 'text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory hover:bg-cream/50 dark:hover:bg-stone-800/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1">
              {activeTab === 'profile' && (
                <div className="bg-white dark:bg-stone-900 border border-soft-beige/30 dark:border-stone-800 p-8 md:p-10 rounded-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-display text-2xl text-charcoal dark:text-ivory">
                      {isLoggedIn ? 'My Profile' : (isEditing ? 'Edit Profile' : 'Sign In')}
                    </h2>
                    {isLoggedIn && !isEditing && (
                      <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm text-accent hover:text-charcoal dark:hover:text-ivory transition-colors">
                        <Edit3 className="w-4 h-4" /> Edit
                      </button>
                    )}
                  </div>

                  {!isLoggedIn ? (
                    <form onSubmit={handleAuth} className="space-y-6 max-w-md">
                      <div>
                        <label className="block text-sm font-medium mb-3 text-charcoal dark:text-ivory">Username</label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="w-full px-4 py-3.5 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                          placeholder="Enter your username"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3 text-charcoal dark:text-ivory">Password</label>
                        <input
                          type="password"
                          required
                          className="w-full px-4 py-3.5 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                          placeholder="Enter your password"
                        />
                      </div>
                      <button type="submit" className="btn-primary w-full">
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 p-6 bg-cream/50 dark:bg-stone-800/50">
                        <div className="w-16 h-16 bg-accent/10 dark:bg-warm-gold/10 flex items-center justify-center rounded-full">
                          <User className="w-8 h-8 text-accent dark:text-warm-gold" />
                        </div>
                        <div>
                          <p className="font-medium text-charcoal dark:text-ivory text-lg">{username || 'User'}</p>
                          <p className="text-warm-gray dark:text-stone-400 text-sm">Member since 2024</p>
                        </div>
                      </div>
                      
                      {isEditing ? (
                        <div className="space-y-4 max-w-md">
                          <div>
                            <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">Display Name</label>
                            <input
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">Email</label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">Phone</label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                            />
                          </div>
                          <div className="flex gap-3">
                            <button onClick={() => setIsEditing(false)} className="btn-primary flex items-center gap-2">
                              <Save className="w-4 h-4" /> Save Changes
                            </button>
                            <button onClick={() => setIsEditing(false)} className="btn-secondary flex items-center gap-2">
                              <X className="w-4 h-4" /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 max-w-md">
                          <div className="flex justify-between py-3 border-b border-soft-beige/30 dark:border-stone-800">
                            <span className="text-warm-gray dark:text-stone-400 text-sm">Email</span>
                            <span className="text-charcoal dark:text-ivory text-sm">{email || 'Not set'}</span>
                          </div>
                          <div className="flex justify-between py-3 border-b border-soft-beige/30 dark:border-stone-800">
                            <span className="text-warm-gray dark:text-stone-400 text-sm">Phone</span>
                            <span className="text-charcoal dark:text-ivory text-sm">{phone || 'Not set'}</span>
                          </div>
                        </div>
                      )}
                      
                      <button onClick={handleLogout} className="btn-secondary mt-6">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="bg-white dark:bg-stone-900 border border-soft-beige/30 dark:border-stone-800 p-8 md:p-10 rounded-sm">
                  <h2 className="font-display text-2xl text-charcoal dark:text-ivory mb-6">Order History</h2>
                  {!isLoggedIn ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-warm-gray/30 dark:text-stone-600 mx-auto mb-4" />
                      <p className="text-warm-gray dark:text-stone-400 mb-4">Please sign in to view your orders</p>
                      <button onClick={() => setActiveTab('profile')} className="btn-primary">Sign In</button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-5 bg-cream/30 dark:bg-stone-800/30 border border-soft-beige/30 dark:border-stone-800 rounded-sm">
                          <div>
                            <p className="font-medium text-charcoal dark:text-ivory text-sm">{order.id}</p>
                            <p className="text-warm-gray dark:text-stone-400 text-xs mt-1">{order.date} • {order.items} items</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-charcoal dark:text-ivory text-sm">₹{order.total.toLocaleString('en-IN')}</p>
                            <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-sm ${order.status === 'Delivered' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-accent/10 dark:bg-warm-gold/10 text-accent dark:text-warm-gold'}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="bg-white dark:bg-stone-900 border border-soft-beige/30 dark:border-stone-800 p-8 md:p-10 rounded-sm">
                  <h2 className="font-display text-2xl text-charcoal dark:text-ivory mb-6">Your Favorites</h2>
                  {!isLoggedIn ? (
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 text-warm-gray/30 dark:text-stone-600 mx-auto mb-4" />
                      <p className="text-warm-gray dark:text-stone-400 mb-4">Please sign in to view your favorites</p>
                      <button onClick={() => setActiveTab('profile')} className="btn-primary">Sign In</button>
                    </div>
                  ) : wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 text-warm-gray/30 dark:text-stone-600 mx-auto mb-4" />
                      <p className="text-warm-gray dark:text-stone-400 mb-4">No favorites yet</p>
                      <Link href="/shop" className="btn-primary">Browse Products</Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {wishlistItems.map((product: Product) => (
                        <div key={product.id} className="group">
                          <Link href={`/shop/${product.slug}`} className="block aspect-square bg-cream dark:bg-stone-800 mb-3 overflow-hidden rounded-sm">
                            <img
                              src={wishlistImgErrors[product.id] ? FALLBACK_IMAGE : product.images[0]}
                              alt={product.name}
                              onError={() => setWishlistImgErrors((prev) => ({ ...prev, [product.id]: true }))}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </Link>
                          <h3 className="font-display text-sm text-charcoal dark:text-ivory mb-1 group-hover:text-accent transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-charcoal dark:text-ivory">₹{product.inrPrice.toLocaleString('en-IN')}</span>
                            <button
                              onClick={() => removeFromWishlist(product.id)}
                              className="text-warm-gray dark:text-stone-400 hover:text-accent transition-colors"
                              aria-label="Remove from wishlist"
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="bg-white dark:bg-stone-900 border border-soft-beige/30 dark:border-stone-800 p-8 md:p-10 rounded-sm">
                  <h2 className="font-display text-2xl text-charcoal dark:text-ivory mb-6">Saved Addresses</h2>
                  {!isLoggedIn ? (
                    <div className="text-center py-12">
                      <p className="text-warm-gray dark:text-stone-400 mb-4">Please sign in to manage your addresses</p>
                      <button onClick={() => setActiveTab('profile')} className="btn-primary">Sign In</button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {addresses.map((addr) => (
                        <div key={addr.id} className="flex items-start justify-between p-5 bg-cream/30 dark:bg-stone-800/30 border border-soft-beige/30 dark:border-stone-800 rounded-sm">
                          <div>
                            <p className="font-medium text-charcoal dark:text-ivory text-sm">{addr.label} {addr.default && <span className="text-xs text-accent ml-2">Default</span>}</p>
                            <p className="text-warm-gray dark:text-stone-400 text-xs mt-1">{addr.line1}, {addr.line2}</p>
                            <p className="text-warm-gray dark:text-stone-400 text-xs">{addr.city}, {addr.state} - {addr.pincode}</p>
                          </div>
                          <button className="text-xs text-accent hover:text-charcoal dark:hover:text-ivory transition-colors mt-1">Edit</button>
                        </div>
                      ))}
                      <button className="btn-secondary mt-4">+ Add New Address</button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'security' && (
                <div className="bg-white dark:bg-stone-900 border border-soft-beige/30 dark:border-stone-800 p-8 md:p-10 rounded-sm">
                  <h2 className="font-display text-2xl text-charcoal dark:text-ivory mb-6">Security & Preferences</h2>
                  {!isLoggedIn ? (
                    <div className="text-center py-12">
                      <p className="text-warm-gray dark:text-stone-400 mb-4">Please sign in to manage security settings</p>
                      <button onClick={() => setActiveTab('profile')} className="btn-primary">Sign In</button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-warm-gray dark:text-stone-400 mb-4">Password</h3>
                        <form className="space-y-4 max-w-md" onSubmit={(e) => { e.preventDefault(); alert('Password reset link sent!'); }}>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">Current Password</label>
                            <input type="password" className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">New Password</label>
                            <input type="password" className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory" />
                          </div>
                          <button type="submit" className="btn-primary">Update Password</button>
                        </form>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-warm-gray dark:text-stone-400 mb-4">Notifications</h3>
                        <div className="space-y-3 max-w-md">
                          <div className="flex items-center justify-between p-4 bg-cream/50 dark:bg-stone-800/50 border border-soft-beige/30 dark:border-stone-800 rounded-sm">
                            <span className="text-sm text-charcoal dark:text-ivory">Email Notifications</span>
                            <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-warm-gold`} aria-label="Toggle email notifications">
                              <span className="inline-block h-4 w-4 rounded-full bg-white transition-transform translate-x-6" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-cream/50 dark:bg-stone-800/50 border border-soft-beige/30 dark:border-stone-800 rounded-sm">
                            <span className="text-sm text-charcoal dark:text-ivory">SMS Alerts</span>
                            <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-soft-beige/50`} aria-label="Toggle SMS alerts">
                              <span className="inline-block h-4 w-4 rounded-full bg-white transition-transform translate-x-1" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-cream/50 dark:bg-stone-800/50 border border-soft-beige/30 dark:border-stone-800 rounded-sm">
                            <span className="text-sm text-charcoal dark:text-ivory">Order Updates</span>
                            <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-warm-gold`} aria-label="Toggle order updates">
                              <span className="inline-block h-4 w-4 rounded-full bg-white transition-transform translate-x-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white dark:bg-stone-900 border border-soft-beige/30 dark:border-stone-800 p-8 md:p-10 rounded-sm">
                  <h2 className="font-display text-2xl text-charcoal dark:text-ivory mb-6">Settings</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-sm font-medium uppercase tracking-wider text-warm-gray dark:text-stone-400 mb-4">Appearance</h3>
                      <div className="flex items-center justify-between p-4 bg-cream/50 dark:bg-stone-800/50 border border-soft-beige/30 dark:border-stone-800 rounded-sm">
                        <div className="flex items-center gap-3">
                          {theme === 'dark' ? <Moon className="w-5 h-5 text-warm-gold" /> : <Sun className="w-5 h-5 text-accent" />}
                          <span className="text-charcoal dark:text-ivory font-medium">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                        </div>
                        <button
                          onClick={toggleTheme}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-warm-gold' : 'bg-soft-beige/50'}`}
                          aria-label="Toggle dark mode"
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}
                          />
                        </button>
                      </div>
                    </div>

                    {isLoggedIn && (
                      <div>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-warm-gray dark:text-stone-400 mb-4">Profile Details</h3>
                        <form className="space-y-4 max-w-md" onSubmit={(e) => { e.preventDefault(); setIsEditing(false); }}>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">Display Name</label>
                            <input
                              type="text"
                              defaultValue={username}
                              className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">Email</label>
                            <input
                              type="email"
                              defaultValue={email}
                              className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">Phone</label>
                            <input
                              type="tel"
                              defaultValue={phone}
                              className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                            />
                          </div>
                          <button type="submit" className="btn-primary">Save Changes</button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AccountSearchParams() {
  useSearchParams();
  return null;
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AccountSearchParams />
      <AccountContent />
    </Suspense>
  );
}
