import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Package, MapPin, CreditCard, Truck } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price_ngn: number;
  price_usd: number;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  currency: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  payment_method: string;
  tracking_number: string;
  tracking_url: string;
  shipping_address: any;
  created_at: string;
}

const OrderDetail = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { formatSinglePrice } = useCurrency();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && id) {
      fetchOrder();
    }
  }, [user, id]);

  const fetchOrder = async () => {
    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', id);

      if (itemsError) throw itemsError;
      setOrderItems(itemsData || []);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
      paid: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
      processing: 'bg-purple-500/20 text-purple-700 dark:text-purple-400',
      shipped: 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
      delivered: 'bg-green-500/20 text-green-700 dark:text-green-400',
      cancelled: 'bg-red-500/20 text-red-700 dark:text-red-400',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-700 dark:text-gray-400';
  };

  if (authLoading || loading || !user || !order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/account/orders" className="text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← Back to Orders
          </Link>
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-foreground">Order #{order.order_number}</h1>
            <Badge className={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {order.shipping_address ? (
                  <div>
                    <p>{order.shipping_address.street}</p>
                    <p>{order.shipping_address.city}, {order.shipping_address.state}</p>
                    <p>{order.shipping_address.country} {order.shipping_address.postal_code}</p>
                  </div>
                ) : (
                  <p>No address provided</p>
                )}
              </CardContent>
            </Card>

            {order.tracking_number && (
              <Card className="border-border/40 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Tracking Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-foreground">{order.tracking_number}</p>
                  {order.tracking_url && (
                    <a 
                      href={order.tracking_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mt-2 inline-block"
                    >
                      Track Package →
                    </a>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="border-border/40 bg-card/50 backdrop-blur mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img 
                    src={item.product_image} 
                    alt={item.product_name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{item.product_name}</h4>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-foreground mt-1">
                      {formatSinglePrice(
                        Number(order.currency === 'NGN' ? item.price_ngn : item.price_usd),
                        order.currency as 'NGN' | 'USD'
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatSinglePrice(Number(order.subtotal), order.currency as 'NGN' | 'USD')}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{formatSinglePrice(Number(order.shipping_cost), order.currency as 'NGN' | 'USD')}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span>{formatSinglePrice(Number(order.total), order.currency as 'NGN' | 'USD')}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetail;
