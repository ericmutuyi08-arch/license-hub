import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, ShoppingBag, Wallet, Heart, Settings, LogOut } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <>
        <Helmet>
          <title>Sign In | GiftCard Pro</title>
        </Helmet>
        <Layout>
          <div className="container py-16 max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to access your account</p>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <Link to="/forgot-password" className="text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                      Sign In
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="signup">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input id="signupEmail" type="email" placeholder="you@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="signupPassword">Password</Label>
                      <Input id="signupPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="w-full" onClick={() => setIsLoggedIn(true)}>
                      Create Account
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Account | GiftCard Pro</title>
      </Helmet>
      <Layout>
        <div className="container py-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">My Account</h1>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <nav className="space-y-1">
                <Link
                  to="/account"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium"
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <Link
                  to="/account/orders"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  to="/account/wallet"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                >
                  <Wallet className="h-5 w-5" />
                  Digital Wallet
                </Link>
                <Link
                  to="/account/wishlist"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  Wishlist
                </Link>
                <Link
                  to="/account/settings"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="profileFirstName">First Name</Label>
                      <Input id="profileFirstName" defaultValue="John" />
                    </div>
                    <div>
                      <Label htmlFor="profileLastName">Last Name</Label>
                      <Input id="profileLastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="profileEmail">Email</Label>
                    <Input id="profileEmail" type="email" defaultValue="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="profilePhone">Phone</Label>
                    <Input id="profilePhone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No orders yet</p>
                    <Button variant="link" asChild>
                      <Link to="/catalog">Start Shopping</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Account;
