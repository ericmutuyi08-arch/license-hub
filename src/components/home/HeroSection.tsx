import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gift, Zap, ShieldCheck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Zap className="h-4 w-4" />
              Instant Digital Delivery
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              The Perfect Gift,{' '}
              <span className="text-primary">Every Time</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Discover premium gift cards from the world's most popular brands. 
              Digital or physical delivery, with secure payments and instant fulfillment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild className="group">
                <Link to="/catalog">
                  Browse Gift Cards
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/catalog?featured=true">View Popular</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-success" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                <span>50+ Brands</span>
              </div>
            </div>
          </div>

          {/* Visual Cards */}
          <div className="relative lg:h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Background Card */}
              <div className="absolute top-8 -left-4 w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 transform -rotate-6 shadow-card" />
              
              {/* Middle Card */}
              <div className="absolute top-4 -left-2 w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 transform -rotate-3 shadow-card" />
              
              {/* Front Card */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-hover">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=375&fit=crop"
                  alt="Gift Card Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">From $10</p>
                    <p className="font-display text-xl font-semibold">Premium Gift Cards</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-success text-success-foreground text-sm font-medium shadow-lg">
                ✓ Instant Delivery
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default HeroSection;
