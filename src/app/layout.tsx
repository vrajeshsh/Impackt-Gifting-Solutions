import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import GlobalImageErrorHandler from '@/components/GlobalImageErrorHandler';
import EnvValidationBanner from '@/components/EnvValidationBanner';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import { ThemeProvider } from '@/lib/theme-context';
import { AuthProvider } from '@/lib/auth-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://impacktgifting.com'),
  title: {
    default: 'Impackt Gifting Solutions | Premium Gifts for Every Occasion',
    template: '%s | Impackt Gifting',
  },
  description: 'Discover premium corporate gifting, personalized gifts, and luxury employee gifts at Impackt Gifting Solutions. Custom branding, bulk orders, and curated hampers for every occasion. Based in Kolkata, India.',
  keywords: ['corporate gifting', 'personalized gifts', 'luxury employee gifts', 'custom corporate gifts', 'premium gifting India', 'employee appreciation gifts', 'client gifts', 'Diwali gifts', 'corporate gifting Kolkata', 'gift hampers'],
  authors: [{ name: 'Impackt Gifting Solutions' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://impacktgifting.com',
    siteName: 'Impackt Gifting Solutions',
    title: 'Impackt Gifting Solutions | Premium Gifts for Every Occasion',
    description: 'Discover premium corporate gifting, personalized gifts, and luxury employee gifts. Custom branding, bulk orders, and curated hampers for every occasion.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-body bg-ivory text-charcoal antialiased transition-colors duration-300`}>
        <EnvValidationBanner />
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Header />
                <main className="pt-16 md:pt-24">{children}</main>
                <Footer />
                <CartDrawer />
                <GlobalImageErrorHandler />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
