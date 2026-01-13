import { useFeaturedGiftCards } from '@/hooks/useGiftCards';
import { transformGiftCard } from '@/types/giftCard';
import GiftCardGrid from '@/components/gift-cards/GiftCardGrid';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useMemo } from 'react';

const FeaturedSection = () => {
  const { data: featuredCardsData, isLoading } = useFeaturedGiftCards();
  
  const featuredCards = useMemo(() => 
    (featuredCardsData || []).map(transformGiftCard), 
    [featuredCardsData]
  );

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  if (featuredCards.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Featured Gift Cards</h2>
            <p className="text-muted-foreground">Our most popular cards, loved by thousands</p>
          </div>
          <Button variant="ghost" asChild className="hidden md:flex group">
            <Link to="/catalog">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <GiftCardGrid cards={featuredCards} />
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" asChild>
            <Link to="/catalog">View All Gift Cards</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
