import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { PriceRangeFilter } from '@/components/PriceRangeFilter';
import { categories } from '@/data/products';
import { useProducts } from '@/hooks/useProducts';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearchParams } from 'react-router-dom';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const { products, loading } = useProducts();
  const { currency } = useCurrency();
  
  // Currency-specific price ranges
  const priceRanges = {
    NGN: [10000, 85000] as [number, number],
    USD: [14, 99] as [number, number]
  };

  const [priceRange, setPriceRange] = useState<[number, number]>(priceRanges[currency]);

  // Reset price range when currency changes
  useEffect(() => {
    setPriceRange(priceRanges[currency]);
  }, [currency]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const price = currency === 'NGN' ? product.priceNGN : product.priceUSD;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = currency === 'NGN' ? a.priceNGN : a.priceUSD;
    const priceB = currency === 'NGN' ? b.priceNGN : b.priceUSD;
    
    switch (sortBy) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleResetPriceRange = () => {
    setPriceRange(priceRanges[currency]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-primary py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our Collection
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Explore our carefully curated selection of luxury fragrances and home scents
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 container mx-auto">
        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Left side filters */}
          <div className="lg:w-64 flex-shrink-0 space-y-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <PriceRangeFilter
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              onReset={handleResetPriceRange}
            />
          </div>

          {/* Right side - products */}
          <div className="flex-1">
            {/* Sort and count bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-muted-foreground">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
