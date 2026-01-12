import { Link } from 'react-router-dom';
import { GiftCard } from '@/data/giftCards';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Package } from 'lucide-react';

interface GiftCardItemProps {
  card: GiftCard;
}

const GiftCardItem = ({ card }: GiftCardItemProps) => {
  const minPrice = Math.min(...card.denominations);
  const maxPrice = Math.max(...card.denominations);

  return (
    <Link to={`/card/${card.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
        <div className="aspect-[16/10] relative overflow-hidden bg-muted">
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {card.featured && (
            <Badge className="absolute top-3 left-3 gradient-accent text-accent-foreground border-0">
              Popular
            </Badge>
          )}
          {!card.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {card.name}
              </h3>
              <p className="text-sm text-muted-foreground">{card.brand}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{card.description}</p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-primary">
              ${minPrice} - ${maxPrice}
            </p>
            <div className="flex items-center gap-1">
              {card.deliveryOptions.includes('digital') && (
                <div className="flex items-center justify-center h-6 w-6 rounded bg-muted" title="Digital Delivery">
                  <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
              {card.deliveryOptions.includes('physical') && (
                <div className="flex items-center justify-center h-6 w-6 rounded bg-muted" title="Physical Card">
                  <Package className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GiftCardItem;
