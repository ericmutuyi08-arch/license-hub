import { Tables } from '@/integrations/supabase/types';

// Database type
export type GiftCardDB = Tables<'gift_cards'>;

// Transform database gift card to UI gift card format
export interface GiftCard {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  image: string;
  denominations: number[];
  deliveryOptions: ('digital' | 'physical')[];
  popularity: number;
  inStock: boolean;
  featured: boolean;
  discount?: number;
}

export const transformGiftCard = (dbCard: GiftCardDB): GiftCard => ({
  id: dbCard.id,
  slug: dbCard.slug,
  name: dbCard.name,
  brand: dbCard.brand,
  category: dbCard.category,
  description: dbCard.description || '',
  image: dbCard.image || '/placeholder.svg',
  denominations: dbCard.denominations || [],
  deliveryOptions: (dbCard.delivery_options || ['digital']) as ('digital' | 'physical')[],
  popularity: dbCard.popularity,
  inStock: dbCard.in_stock,
  featured: dbCard.featured,
  discount: dbCard.discount || undefined,
});
