-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price_ngn NUMERIC NOT NULL,
  price_usd NUMERIC NOT NULL,
  description TEXT,
  image_url TEXT,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
ON public.products FOR SELECT
USING (true);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Create addresses table
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  label TEXT DEFAULT 'Home',
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  postal_code TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own addresses"
ON public.addresses FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own addresses"
ON public.addresses FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own addresses"
ON public.addresses FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own addresses"
ON public.addresses FOR DELETE
USING (auth.uid() = user_id);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own cart"
ON public.cart_items FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into their own cart"
ON public.cart_items FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart"
ON public.cart_items FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from their own cart"
ON public.cart_items FOR DELETE
USING (auth.uid() = user_id);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending',
  currency TEXT NOT NULL,
  subtotal NUMERIC NOT NULL,
  shipping_cost NUMERIC DEFAULT 0,
  total NUMERIC NOT NULL,
  payment_method TEXT,
  payment_reference TEXT,
  shipping_address JSONB,
  tracking_number TEXT,
  tracking_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  product_name TEXT NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_ngn NUMERIC NOT NULL,
  price_usd NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own order items"
ON public.order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed products from existing data (letting database generate UUIDs)
INSERT INTO public.products (name, category, price_ngn, price_usd, description, image_url, in_stock, featured) VALUES
('Royal Oud Intense', 'Men''s Perfumes', 45000, 35, 'A rich and luxurious oud fragrance with notes of amber, sandalwood, and musk. Perfect for the sophisticated gentleman.', '/src/assets/products/royal-oud-intense.jpg', true, true),
('Velvet Bloom', 'Women''s Perfumes', 42000, 32, 'An elegant floral composition featuring rose, jasmine, and vanilla. A timeless feminine fragrance.', '/src/assets/products/velvet-bloom.jpg', true, true),
('Citrus Elegance', 'Oil Perfumes', 35000, 28, 'A fresh and invigorating blend of bergamot, lemon, and neroli in a premium oil base.', '/src/assets/products/citrus-elegance.jpg', true, false),
('Rose Imperial', 'Women''s Perfumes', 48000, 38, 'A majestic rose fragrance enhanced with patchouli and amber. Truly regal.', '/src/assets/products/rose-imperial.jpg', true, true),
('Amber Night', 'Diffusers', 25000, 20, 'Transform your space with this warm amber diffuser. Includes premium reeds.', '/src/assets/products/amber-night-diffuser.jpg', true, false),
('Lavender Dreams', 'Scented Candles', 18000, 15, 'Hand-poured soy candle with pure lavender essential oils. Burns for 40+ hours.', '/src/assets/products/lavender-dreams.jpg', true, false),
('Sandalwood Serenity', 'Scented Candles', 20000, 16, 'A calming sandalwood candle perfect for meditation and relaxation.', '/src/assets/products/sandalwood-candle.jpg', true, false),
('Ocean Blue', 'Auto Fresheners', 8000, 7, 'Long-lasting car freshener with marine and citrus notes.', '/src/assets/products/ocean-blue-freshener.jpg', true, false),
('Crystal Vanilla', 'Scented Candles', 19000, 15, 'Pure Madagascar vanilla in a elegant crystal vessel.', '/src/assets/products/crystal-vanilla-candle.jpg', true, false),
('Midnight Oud', 'Oud/Exotic Scents', 55000, 45, 'Rare aged oud with deep woody and smoky notes.', '/src/assets/products/royal-oud-intense.jpg', true, true),
('Garden Rose', 'Room Sprays', 15000, 12, 'Fresh rose room spray, perfect for instant ambiance.', '/src/assets/products/rose-imperial.jpg', true, false),
('White Musk', 'Oil Perfumes', 38000, 30, 'Clean, sophisticated musk oil that lasts all day.', '/src/assets/products/citrus-elegance.jpg', true, false),
('Jasmine Noir', 'Women''s Perfumes', 46000, 36, 'Dark, mysterious jasmine with hints of leather and spice.', '/src/assets/products/velvet-bloom.jpg', true, true),
('Cedar Spice', 'Men''s Perfumes', 44000, 34, 'Warm cedarwood blended with cardamom and black pepper.', '/src/assets/products/royal-oud-intense.jpg', true, false),
('Linen Fresh', 'Fabric Sprays', 12000, 10, 'Keep fabrics fresh with this gentle linen spray.', '/src/assets/products/ocean-blue-freshener.jpg', true, false),
('Silk Peony', 'Diffusers', 28000, 22, 'Delicate peony fragrance diffuser for elegant spaces.', '/src/assets/products/amber-night-diffuser.jpg', true, false),
('Black Orchid', 'Women''s Perfumes', 52000, 42, 'Exotic orchid with dark chocolate and truffle notes.', '/src/assets/products/velvet-bloom.jpg', true, true),
('Tobacco Leather', 'Men''s Perfumes', 49000, 39, 'Rich tobacco and fine leather for the modern man.', '/src/assets/products/royal-oud-intense.jpg', true, false),
('Citrus Burst', 'Room Sprays', 14000, 11, 'Energizing blend of orange, grapefruit, and lime.', '/src/assets/products/ocean-blue-freshener.jpg', true, false),
('Honey Amber', 'Scented Candles', 22000, 18, 'Sweet honey combined with warm amber glow.', '/src/assets/products/sandalwood-candle.jpg', true, false);