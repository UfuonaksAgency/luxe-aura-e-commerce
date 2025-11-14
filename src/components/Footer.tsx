import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo-new.png';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Subscribed!',
      description: 'Thank you for subscribing to our newsletter.',
    });
    setEmail('');
  };

  return (
    <footer className="bg-primary text-primary-foreground border-t border-gold/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <img src={logo} alt="Beelicious Signatures Global" className="h-16 md:h-24 w-auto mb-4" />
            <h3 className="font-serif text-lg font-bold mb-4 text-gold">About Us</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Beelicious Signatures Global offers luxury fragrances, home scents, and premium products for the discerning customer.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm hover:text-gold transition-luxury">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link to="/story" className="text-sm hover:text-gold transition-luxury">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-gold transition-luxury">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/coming-soon" className="text-sm hover:text-gold transition-luxury">
                  Coming Soon
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-gold">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-gold" />
                info@beelicious.com
              </li>
              <li className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-gold" />
                +234 800 000 0000
              </li>
              <li className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-gold" />
                Lagos, Nigeria
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-gold">Newsletter</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-primary-foreground/10 border-gold/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button type="submit" variant="default" className="bg-gold text-primary hover:bg-gold/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-8 pt-8 border-t border-gold/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/60">
            © 2025 Beelicious Signatures Global. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-primary-foreground hover:text-gold transition-luxury">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-primary-foreground hover:text-gold transition-luxury">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-primary-foreground hover:text-gold transition-luxury">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
