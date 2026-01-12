import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gift, Zap, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

const heroImages = [
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=1080&fit=crop', // Gaming
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=1080&fit=crop', // Shopping
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop', // Entertainment
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop', // Music
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop', // Dining
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[600px] md:min-h-[700px]">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-primary w-6' 
                : 'bg-primary/40 hover:bg-primary/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="container py-16 md:py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm font-medium border border-primary/30">
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
              <Button size="lg" variant="outline" asChild className="backdrop-blur-sm">
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
              <div className="absolute top-8 -left-4 w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 transform -rotate-6 shadow-card backdrop-blur-sm" />
              
              {/* Middle Card */}
              <div className="absolute top-4 -left-2 w-full aspect-[16/10] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 transform -rotate-3 shadow-card backdrop-blur-sm" />
              
              {/* Front Card */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-hover">
                <img
                  src={heroImages[currentImageIndex]}
                  alt="Gift Card Preview"
                  className="w-full h-full object-cover transition-opacity duration-1000"
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
    </section>
  );
};

export default HeroSection;
