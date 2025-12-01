import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Package, ChevronRight } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

interface Order {
  id: string;
  order_number: string;
  status: string;
  currency: string;
  total: number;
  created_at: string;
}

const AccountOrders = () => {
  const { user, loading: authLoading } = useAuth();
  const { formatSinglePrice } = useCurrency();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
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

  if (authLoading || loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/account" className="text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← Back to Account
          </Link>
          <h1 className="text-4xl font-bold mb-8 text-foreground">My Orders</h1>
          
          {orders.length === 0 ? (
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardContent className="py-12 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground mb-4">No orders yet</p>
                <Link to="/shop" className="text-primary hover:underline">
                  Start shopping
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link to={`/account/orders/${order.id}`} key={order.id}>
                  <Card className="border-border/40 bg-card/50 backdrop-blur hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-lg">Order #{order.order_number}</span>
                        <ChevronRight className="w-5 h-5" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="font-semibold text-foreground">
                            {formatSinglePrice(Number(order.total), order.currency as 'NGN' | 'USD')}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountOrders;
