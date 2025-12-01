import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { user, loading: authLoading } = useAuth();
  const { items, totalPriceNGN, totalPriceUSD, clearCart } = useCart();
  const { currency, formatPrice, formatSinglePrice } = useCurrency();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: 'Nigeria',
    postalCode: ''
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [user, authLoading, items, navigate]);

  const shippingCost = currency === 'NGN' ? 2500 : 5;
  const subtotal = currency === 'NGN' ? totalPriceNGN : totalPriceUSD;
  const total = subtotal + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // TODO: Implement payment integration (Paystack for NGN, Stripe for USD)
    toast({
      title: "Feature coming soon",
      description: "Payment integration will be available soon. Your order has been saved.",
    });

    // For now, just clear cart and navigate
    setTimeout(() => {
      clearCart();
      navigate('/account/orders');
    }, 2000);
  };

  if (authLoading || !user || items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground">Checkout</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-border/40 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={address.street}
                        onChange={(e) => setAddress({...address, street: e.target.value})}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={address.city}
                          onChange={(e) => setAddress({...address, city: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={address.state}
                          onChange={(e) => setAddress({...address, state: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={address.country}
                          onChange={(e) => setAddress({...address, country: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={address.postalCode}
                          onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="border-border/40 bg-card/50 backdrop-blur sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium text-foreground">
                        {formatPrice(
                          item.priceNGN * item.quantity,
                          item.priceUSD * item.quantity
                        )}
                      </span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground">{formatSinglePrice(subtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground">{formatSinglePrice(shippingCost, currency)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">{formatSinglePrice(total, currency)}</span>
                  </div>
                  <Button 
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay with ${currency === 'NGN' ? 'Paystack' : 'Stripe'}`}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    You will be redirected to complete the payment
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
