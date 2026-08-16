import { Suspense } from 'react';
import { Metadata } from 'next';
import AccountClient from './AccountClient';

export const generateMetadata = (): Metadata => {
  return {
    title: 'My Account | Impackt Gifting Solutions',
    description: 'Manage your Impackt Gifting account. View orders, manage wishlist, update addresses, and customize your preferences for corporate gifting and personalized gifts.',
    alternates: {
      canonical: '/account',
    },
    robots: {
      index: false,
      follow: true,
    },
  };
};

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AccountClient />
    </Suspense>
  );
}
