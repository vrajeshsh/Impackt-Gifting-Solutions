import { siteContent } from '@/data/content';
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

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[400px] flex items-center bg-cream">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Our Story
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-charcoal mb-6 leading-tight">
            A Legacy of Excellence
          </h1>
          <p className="text-xl text-warm-gray max-w-2xl font-light">
            From kitchenware to premium gifting — six decades of trust, now reimagined for modern India.
          </p>
        </div>
      </section>
      
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative aspect-[4/5] bg-cream">
              <img
                src="https://picsum.photos/seed/our-story/800/800"
                alt="Our story"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              {siteContent.about.paragraphs.map((para, idx) => (
                <p key={idx} className="text-warm-gray text-lg leading-relaxed font-light">{para}</p>
              ))}
            </div>
          </div>
          
          <div className="text-center mb-20">
            <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
              Our Journey
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Six Decades of Trust
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-24">
            {siteContent.about.history.map((item) => (
              <div key={item.year} className="text-center p-6">
                <p className="text-accent font-display text-2xl mb-2">{item.year}</p>
                <h3 className="font-display text-xl text-charcoal mb-3">{item.title}</h3>
                <p className="text-warm-gray text-sm font-light">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mb-20">
            <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
              What We Believe
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              The Impackt Difference
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteContent.about.beliefs.map((belief, idx) => (
              <div key={idx} className="p-8 md:p-10 bg-white border border-soft-beige/30">
                <div className="w-8 h-px bg-accent mb-6" />
                <p className="text-warm-gray leading-relaxed font-light italic">"{belief}"</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mb-20 mt-24">
            <p className="text-accent text-sm font-medium uppercase tracking-[0.3em] mb-4">
              What Sets Us Apart
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6">
              Why Choose Us
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteContent.differentiators.map((item) => (
              <div key={item.title} className="p-8 md:p-10 bg-white border border-soft-beige/30 hover:border-accent/30 transition-all duration-500">
                <h3 className="font-display text-xl text-charcoal mb-4">{item.title}</h3>
                <p className="text-warm-gray leading-relaxed font-light">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
