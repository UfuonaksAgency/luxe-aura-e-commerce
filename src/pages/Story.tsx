import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Sparkles, Heart, Award, Globe } from 'lucide-react';

const Story = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Our Story
          </h1>
          <p className="text-xl text-primary-foreground/90 leading-relaxed">
            A journey of luxury, elegance, and the art of sophisticated living
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Beelicious Signatures Global was born from a passion for luxury and an unwavering commitment to excellence. 
              We believe that fragrance is more than just a scent—it's a signature, a statement, and an extension of one's personality.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our journey began with a simple vision: to bring world-class luxury fragrances and home scents to discerning 
              customers who appreciate the finer things in life. Every product in our collection is carefully curated to 
              meet the highest standards of quality and sophistication.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Today, we stand as a beacon of luxury in the fragrance industry, offering an exclusive range of body perfumes, 
              home fragrances, and soon, gourmet food and beauty services. Our commitment remains unchanged: to deliver 
              exceptional experiences that leave lasting impressions.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="border border-border rounded-lg p-8 hover:border-gold/50 transition-luxury">
              <div className="bg-gold/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Luxury</h3>
              <p className="text-muted-foreground leading-relaxed">
                We source only the finest fragrances and materials, ensuring every product embodies true luxury and elegance.
              </p>
            </div>

            <div className="border border-border rounded-lg p-8 hover:border-gold/50 transition-luxury">
              <div className="bg-gold/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Passion</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our love for exquisite scents drives us to curate collections that inspire and delight our customers.
              </p>
            </div>

            <div className="border border-border rounded-lg p-8 hover:border-gold/50 transition-luxury">
              <div className="bg-gold/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We maintain the highest standards in product quality, customer service, and overall brand experience.
              </p>
            </div>

            <div className="border border-border rounded-lg p-8 hover:border-gold/50 transition-luxury">
              <div className="bg-gold/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-gold" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">Global Reach</h3>
              <p className="text-muted-foreground leading-relaxed">
                From local to international, we bring luxury fragrances to customers wherever they are in the world.
              </p>
            </div>
          </div>

          {/* Future Vision */}
          <div className="mt-20 bg-secondary rounded-lg p-12 text-center">
            <h2 className="font-serif text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              As we expand into new territories—from gourmet food and cloud kitchens to professional beauty services—
              our mission remains the same: to create exceptional experiences that celebrate the art of luxury living. 
              Join us on this journey as we continue to redefine what it means to live beautifully.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Story;
