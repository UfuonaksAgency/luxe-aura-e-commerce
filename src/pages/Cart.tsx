import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

// Import product images
import royalOudImage from '@/assets/products/royal-oud-intense.jpg';
import velvetBloomImage from '@/assets/products/velvet-bloom.jpg';
import amberDiffuserImage from '@/assets/products/amber-night-diffuser.jpg';
import vanillaCandleImage from '@/assets/products/crystal-vanilla-candle.jpg';
import oceanFreshenerImage from '@/assets/products/ocean-blue-freshener.jpg';

const imageMap: Record<string, string> = {
  'royal-oud-intense': royalOudImage,
  'velvet-bloom': velvetBloomImage,
  'amber-night-diffuser': amberDiffuserImage,
  'crystal-vanilla-candle': vanillaCandleImage,
  'ocean-blue-freshener': oceanFreshenerImage,
};

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPriceNGN, totalPriceUSD, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="font-serif text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Discover our luxury fragrances and add items to your cart
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-gold text-primary hover:bg-gold/90">
              Continue Shopping
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 border border-border rounded-lg p-4 hover:border-gold/50 transition-luxury">
                <img
                  src={imageMap[item.image]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-serif text-lg font-semibold mb-1 hover:text-gold transition-luxury">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                  <div className="text-gold font-bold">
                    {formatPrice(item.priceNGN, item.priceUSD)}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
            >
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-lg p-6 sticky top-24">
              <h2 className="font-serif text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">
                    {currency === 'NGN' 
                      ? `₦${totalPriceNGN.toLocaleString()}`
                      : `$${totalPriceUSD}`
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">Calculated at checkout</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-gold">
                    {currency === 'NGN' 
                      ? `₦${totalPriceNGN.toLocaleString()}`
                      : `$${totalPriceUSD}`
                    }
                  </span>
                </div>
              </div>
              <Button className="w-full bg-gold text-primary hover:bg-gold/90 mb-3 shadow-gold">
                Proceed to Checkout
              </Button>
              <Link to="/shop">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Shipping costs and payment options will be shown at checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
