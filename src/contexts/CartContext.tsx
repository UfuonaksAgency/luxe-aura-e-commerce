import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

export interface Product {
  id: string;
  name: string;
  category: string;
  priceNGN: number;
  priceUSD: number;
  description?: string;
  image?: string;
  inStock?: boolean;
  featured?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPriceNGN: number;
  totalPriceUSD: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Load cart from database when user logs in
  useEffect(() => {
    if (user) {
      loadCartFromDatabase();
    } else {
      // Load from localStorage for guests
      const savedCart = localStorage.getItem('guestCart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    }
  }, [user]);

  // Save to localStorage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem('guestCart', JSON.stringify(items));
    }
  }, [items, user]);

  const loadCartFromDatabase = async () => {
    if (!user) return;

    try {
      const { data: cartData, error } = await supabase
        .from('cart_items')
        .select(`
          quantity,
          products (
            id,
            name,
            category,
            price_ngn,
            price_usd,
            description,
            image_url,
            in_stock,
            featured
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const cartItems: CartItem[] = cartData.map((item: any) => ({
        id: item.products.id,
        name: item.products.name,
        category: item.products.category,
        priceNGN: item.products.price_ngn,
        priceUSD: item.products.price_usd,
        description: item.products.description,
        image: item.products.image_url,
        inStock: item.products.in_stock,
        featured: item.products.featured,
        quantity: item.quantity
      }));

      setItems(cartItems);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async (product: Product) => {
    const existingItem = items.find(item => item.id === product.id);
    const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .upsert({
            user_id: user.id,
            product_id: product.id,
            quantity: newQuantity
          });

        if (error) throw error;
        await loadCartFromDatabase();
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    } else {
      // Guest cart - use local state
      if (existingItem) {
        setItems(items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setItems([...items, { ...product, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) throw error;
        await loadCartFromDatabase();
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      setItems(items.filter(item => item.id !== productId));
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', user.id)
          .eq('product_id', productId);

        if (error) throw error;
        await loadCartFromDatabase();
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    } else {
      setItems(items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
        setItems([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    } else {
      setItems([]);
      localStorage.removeItem('guestCart');
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceNGN = items.reduce((sum, item) => sum + (item.priceNGN * item.quantity), 0);
  const totalPriceUSD = items.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPriceNGN,
        totalPriceUSD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
