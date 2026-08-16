import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Gift Guides and Ideas | Impackt Gifting',
    description: 'Curated inspiration for every occasion. Discover thoughtful gift guides, corporate gifting ideas, personalized gift suggestions, and luxury employee gifts.',
    alternates: {
      canonical: '/blog',
    },
  };
};
