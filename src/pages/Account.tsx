import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { User, Package, MapPin, LogOut } from 'lucide-react';

const Account = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground">My Account</h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{user.email}</p>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/50 backdrop-blur hover:border-primary/50 transition-colors cursor-pointer">
              <Link to="/account/orders">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    My Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">View your order history and track deliveries</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Saved Addresses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Manage your shipping addresses</p>
                <Button variant="outline" className="mt-4">
                  Add Address
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogOut className="w-5 h-5" />
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="destructive" 
                  onClick={handleSignOut}
                  className="w-full"
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
