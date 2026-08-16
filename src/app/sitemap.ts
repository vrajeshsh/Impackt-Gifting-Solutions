import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://impacktgifting.com';

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/corporate-gifting`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  const productPages = [
    'classic-stainless-steel-bottle',
    'copper-water-bottle',
    'insulated-coffee-tumbler',
    'designer-ceramic-mug',
    'premium-backpack',
    'laptop-bag-executive',
    'travel-duffle-bag',
    'sling-bag-urban',
    'wireless-earbuds',
    'power-bank-20000mah',
    'metal-pen-set',
    'visiting-card-holder',
    'metal-mobile-stand',
    'pu-leather-hand-bag',
    'pen-box-executive',
    'custom-keychain',
    'eco-desk-coaster-set',
    'mini-succulent-planter',
    'eco-pen-set',
    'festive-gift-hamper',
  ].map((slug) => ({
    url: `${baseUrl}/shop/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
