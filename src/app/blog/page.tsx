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

export default function BlogPage() {
  return (
    <div>
      <section className="bg-cream/50 py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Journal
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal mb-4">
            Gift Guides and Ideas
          </h1>
          <p className="text-warm-gray text-lg font-light max-w-2xl">Curated inspiration for every occasion</p>
        </div>
      </section>
      
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: '10 Thoughtful Corporate Gifts for Your Team', category: 'Corporate Gifting', date: 'Aug 10, 2026', readTime: '5 min read' },
              { title: 'The Ultimate Diwali Gifting Guide 2026', category: 'Festival Gifts', date: 'Aug 5, 2026', readTime: '7 min read' },
              { title: 'Personalized Gifts That Truly Matter', category: 'Personalized Gifts', date: 'Jul 28, 2026', readTime: '4 min read' },
              { title: 'Client Appreciation Gifts That Build Relationships', category: 'Corporate Gifting', date: 'Jul 20, 2026', readTime: '6 min read' },
              { title: 'Birthday Gifts for Every Personality', category: 'Birthday Gifts', date: 'Jul 15, 2026', readTime: '5 min read' },
              { title: 'Onboarding Kits That Welcome New Employees', category: 'Employee Gifts', date: 'Jul 10, 2026', readTime: '4 min read' },
            ].map((post) => (
              <article key={post.title} className="group cursor-pointer">
                <div className="aspect-[16/10] bg-cream mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-soft-beige/50 to-cream group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <p className="text-accent text-sm font-medium mb-3 uppercase tracking-wider">{post.category}</p>
                <h3 className="font-display text-xl text-charcoal mb-3 group-hover:text-accent transition-colors duration-300">{post.title}</h3>
                <p className="text-warm-gray text-sm font-light">{post.date} • {post.readTime}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
