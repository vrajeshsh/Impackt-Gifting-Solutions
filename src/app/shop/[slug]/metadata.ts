import { Metadata } from 'next';
import { products } from '@/data/products';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found | Impackt Gifting',
      description: 'The product you are looking for could not be found.',
      alternates: {
        canonical: '/shop',
      },
    };
  }

  return {
    title: `${product.name} | Impackt Gifting Solutions`,
    description: product.description,
    alternates: {
      canonical: `/shop/${product.slug}`,
    },
  };
}
