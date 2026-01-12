import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Wallet, Monitor, Package, Lock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const [isGuest, setIsGuest] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const hasPhysicalItems = items.some(item => item.deliveryOption === 'physical');
  const subtotal = getTotalPrice();
  const shipping = hasPhysicalItems ? (subtotal >= 50 ? 0 : 4.99) : 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: 'Order Placed Successfully!',
      description: 'Check your email for order confirmation and gift card codes.',
    });

    clearCart();
    navigate('/order-success');
    setIsProcessing(false);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Checkout | GiftCard Pro</title>
      </Helmet>
      <Layout>
        <div className="container py-8 max-w-5xl">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-3 space-y-6">
                {/* Account Options */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={isGuest ? 'guest' : 'account'}
                      onValueChange={(v) => setIsGuest(v === 'guest')}
                      className="grid grid-cols-2 gap-4"
                    >
                      <Label
                        htmlFor="guest"
                        className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${
                          isGuest ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/50'
                        }`}
                      >
                        <RadioGroupItem value="guest" id="guest" className="sr-only" />
                        <span className="font-medium">Guest Checkout</span>
                        <span className="text-xs text-muted-foreground text-center">No account needed</span>
                      </Label>
                      <Label
                        htmlFor="account"
                        className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all ${
                          !isGuest ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/50'
                        }`}
                      >
                        <RadioGroupItem value="account" id="account" className="sr-only" />
                        <span className="font-medium">Create Account</span>
                        <span className="text-xs text-muted-foreground text-center">Track orders & save cards</span>
                      </Label>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" required />
                      <p className="text-xs text-muted-foreground mt-1">
                        Digital gift cards will be sent to this email
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" />
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address (for physical items) */}
                {hasPhysicalItems && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <Input id="address" required />
                      </div>
                      <div>
                        <Label htmlFor="apartment">Apartment, Suite, etc.</Label>
                        <Input id="apartment" />
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input id="city" required />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input id="state" required />
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP Code *</Label>
                          <Input id="zip" required />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <Label
                        htmlFor="card"
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                          paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/50'
                        }`}
                      >
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5" />
                        <span className="font-medium">Credit / Debit Card</span>
                      </Label>
                      <Label
                        htmlFor="paypal"
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                          paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/50'
                        }`}
                      >
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Wallet className="h-5 w-5" />
                        <span className="font-medium">PayPal</span>
                      </Label>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date *</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC *</Label>
                            <Input id="cvc" placeholder="123" required />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card *</Label>
                          <Input id="cardName" required />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal">
                    I agree to the Terms of Service and Privacy Policy. I understand that digital gift cards
                    are non-refundable once delivered.
                  </Label>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-2">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={`${item.cardId}-${item.denomination}-${item.deliveryOption}`}
                        className="flex gap-3"
                      >
                        <div className="w-16 h-10 rounded overflow-hidden bg-muted shrink-0">
                          <img
                            src={item.cardImage}
                            alt={item.cardName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.cardName}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>${item.denomination}</span>
                            <span>×</span>
                            <span>{item.quantity}</span>
                            <span>•</span>
                            {item.deliveryOption === 'digital' ? (
                              <Monitor className="h-3 w-3" />
                            ) : (
                              <Package className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm font-medium">${item.denomination * item.quantity}</p>
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                      {isProcessing ? (
                        'Processing...'
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Pay ${total.toFixed(2)}
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Your payment is secured with 256-bit SSL encryption
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;
