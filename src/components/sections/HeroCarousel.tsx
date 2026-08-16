'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Timer } from 'lucide-react';
import { products } from '@/data/products';

const slides = [
  {
    id: 1,
    title: 'Festive & Seasonal Gifting',
    subtitle: 'Up to 40% Off on Curated Hampers',
    cta: 'Shop Festive Sale',
    href: '/shop?occasion=festival',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1920&h=1080&fit=crop&auto=format',
    dealProduct: products.find((p) => p.slug === 'festive-gift-hamper'),
  },
  {
    id: 2,
    title: 'Custom Corporate Gifting',
    subtitle: 'Bulk Branding & Custom Logo Printing Available',
    cta: 'Get Bulk Quote',
    href: '/corporate-gifting',
    image: 'https://images.unsplash.com/photo-1585336261022-680e295c3f31?w=1920&h=1080&fit=crop&auto=format',
    dealProduct: products.find((p) => p.slug === 'metal-pen-set'),
  },
  {
    id: 3,
    title: 'Premium Executive Collections',
    subtitle: 'Handcrafted Leather & Eco-friendly Desk Essentials',
    cta: 'Explore Premium',
    href: '/shop?category=promotional-gifting',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1920&h=1080&fit=crop&auto=format',
    dealProduct: products.find((p) => p.slug === 'pen-box-executive'),
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 22, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const goTo = (index: number) => setCurrent(index);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  const pad = (n: number) => n.toString().padStart(2, '0');
  const slide = slides[current];
  const dealProduct = slide.dealProduct;

  const TitleTag = ({ text, isActive }: { text: string; isActive: boolean }) =>
    isActive ? (
      <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory mb-8 leading-[0.95]">{text}</h1>
    ) : (
      <span className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory mb-8 leading-[0.95]">{text}</span>
    );

  return (
    <section className="relative h-[90vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {slides.map((s, index) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-3xl animate-fade-in-up">
                <p className="text-accent text-sm md:text-base font-medium uppercase tracking-[0.3em] mb-6">
                  {s.subtitle}
                </p>
                <TitleTag text={s.title} isActive={index === current} />
                
                {dealProduct && (
                  <div className="bg-white/10 dark:bg-stone-900/80 backdrop-blur-md border border-white/20 dark:border-stone-700 p-4 md:p-6 mb-8 max-w-md">
                    <div className="flex items-center gap-2 mb-3">
                      <Timer className="w-4 h-4 text-accent" />
                      <span className="text-xs text-ivory uppercase tracking-wider">Limited-time deal</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-cream/20 dark:bg-stone-800 overflow-hidden flex-shrink-0">
                        <img
                          src={dealProduct.images[0]}
                          alt={dealProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-ivory text-sm font-medium truncate">{dealProduct.name}</p>
                        <p className="text-ivory/80 text-xs">Deal ends in</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <span className="bg-ivory/10 px-2 py-1.5 rounded text-lg font-display text-ivory">{pad(timeLeft.hours)}</span>
                      <span className="text-ivory text-xl">:</span>
                      <span className="bg-ivory/10 px-2 py-1.5 rounded text-lg font-display text-ivory">{pad(timeLeft.minutes)}</span>
                      <span className="text-ivory text-xl">:</span>
                      <span className="bg-ivory/10 px-2 py-1.5 rounded text-lg font-display text-ivory">{pad(timeLeft.seconds)}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={s.href} className="btn-primary">
                    {s.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-ivory/10 hover:bg-ivory/20 backdrop-blur-sm text-ivory transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 bg-ivory/10 hover:bg-ivory/20 backdrop-blur-sm text-ivory transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? 'bg-ivory w-8' : 'bg-ivory/40 hover:bg-ivory/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
