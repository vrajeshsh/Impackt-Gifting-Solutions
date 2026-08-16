import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Contact Us | Impackt Gifting Solutions',
    description: 'Get in touch with Impackt Gifting Solutions for premium corporate gifting, personalized gifts, and luxury employee gifts. Visit our store in Kolkata or call +91 73372 88823.',
    alternates: {
      canonical: '/contact',
    },
  };
};
