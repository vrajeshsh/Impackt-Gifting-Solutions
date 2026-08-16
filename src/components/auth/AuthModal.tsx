'use client';

import { useState, useEffect } from 'react';
import { X, LogIn, UserPlus, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l2.85 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup' | 'reset';
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'signin' }: AuthModalProps) {
  const [tab, setTab] = useState<'signin' | 'signup' | 'reset'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetMode, setResetMode] = useState(defaultTab === 'reset');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signIn, signUp, resetPassword, isConfigured } = useAuth();

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
      setResetMode(defaultTab === 'reset');
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

    if (resetMode) {
      const result = await resetPassword(email);
      if (result.error) {
        setError(result.error);
        setIsSubmitting(false);
      } else {
        setSuccess('Reset email sent! Check your inbox.');
        setIsSubmitting(false);
      }
      return;
    }

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

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccess(null);
    setIsGoogleLoading(true);

    try {
      const supabase = supabaseBrowser();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setIsGoogleLoading(false);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google sign-in failed';
      setError(message);
      setIsGoogleLoading(false);
    }
  };

  const supabaseBrowser = () => {
    const { createBrowserClient } = require('@supabase/ssr');
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
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

          {!resetMode && (
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
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isSubmitting}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 hover:bg-cream dark:hover:bg-stone-700 transition-colors text-sm font-medium text-charcoal dark:text-ivory disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <GoogleIcon />
                  Continue with Google
                </>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-soft-beige/30 dark:border-stone-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-ivory dark:bg-stone-900 px-3 text-warm-gray dark:text-stone-400">Or</span>
              </div>
            </div>

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
            {!resetMode && (
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
            )}
            {!resetMode && tab === 'signin' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setResetMode(true)}
                  className="text-xs text-accent dark:text-warm-gold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {resetMode ? <LogIn className="w-4 h-4" /> : tab === 'signin' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {resetMode ? 'Send Reset Link' : tab === 'signin' ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
            {resetMode && (
              <button
                type="button"
                onClick={() => setResetMode(false)}
                className="w-full text-xs text-warm-gray dark:text-stone-400 hover:text-charcoal dark:hover:text-ivory transition-colors"
              >
                Back to Sign In
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
