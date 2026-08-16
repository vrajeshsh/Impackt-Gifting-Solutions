'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabaseBrowser } from './supabaseClient';

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string;
  phone_number: string | null;
}

interface AuthContextType {
  user: { id: string; email?: string; user_metadata?: { full_name?: string; phone_number?: string } } | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isConfigured: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string, phoneNumber: string) => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (password: string) => Promise<{ error: string | null }>;
  updateProfile: (updates: { full_name?: string | null; phone_number?: string | null; email?: string }) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkConfig = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const valid = Boolean(url && key && url.includes('supabase.co') && key.length > 20);
    setIsConfigured(valid);
    return valid;
  };

  const fetchProfile = async (userId: string) => {
    const supabase = supabaseBrowser();
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, phone_number, email')
      .eq('id', userId)
      .maybeSingle();

    if (error || !data) return null;
    return {
      id: userId,
      full_name: data.full_name,
      email: data.email,
      phone_number: data.phone_number,
    } as UserProfile;
  };

  const ensureProfile = async (userId: string, email: string, fullName?: string, phoneNumber?: string) => {
    const supabase = supabaseBrowser();
    const existing = await fetchProfile(userId);
    if (existing) return existing;

    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email,
        full_name: fullName || null,
        phone_number: phoneNumber || null,
      })
      .select('full_name, phone_number, email')
      .single();

    if (error || !data) return null;
    return {
      id: userId,
      full_name: data.full_name,
      email: data.email,
      phone_number: data.phone_number,
    } as UserProfile;
  };

  const refreshProfile = async () => {
    if (!user?.id) return;
    const profileData = await fetchProfile(user.id);
    setProfile(profileData);
  };

  useEffect(() => {
    const init = async () => {
      if (!checkConfig()) {
        setIsLoading(false);
        return;
      }

      const supabase = supabaseBrowser();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name;
        const phoneNumber = user.user_metadata?.phone_number;
        const profileData = await ensureProfile(user.id, user.email || '', fullName, phoneNumber);
        setProfile(profileData);
      }
      setIsLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabaseBrowser().auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const fullName = session.user.user_metadata?.full_name || session.user.user_metadata?.name;
        const phoneNumber = session.user.user_metadata?.phone_number;
        const profileData = await ensureProfile(session.user.id, session.user.email || '', fullName, phoneNumber);
        setProfile(profileData);
      } else {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setError(null);
    if (!checkConfig()) {
      setError('Database connection missing - Check .env.local');
      return { error: 'Database connection missing - Check .env.local' };
    }

    try {
      const supabase = supabaseBrowser();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      if (data.user) {
        setUser(data.user);
        const profileData = await ensureProfile(data.user.id, data.user.email || '');
        setProfile(profileData);
      }
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      return { error: message };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phoneNumber: string) => {
    setError(null);
    if (!checkConfig()) {
      setError('Database connection missing - Check .env.local');
      return { error: 'Database connection missing - Check .env.local' };
    }

    try {
      const supabase = supabaseBrowser();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone_number: phoneNumber,
          },
        },
      });

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      if (data.user) {
        await supabase.from('profiles').insert({
          id: data.user.id,
          email,
          full_name: fullName,
          phone_number: phoneNumber,
        });

        setUser(data.user);
        setProfile({
          id: data.user.id,
          full_name: fullName,
          email,
          phone_number: phoneNumber,
        });
      }
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign up failed';
      setError(message);
      return { error: message };
    }
  };

  const signOut = async () => {
    try {
      await supabaseBrowser().auth.signOut();
    } catch {
      // ignore signOut errors
    }
    setUser(null);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    setError(null);
    if (!checkConfig()) {
      setError('Database connection missing - Check .env.local');
      return { error: 'Database connection missing - Check .env.local' };
    }

    try {
      const supabase = supabaseBrowser();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset failed';
      setError(message);
      return { error: message };
    }
  };

  const updatePassword = async (password: string) => {
    setError(null);
    if (!checkConfig()) {
      setError('Database connection missing - Check .env.local');
      return { error: 'Database connection missing - Check .env.local' };
    }

    try {
      const supabase = supabaseBrowser();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password update failed';
      setError(message);
      return { error: message };
    }
  };

  const updateProfile = async (updates: { full_name?: string | null; phone_number?: string | null; email?: string }) => {
    if (!user?.id) return { error: 'Not authenticated' };
    setError(null);
    
    try {
      const supabase = supabaseBrowser();
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          email: updates.email ?? profile?.email,
        })
        .eq('id', user.id);

      if (error) {
        setError(error.message);
        return { error: error.message };
      }

      const updatedProfile = await fetchProfile(user.id);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
      return { error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Profile update failed';
      setError(message);
      return { error: message };
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{ user, profile, isLoading, isConfigured, error, signIn, signUp, resetPassword, updatePassword, updateProfile, signOut, refreshProfile, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
