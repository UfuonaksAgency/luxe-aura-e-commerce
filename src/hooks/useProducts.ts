import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/contexts/CartContext';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedProducts: Product[] = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        priceNGN: p.price_ngn,
        priceUSD: p.price_usd,
        description: p.description,
        image: p.image_url,
        inStock: p.in_stock,
        featured: p.featured
      }));

      setProducts(mappedProducts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error };
};

export const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const mappedProduct: Product = {
          id: data.id,
          name: data.name,
          category: data.category,
          priceNGN: data.price_ngn,
          priceUSD: data.price_usd,
          description: data.description,
          image: data.image_url,
          inStock: data.in_stock,
          featured: data.featured
        };
        setProduct(mappedProduct);
      } else {
        setProduct(null);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error };
};
