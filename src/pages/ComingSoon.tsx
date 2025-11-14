import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ChefHat, Utensils, Sparkles } from 'lucide-react';
import { useState } from 'react';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Success!',
      description: "We'll notify you when these services launch.",
    });
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-navy to-primary py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Exciting New Services Coming Soon
          </h1>
          <p className="text-xl text-primary-foreground/90 leading-relaxed">
            We're expanding our luxury offerings to bring you even more exquisite experiences
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Food & Cloud Kitchen */}
            <div className="border border-border rounded-lg p-8 text-center hover:border-gold/50 transition-luxury hover:shadow-gold">
              <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ChefHat className="h-10 w-10 text-gold" />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-4">Food & Cloud Kitchen</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gourmet meals prepared by expert chefs, delivered fresh to your door. 
                Experience luxury dining in the comfort of your home.
              </p>
              <div className="inline-block bg-skyblue/10 text-skyblue px-4 py-2 rounded-full text-sm font-semibold">
                Launching Soon
              </div>
            </div>

            {/* Catering Services */}
            <div className="border border-border rounded-lg p-8 text-center hover:border-gold/50 transition-luxury hover:shadow-gold">
              <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils className="h-10 w-10 text-gold" />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-4">Catering Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Premium catering for your special events. From intimate gatherings to grand celebrations, 
                we bring culinary excellence to every occasion.
              </p>
              <div className="inline-block bg-skyblue/10 text-skyblue px-4 py-2 rounded-full text-sm font-semibold">
                Launching Soon
              </div>
            </div>

            {/* Makeup & Beauty */}
            <div className="border border-border rounded-lg p-8 text-center hover:border-gold/50 transition-luxury hover:shadow-gold">
              <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-10 w-10 text-gold" />
              </div>
              <h2 className="font-serif text-2xl font-bold mb-4">Makeup & Beauty</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Professional makeup and beauty services for every occasion. 
                Let our experts bring out your natural radiance and elegance.
              </p>
              <div className="inline-block bg-skyblue/10 text-skyblue px-4 py-2 rounded-full text-sm font-semibold">
                Coming Later
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-2xl mx-auto bg-primary rounded-lg p-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground mb-4">
              Be the First to Know
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Sign up to receive exclusive updates and early access when these services launch
            </p>
            <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-primary-foreground/10 border-gold/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button type="submit" className="bg-gold text-primary hover:bg-gold/90 shadow-gold whitespace-nowrap">
                Notify Me
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComingSoon;
