import { Suspense } from 'react';
import { Metadata } from 'next';
import ShopClient from './ShopClient';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Shop Premium Gifts | Impackt Gifting Solutions',
    description: 'Browse premium corporate gifting, personalized gifts, and luxury employee gifts. Custom drinkware, bags, electronics, promotional gifts, and apparel. Bulk orders available.',
    alternates: {
      canonical: '/shop',
    },
  };
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopClient />
    </Suspense>
  );
}
