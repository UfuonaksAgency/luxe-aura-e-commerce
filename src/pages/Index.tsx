import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { products } from '@/data/products';
import heroImage from '@/assets/hero-fragrance.jpg';
import logo from '@/assets/logo-new.png';
import introVideo from '@/assets/intro-video.mp4';
import { ArrowRight, Sparkles, Home, Package } from 'lucide-react';

const Index = () => {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Video Hero Section - First Thing Visitors See */}
      <section className="relative h-screen min-h-[100svh] w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          poster={heroImage}
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src={introVideo} type="video/mp4" />
        </video>
        {/* Subtle bottom gradient for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary">
          <img
            src={heroImage}
            alt="Luxury Fragrances"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        {/* Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
          <img
            src={logo}
            alt=""
            className="w-96 md:w-[600px] h-auto opacity-10"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
            Luxury <span className="text-gold">Fragrances</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Discover our exclusive collection of premium perfumes and home fragrances, crafted for the sophisticated lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg" className="bg-gold text-primary hover:bg-gold/90 shadow-gold">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/story">
              <Button size="lg" variant="outline" className="border-gold bg-primary/20 text-primary-foreground hover:bg-gold/20 backdrop-blur-sm">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Sparkles className="text-gold h-8 w-8" />
            Featured Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Handpicked luxury fragrances that define sophistication and elegance
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/shop">
            <Button size="lg" variant="outline" className="border-gold hover:bg-gold/10">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Explore our curated collections</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link to="/shop?category=mens-perfume">
              <div className="group relative h-64 overflow-hidden rounded-lg border border-border/50 hover:border-gold/50 transition-luxury cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-navy to-primary opacity-90 group-hover:opacity-100 transition-luxury" />
                <div className="relative h-full flex flex-col items-center justify-center p-6">
                  <Package className="h-12 w-12 text-gold mb-4" />
                  <h3 className="font-serif text-3xl font-bold text-primary-foreground mb-2">Body Fragrances</h3>
                  <p className="text-primary-foreground/80 text-center">Luxury perfumes for men and women</p>
                </div>
              </div>
            </Link>
            <Link to="/shop?category=diffuser">
              <div className="group relative h-64 overflow-hidden rounded-lg border border-border/50 hover:border-gold/50 transition-luxury cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-skyblue to-navy opacity-90 group-hover:opacity-100 transition-luxury" />
                <div className="relative h-full flex flex-col items-center justify-center p-6">
                  <Home className="h-12 w-12 text-gold mb-4" />
                  <h3 className="font-serif text-3xl font-bold text-primary-foreground mb-2">Home & Space</h3>
                  <p className="text-primary-foreground/80 text-center">Diffusers, candles & room fragrances</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl font-bold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground mb-8">
            We're expanding our luxury offerings to bring you even more exquisite experiences
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 border border-border rounded-lg hover:border-gold/50 transition-luxury">
              <h3 className="font-serif text-xl font-bold mb-2">Food & Cloud Kitchen</h3>
              <p className="text-sm text-muted-foreground">Custom meals & catering services</p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:border-gold/50 transition-luxury">
              <h3 className="font-serif text-xl font-bold mb-2">Catering Services</h3>
              <p className="text-sm text-muted-foreground">Premium event catering</p>
            </div>
            <div className="p-6 border border-border rounded-lg hover:border-gold/50 transition-luxury">
              <h3 className="font-serif text-xl font-bold mb-2">Makeup & Beauty</h3>
              <p className="text-sm text-muted-foreground">Professional beauty services</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
