import HeroCarousel from '@/components/sections/HeroCarousel';
import GiftFinder from '@/components/sections/GiftFinder';
import CategoryShowcase from '@/components/sections/CategoryShowcase';
import FeaturedCollection from '@/components/sections/FeaturedCollection';
import FlashSale from '@/components/sections/FlashSale';
import BudgetGifts from '@/components/sections/BudgetGifts';
import OccasionCards from '@/components/sections/OccasionCards';
import TrustBadges from '@/components/sections/TrustBadges';
import CorporateCTA from '@/components/sections/CorporateCTA';
import Newsletter from '@/components/sections/Newsletter';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Premium Gifts for Every Occasion | Impackt Gifting Solutions',
    description: 'Discover premium corporate gifting, personalized gifts, and luxury employee gifts at Impackt Gifting Solutions. Custom branding, bulk orders, and curated hampers for every occasion.',
    alternates: {
      canonical: '/',
    },
  };
};

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <GiftFinder />
      <CategoryShowcase />
      <FeaturedCollection title="Best Sellers" filter="bestseller" />
      <FlashSale />
      <BudgetGifts />
      <FeaturedCollection title="New Arrivals" filter="newArrival" />
      <OccasionCards />
      <TrustBadges />
      <CorporateCTA />
      <Newsletter />
    </div>
  );
}
