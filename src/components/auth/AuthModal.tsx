'use client';

import { useState, useEffect } from 'react';
import { X, LogIn, UserPlus, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'signin' }: AuthModalProps) {
  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp, isConfigured } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setTab(defaultTab);
      setEmail('');
      setPassword('');
      setFullName('');
      setPhoneNumber('');
      setError(null);
      setSuccess(null);
      setIsSubmitting(false);
    }
  }, [isOpen, defaultTab]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    if (tab === 'signin') {
      const result = await signIn(email, password);
      if (result.error) {
        setError(result.error);
        setIsSubmitting(false);
      } else {
        setSuccess('Signed in successfully');
        setTimeout(() => onClose(), 500);
        setIsSubmitting(false);
      }
    } else {
      const result = await signUp(email, password, fullName, phoneNumber);
      if (result.error) {
        setError(result.error);
        setIsSubmitting(false);
      } else {
        setSuccess('Account created successfully!');
        setTimeout(() => onClose(), 1000);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-ivory dark:bg-stone-900 shadow-2xl w-full max-w-md border border-soft-beige/30 dark:border-stone-800 rounded-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {!isConfigured && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs rounded-sm">
              Database connection missing - Check .env.local
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-xs rounded-sm">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 text-xs rounded-sm">
              {error}
            </div>
          )}

          <div className="flex mb-8 border-b border-soft-beige/30 dark:border-stone-800">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${
                tab === 'signin'
                  ? 'text-charcoal dark:text-ivory'
                  : 'text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </span>
              {tab === 'signin' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent dark:bg-warm-gold" />
              )}
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${
                tab === 'signup'
                  ? 'text-charcoal dark:text-ivory'
                  : 'text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <UserPlus className="w-4 h-4" />
                Create Account
              </span>
              {tab === 'signup' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent dark:bg-warm-gold" />
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {tab === 'signup' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                placeholder="Enter your email"
              />
            </div>
            {tab === 'signup' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                  placeholder="+91 00000 00000"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {tab === 'signin' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {tab === 'signin' ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
