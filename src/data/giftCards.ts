export interface GiftCard {
  id: string;
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
  discount?: number; // Discount percentage (e.g., 15 means 15% off)
}

export const categories = [
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'dining', name: 'Food & Dining', icon: '🍽️' },
  { id: 'travel', name: 'Travel', icon: '✈️' },
  { id: 'music', name: 'Music', icon: '🎵' },
];

export const giftCards: GiftCard[] = [
  {
    id: 'amazon-1',
    name: 'Amazon Gift Card',
    brand: 'Amazon',
    category: 'shopping',
    description: 'Shop millions of items on the world\'s largest marketplace. Perfect for any occasion.',
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=250&fit=crop',
    denominations: [10, 25, 50, 100, 200, 500],
    deliveryOptions: ['digital', 'physical'],
    popularity: 98,
    inStock: true,
    featured: true,
    discount: 10,
  },
  {
    id: 'apple-1',
    name: 'Apple Gift Card',
    brand: 'Apple',
    category: 'entertainment',
    description: 'Use for apps, games, music, movies, iCloud storage, and Apple products.',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=250&fit=crop',
    denominations: [15, 25, 50, 100, 200],
    deliveryOptions: ['digital', 'physical'],
    popularity: 95,
    inStock: true,
    featured: true,
    discount: 5,
  },
  {
    id: 'google-play-1',
    name: 'Google Play Gift Card',
    brand: 'Google',
    category: 'entertainment',
    description: 'Access millions of apps, games, movies, books, and more on Google Play.',
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=250&fit=crop',
    denominations: [10, 25, 50, 100],
    deliveryOptions: ['digital'],
    popularity: 88,
    inStock: true,
    featured: true,
    discount: 15,
  },
  {
    id: 'steam-1',
    name: 'Steam Gift Card',
    brand: 'Steam',
    category: 'gaming',
    description: 'The ultimate gift for PC gamers. Buy games, software, and in-game items.',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop',
    denominations: [10, 20, 50, 100],
    deliveryOptions: ['digital'],
    popularity: 92,
    inStock: true,
    featured: true,
    discount: 20,
  },
  {
    id: 'playstation-1',
    name: 'PlayStation Store Gift Card',
    brand: 'PlayStation',
    category: 'gaming',
    description: 'Buy games, add-ons, and subscriptions for PlayStation console.',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=250&fit=crop',
    denominations: [10, 25, 50, 100],
    deliveryOptions: ['digital', 'physical'],
    popularity: 90,
    inStock: true,
    featured: false,
  },
  {
    id: 'xbox-1',
    name: 'Xbox Gift Card',
    brand: 'Xbox',
    category: 'gaming',
    description: 'Get games, apps, and entertainment on Xbox and Windows.',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=250&fit=crop',
    denominations: [10, 25, 50, 100],
    deliveryOptions: ['digital', 'physical'],
    popularity: 87,
    inStock: true,
    featured: false,
    discount: 8,
  },
  {
    id: 'netflix-1',
    name: 'Netflix Gift Card',
    brand: 'Netflix',
    category: 'entertainment',
    description: 'Stream thousands of movies, TV shows, and original content.',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=250&fit=crop',
    denominations: [15, 30, 50, 100],
    deliveryOptions: ['digital'],
    popularity: 93,
    inStock: true,
    featured: true,
    discount: 12,
  },
  {
    id: 'spotify-1',
    name: 'Spotify Gift Card',
    brand: 'Spotify',
    category: 'music',
    description: 'Premium music streaming. Millions of songs without ads.',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=400&h=250&fit=crop',
    denominations: [10, 30, 60, 99],
    deliveryOptions: ['digital'],
    popularity: 89,
    inStock: true,
    featured: false,
  },
  {
    id: 'uber-1',
    name: 'Uber Gift Card',
    brand: 'Uber',
    category: 'travel',
    description: 'Rides and food delivery with Uber and Uber Eats.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=250&fit=crop',
    denominations: [25, 50, 100, 200],
    deliveryOptions: ['digital', 'physical'],
    popularity: 85,
    inStock: true,
    featured: false,
    discount: 7,
  },
  {
    id: 'starbucks-1',
    name: 'Starbucks Gift Card',
    brand: 'Starbucks',
    category: 'dining',
    description: 'Coffee, snacks, and beverages at Starbucks locations worldwide.',
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400&h=250&fit=crop',
    denominations: [10, 25, 50, 100],
    deliveryOptions: ['digital', 'physical'],
    popularity: 86,
    inStock: true,
    featured: true,
  },
  {
    id: 'doordash-1',
    name: 'DoorDash Gift Card',
    brand: 'DoorDash',
    category: 'dining',
    description: 'Food delivery from your favorite local restaurants.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=250&fit=crop',
    denominations: [25, 50, 100],
    deliveryOptions: ['digital'],
    popularity: 82,
    inStock: true,
    featured: false,
    discount: 18,
  },
  {
    id: 'airbnb-1',
    name: 'Airbnb Gift Card',
    brand: 'Airbnb',
    category: 'travel',
    description: 'Book unique stays and experiences around the world.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=250&fit=crop',
    denominations: [50, 100, 200, 500],
    deliveryOptions: ['digital', 'physical'],
    popularity: 84,
    inStock: true,
    featured: false,
  },
];

export const getCardById = (id: string): GiftCard | undefined => {
  return giftCards.find(card => card.id === id);
};

export const getCardsByCategory = (category: string): GiftCard[] => {
  return giftCards.filter(card => card.category === category);
};

export const getFeaturedCards = (): GiftCard[] => {
  return giftCards.filter(card => card.featured);
};

export const searchCards = (query: string): GiftCard[] => {
  const lowercaseQuery = query.toLowerCase();
  return giftCards.filter(card => 
    card.name.toLowerCase().includes(lowercaseQuery) ||
    card.brand.toLowerCase().includes(lowercaseQuery) ||
    card.category.toLowerCase().includes(lowercaseQuery)
  );
};
