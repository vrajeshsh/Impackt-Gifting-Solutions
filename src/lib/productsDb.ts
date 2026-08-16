import { products as localProducts, categories as localCategories } from '@/data/products';
import { supabaseBrowser } from './supabaseClient';
import { Product, Category } from '@/types';

export async function getProducts(): Promise<Product[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return localProducts;
  }

  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return localProducts;
  }

  return data.map((row) => ({
    id: row.id,
    name: row.title,
    slug: row.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    description: row.description || '',
    price: row.price,
    inrPrice: row.price,
    category: row.category || 'Uncategorized',
    subcategory: row.category || 'Uncategorized',
    tags: row.tags || [],
    occasions: [],
    images: row.image_url ? [row.image_url] : [],
    personalizable: false,
    availability: 'in_stock',
    featured: false,
    bestseller: false,
    newArrival: false,
    corporateFavorite: false,
  }));
}

export async function getCategories(): Promise<Category[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return localCategories;
  }

  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from('products')
    .select('category, image_url')
    .not('category', 'is', null);

  if (error || !data || data.length === 0) {
    return localCategories;
  }

  const categoryMap = new Map<string, { count: number; image: string }>();
  data.forEach((row) => {
    if (!row.category) return;
    const existing = categoryMap.get(row.category) || { count: 0, image: row.image_url || '' };
    categoryMap.set(row.category, {
      count: existing.count + 1,
      image: existing.image || row.image_url || '',
    });
  });

  return Array.from(categoryMap.entries()).map(([name, info], index) => ({
    id: String(index + 1),
    name,
    slug: name.toLowerCase().replace(/ and /g, '-').replace(/ /g, '-'),
    description: '',
    image: info.image || '',
    productCount: info.count,
  }));
}
