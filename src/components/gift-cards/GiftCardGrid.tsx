import { GiftCard } from '@/data/giftCards';
import GiftCardItem from './GiftCardItem';

interface GiftCardGridProps {
  cards: GiftCard[];
  title?: string;
}

const GiftCardGrid = ({ cards, title }: GiftCardGridProps) => {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No gift cards found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <GiftCardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default GiftCardGrid;
