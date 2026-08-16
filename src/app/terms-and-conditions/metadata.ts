import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Terms and Conditions | Impackt Gifting Solutions',
    description: 'Read the terms and conditions for using Impackt Gifting Solutions website. Information about orders, payments, shipping, returns, and intellectual property for corporate gifting.',
    alternates: {
      canonical: '/terms-and-conditions',
    },
  };
};
