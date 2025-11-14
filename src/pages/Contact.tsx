import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting us. We will get back to you soon.',
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-primary py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <h2 className="font-serif text-3xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us how we can help you..."
                />
              </div>
              <Button type="submit" className="w-full bg-gold text-primary hover:bg-gold/90 shadow-gold">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="font-serif text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gold/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">info@beelicious.com</p>
                  <p className="text-muted-foreground">support@beelicious.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-muted-foreground">+234 800 000 0000</p>
                  <p className="text-muted-foreground">Mon-Fri: 9am - 6pm WAT</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold/10 p-3 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">WhatsApp</h3>
                  <p className="text-muted-foreground">+234 800 000 0000</p>
                  <p className="text-muted-foreground">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gold/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-muted-foreground">Lagos, Nigeria</p>
                  <p className="text-muted-foreground">Serving nationwide & internationally</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-secondary rounded-lg">
              <h3 className="font-serif text-xl font-bold mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
