'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabaseBrowser } from '@/lib/supabaseClient';
import { X, Loader2, ArrowLeft } from 'lucide-react';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const { updatePassword, user, isConfigured } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isConfigured) {
      setError('Database connection missing - Check .env.local');
      setIsLoading(false);
      return;
    }

    const checkSession = async () => {
      const params = new URLSearchParams(window.location.search);
      const errorCode = params.get('error_code');
      const errorParam = params.get('error');

      if (errorCode === 'otp_expired' || errorParam === 'access_denied') {
        setIsExpired(true);
        setIsLoading(false);
        return;
      }

      try {
        const supabase = supabaseBrowser();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          setIsExpired(true);
        }
      } catch {
        setIsExpired(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [isConfigured]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    const result = await updatePassword(password);
    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      setSuccess('Password updated successfully! Redirecting to sign in...');
      setIsSubmitting(false);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  };

  const handleRequestNewLink = () => {
    router.push('/?auth-modal=reset');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-charcoal">
        <Loader2 className="w-6 h-6 animate-spin text-accent dark:text-warm-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-charcoal p-4">
      <div className="relative bg-ivory dark:bg-stone-900 shadow-2xl w-full max-w-md border border-soft-beige/30 dark:border-stone-800 rounded-sm">
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

          {isExpired ? (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-serif text-charcoal dark:text-ivory">Link Expired</h1>
                <p className="mt-2 text-sm text-warm-gray dark:text-stone-400">
                  Your password reset link has expired or has already been used. Please request a new one.
                </p>
              </div>

              <button
                type="button"
                onClick={handleRequestNewLink}
                className="w-full btn-primary"
              >
                Request New Reset Link
              </button>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-serif text-charcoal dark:text-ivory">Update Password</h1>
                <p className="mt-2 text-sm text-warm-gray dark:text-stone-400">
                  Enter your new password below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-charcoal dark:text-ivory">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 border border-soft-beige/50 dark:border-stone-700 bg-ivory dark:bg-stone-800 focus:outline-none focus:border-accent transition-colors text-sm text-charcoal dark:text-ivory"
                    placeholder="Confirm new password"
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
                    'Update Password'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
