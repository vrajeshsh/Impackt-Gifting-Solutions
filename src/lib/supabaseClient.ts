import { createBrowserClient } from '@supabase/ssr';

export const supabaseBrowser = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string;
          phone_number: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name?: string | null;
          email: string;
          phone_number?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string;
          phone_number?: string | null;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          price: number;
          category: string | null;
          tags: string[] | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          price: number;
          category?: string | null;
          tags?: string[] | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          price?: number;
          category?: string | null;
          tags?: string[] | null;
          image_url?: string | null;
          created_at?: string;
        };
      };
      wishlists: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          total_amount: number;
          status: string | null;
          shipping_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          total_amount: number;
          status?: string | null;
          shipping_address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          total_amount?: number;
          status?: string | null;
          shipping_address?: string | null;
          created_at?: string;
        };
      };
    };
  };
};
