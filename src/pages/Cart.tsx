import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Monitor, Package } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <Helmet>
          <title>Shopping Cart | GiftCard Pro</title>
        </Helmet>
        <div className="container py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any gift cards yet.
          </p>
          <Button asChild>
            <Link to="/catalog">Browse Gift Cards</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = items.some(item => item.deliveryOption === 'physical') ? (subtotal >= 50 ? 0 : 4.99) : 0;
  const total = subtotal + shipping;

  return (
    <>
      <Helmet>
        <title>Shopping Cart ({items.length}) | GiftCard Pro</title>
      </Helmet>
      <Layout>
        <div className="container py-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={`${item.cardId}-${item.denomination}-${item.deliveryOption}`}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                        <img
                          src={item.cardImage}
                          alt={item.cardName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold truncate">{item.cardName}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <span className="font-medium text-foreground">${item.denomination}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                {item.deliveryOption === 'digital' ? (
                                  <>
                                    <Monitor className="h-3.5 w-3.5" />
                                    Digital
                                  </>
                                ) : (
                                  <>
                                    <Package className="h-3.5 w-3.5" />
                                    Physical
                                  </>
                                )}
                              </span>
                            </div>
                            {item.recipientName && (
                              <p className="text-sm text-muted-foreground mt-1">
                                To: {item.recipientName}
                              </p>
                            )}
                          </div>
                          <p className="font-semibold whitespace-nowrap">
                            ${item.denomination * item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.cardId, item.denomination, item.deliveryOption, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.cardId, item.denomination, item.deliveryOption, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() =>
                              removeItem(item.cardId, item.denomination, item.deliveryOption)
                            }
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-end">
                <Button variant="ghost" onClick={clearCart} className="text-muted-foreground">
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders $50+
                      </p>
                    )}
                  </div>

                  <div className="border-t my-4" />

                  {/* Promo Code */}
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-2 block">Promo Code</label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" className="flex-1" />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>

                  <div className="flex justify-between font-semibold text-lg mb-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <Button asChild className="w-full" size="lg">
                    <Link to="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Secure checkout powered by Stripe
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Cart;
