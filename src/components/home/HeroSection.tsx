import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
    <section className="relative overflow-hidden h-[300px]">
      {/* Background Slideshow - Full visibility */}
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
        {/* Minimal overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Centered Content */}
      <div className="container h-full flex items-center justify-center relative z-10">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
            The Perfect Gift,{' '}
            <span className="text-accent">Every Time</span>
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-xl mx-auto drop-shadow">
            Discover premium gift cards from the world's most popular brands.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" asChild className="group">
              <Link to="/catalog">
                Browse Gift Cards
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/catalog?featured=true">View Popular</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
