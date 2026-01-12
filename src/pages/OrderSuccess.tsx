import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Mail, Download, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const OrderSuccess = () => {
  const orderNumber = `GC${Date.now().toString().slice(-8)}`;

  return (
    <>
      <Helmet>
        <title>Order Confirmed | GiftCard Pro</title>
      </Helmet>
      <Layout>
        <div className="container py-16 max-w-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">Order Number</p>
                <p className="font-mono text-xl font-semibold">{orderNumber}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Digital Cards</p>
                    <p className="text-sm text-muted-foreground">
                      Check your email for gift card codes. They'll arrive within 5 minutes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <Download className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Your Wallet</p>
                    <p className="text-sm text-muted-foreground">
                      Access your gift cards anytime from your account wallet.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/account/wallet">
                View My Wallet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/catalog">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OrderSuccess;
