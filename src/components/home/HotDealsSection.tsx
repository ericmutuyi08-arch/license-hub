import { Link } from 'react-router-dom';
import { giftCards } from '@/data/giftCards';
import GiftCardItem from '@/components/gift-cards/GiftCardItem';
import { Button } from '@/components/ui/button';
import { Flame, ArrowRight } from 'lucide-react';

const HotDealsSection = () => {
  // Get cards with discounts, sorted by highest discount first
  const hotDeals = giftCards
    .filter((card) => card.discount && card.discount > 0)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 4);

  if (hotDeals.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-destructive/5 to-background">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Flame className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">Hot Deals</h2>
              <p className="text-sm text-muted-foreground">Limited time discounts</p>
            </div>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link to="/catalog">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {hotDeals.map((card) => (
            <GiftCardItem key={card.id} card={card} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link to="/catalog">View All Deals</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HotDealsSection;
