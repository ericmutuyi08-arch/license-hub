import { GiftCard } from '@/types/giftCard';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Monitor, Package, Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';

interface GiftCardItemProps {
  card: GiftCard;
}

const GiftCardItem = ({ card }: GiftCardItemProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(card.id);

  const minPrice = Math.min(...card.denominations);
  const maxPrice = Math.max(...card.denominations);
  
  // Calculate discounted prices
  const discountedMinPrice = card.discount 
    ? minPrice * (1 - card.discount / 100) 
    : minPrice;
  const discountedMaxPrice = card.discount 
    ? maxPrice * (1 - card.discount / 100) 
    : maxPrice;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(card.id);
    } else {
      addToWishlist(card.id);
    }
  };

  const handleClick = () => {
    navigate(`/card/${card.slug}`);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
        <div className="aspect-[16/10] relative overflow-hidden bg-muted">
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {card.discount && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground border-0 font-bold text-xs px-2 py-1">
              -{card.discount}%
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background ${
              inWishlist ? 'text-destructive' : 'text-muted-foreground'
            }`}
            onClick={handleWishlistClick}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
          </Button>
          {!card.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <div className="mb-1">
            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {card.name}
            </h3>
            <p className="text-xs text-muted-foreground">{card.brand}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {card.discount ? (
                <>
                  <span className="text-xs text-muted-foreground line-through">
                    ${minPrice} - ${maxPrice}
                  </span>
                  <span className="font-semibold text-sm text-green-600">
                    ${discountedMinPrice.toFixed(0)} - ${discountedMaxPrice.toFixed(0)}
                  </span>
                </>
              ) : (
                <span className="font-semibold text-sm text-primary">
                  ${minPrice} - ${maxPrice}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {card.deliveryOptions.includes('digital') && (
                <div className="flex items-center justify-center h-5 w-5 rounded bg-muted" title="Digital Delivery">
                  <Monitor className="h-3 w-3 text-muted-foreground" />
                </div>
              )}
              {card.deliveryOptions.includes('physical') && (
                <div className="flex items-center justify-center h-5 w-5 rounded bg-muted" title="Physical Card">
                  <Package className="h-3 w-3 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GiftCardItem;
