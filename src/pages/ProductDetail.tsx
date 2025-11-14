import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingCart, Truck, Shield, Package } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

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

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/shop">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
            <img
              src={imageMap[product.image]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="font-serif text-4xl font-bold mb-4">{product.name}</h1>
            <div className="text-3xl font-bold text-gold mb-6">
              {formatPrice(product.priceNGN, product.priceUSD)}
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            <Button
              size="lg"
              onClick={handleAddToCart}
              className="bg-gold text-primary hover:bg-gold/90 mb-8 shadow-gold"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            {/* Features */}
            <div className="space-y-4 border-t pt-8">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-gold" />
                <div>
                  <h3 className="font-semibold">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">On orders over ₦50,000</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gold" />
                <div>
                  <h3 className="font-semibold">Authentic Products</h3>
                  <p className="text-sm text-muted-foreground">100% genuine luxury fragrances</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gold" />
                <div>
                  <h3 className="font-semibold">Premium Packaging</h3>
                  <p className="text-sm text-muted-foreground">Luxury gift-ready presentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
