import Layout from '@/components/layout/Layout';
import { useWishlist } from '@/contexts/WishlistContext';
import { useGiftCards } from '@/hooks/useGiftCards';
import { transformGiftCard } from '@/types/giftCard';
import GiftCardItem from '@/components/gift-cards/GiftCardItem';
import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useMemo } from 'react';

const Wishlist = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { data: giftCardsData, isLoading } = useGiftCards();

  const wishlistCards = useMemo(() => {
    const allCards = (giftCardsData || []).map(transformGiftCard);
    return allCards.filter((card) => wishlist.includes(card.id));
  }, [giftCardsData, wishlist]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8 flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Wishlist | GiftCard Pro</title>
        <meta name="description" content="View your saved gift cards and favorite items." />
      </Helmet>
      <Layout>
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">My Wishlist</h1>
              <p className="text-muted-foreground mt-1">
                {wishlistCards.length} {wishlistCards.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            {wishlistCards.length > 0 && (
              <Button variant="outline" onClick={clearWishlist}>
                Clear All
              </Button>
            )}
          </div>

          {wishlistCards.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                  <Heart className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>
              <h2 className="font-display text-2xl font-semibold mb-4">Your Wishlist is Empty</h2>
              <p className="text-muted-foreground mb-6">
                Save your favorite gift cards to find them easily later.
              </p>
              <Button asChild>
                <Link to="/catalog">Browse Gift Cards</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlistCards.map((card) => (
                <GiftCardItem key={card.id} card={card} />
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Wishlist;
