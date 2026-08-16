-- Supabase schema for Impackt Gifting Solutions
-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query)

-- 1. profiles
create table if not exists public.profiles (
  id uuid not null primary key references auth.users on delete cascade,
  full_name text,
  email text not null unique,
  phone_number text,
  created_at timestamptz not null default now()
);

-- 2. products
create table if not exists public.products (
  id uuid not null primary key default gen_random_uuid(),
  title text not null,
  description text,
  price numeric not null,
  category text,
  tags text[],
  image_url text,
  created_at timestamptz not null default now()
);

-- 3. wishlists
create table if not exists public.wishlists (
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  product_id uuid not null references public.products on delete cascade,
  created_at timestamptz not null default now(),
  constraint wishlists_user_product_unique unique (user_id, product_id)
);

-- 4. orders
create table if not exists public.orders (
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete set null,
  total_amount numeric not null,
  status text,
  shipping_address text,
  created_at timestamptz not null default now()
);

-- Helpful indexes
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_wishlists_user_id on public.wishlists(user_id);
create index if not exists idx_orders_user_id on public.orders(user_id);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.wishlists enable row level security;
alter table public.orders enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Products policies
create policy "Products are viewable by everyone"
  on public.products for select
  using (true);

-- Wishlists policies
create policy "Users can view their own wishlist items"
  on public.wishlists for select
  using (auth.uid() = user_id);

create policy "Users can insert their own wishlist items"
  on public.wishlists for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own wishlist items"
  on public.wishlists for delete
  using (auth.uid() = user_id);

-- Orders policies
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can insert their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);
