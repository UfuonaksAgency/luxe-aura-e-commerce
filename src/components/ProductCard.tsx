import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

// Import product images
import royalOudImage from '@/assets/products/royal-oud-intense.jpg';
import velvetBloomImage from '@/assets/products/velvet-bloom.jpg';
import amberDiffuserImage from '@/assets/products/amber-night-diffuser.jpg';
import vanillaCandleImage from '@/assets/products/crystal-vanilla-candle.jpg';
import oceanFreshenerImage from '@/assets/products/ocean-blue-freshener.jpg';
import citrusEleganceImage from '@/assets/products/citrus-elegance.jpg';
import lavenderDreamsImage from '@/assets/products/lavender-dreams.jpg';
import roseImperialImage from '@/assets/products/rose-imperial.jpg';
import sandalwoodCandleImage from '@/assets/products/sandalwood-candle.jpg';

const imageMap: Record<string, string> = {
  '/src/assets/products/royal-oud-intense.jpg': royalOudImage,
  '/src/assets/products/velvet-bloom.jpg': velvetBloomImage,
  '/src/assets/products/amber-night-diffuser.jpg': amberDiffuserImage,
  '/src/assets/products/crystal-vanilla-candle.jpg': vanillaCandleImage,
  '/src/assets/products/ocean-blue-freshener.jpg': oceanFreshenerImage,
  '/src/assets/products/citrus-elegance.jpg': citrusEleganceImage,
  '/src/assets/products/lavender-dreams.jpg': lavenderDreamsImage,
  '/src/assets/products/rose-imperial.jpg': roseImperialImage,
  '/src/assets/products/sandalwood-candle.jpg': sandalwoodCandleImage,
};

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-gold/50 transition-luxury hover:shadow-gold">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-secondary">
          <img
            src={imageMap[product.image] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-luxury"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg font-semibold mb-1 group-hover:text-gold transition-luxury">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-gold">
            {formatPrice(product.priceNGN, product.priceUSD)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-primary hover:bg-navy transition-luxury"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};
