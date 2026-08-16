import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'About Us | Impackt Gifting Solutions',
    description: 'Learn about Impackt Gifting Solutions - a legacy of excellence in premium corporate gifting, personalized gifts, and luxury employee gifts since 1965. Based in Kolkata, India.',
    alternates: {
      canonical: '/about',
    },
  };
};
