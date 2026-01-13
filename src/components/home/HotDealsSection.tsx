import { Link } from 'react-router-dom';
import { useHotDeals } from '@/hooks/useGiftCards';
import { transformGiftCard } from '@/types/giftCard';
import GiftCardItem from '@/components/gift-cards/GiftCardItem';
import { Button } from '@/components/ui/button';
import { Flame, ArrowRight, Loader2 } from 'lucide-react';
import { useMemo } from 'react';

const HotDealsSection = () => {
  const { data: hotDealsData, isLoading } = useHotDeals();
  
  const hotDeals = useMemo(() => 
    (hotDealsData || []).map(transformGiftCard), 
    [hotDealsData]
  );

  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-b from-destructive/5 to-background">
        <div className="container flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

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
