import { useSearchParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import GiftCardGrid from '@/components/gift-cards/GiftCardGrid';
import { useGiftCards } from '@/hooks/useGiftCards';
import { useCategories } from '@/hooks/useCategories';
import { transformGiftCard } from '@/types/giftCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, SlidersHorizontal, X, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Helmet } from 'react-helmet-async';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [deliveryFilter, setDeliveryFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState('popularity');

  // Sync selectedCategory with URL params when navigating
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || 'all';
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  const { data: giftCardsData, isLoading: isLoadingCards } = useGiftCards();
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories();

  const giftCards = useMemo(() => 
    (giftCardsData || []).map(transformGiftCard), 
    [giftCardsData]
  );

  const filteredCards = useMemo(() => {
    let cards = [...giftCards];

    // Search filter
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      cards = cards.filter(card =>
        card.name.toLowerCase().includes(lowercaseQuery) ||
        card.brand.toLowerCase().includes(lowercaseQuery) ||
        card.category.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      cards = cards.filter(card => card.category === selectedCategory);
    }

    // Delivery filter
    if (deliveryFilter.length > 0) {
      cards = cards.filter(card =>
        deliveryFilter.some(option => card.deliveryOptions.includes(option as 'digital' | 'physical'))
      );
    }

    // Price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      cards = cards.filter(card => {
        const minDenom = Math.min(...card.denominations);
        return minDenom >= min && (max ? minDenom <= max : true);
      });
    }

    // Sort
    switch (sortBy) {
      case 'name':
        cards.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        cards.sort((a, b) => Math.min(...a.denominations) - Math.min(...b.denominations));
        break;
      case 'price-high':
        cards.sort((a, b) => Math.max(...b.denominations) - Math.max(...a.denominations));
        break;
      case 'popularity':
      default:
        cards.sort((a, b) => b.popularity - a.popularity);
    }

    return cards;
  }, [giftCards, searchQuery, selectedCategory, deliveryFilter, priceRange, sortBy]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  };

  const handleDeliveryChange = (option: string, checked: boolean) => {
    if (checked) {
      setDeliveryFilter([...deliveryFilter, option]);
    } else {
      setDeliveryFilter(deliveryFilter.filter(o => o !== option));
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDeliveryFilter([]);
    setPriceRange('all');
    setSortBy('popularity');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || deliveryFilter.length > 0 || priceRange !== 'all';

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Category</Label>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {(categoriesData || []).map(cat => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Delivery Filter */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Delivery Method</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="digital"
              checked={deliveryFilter.includes('digital')}
              onCheckedChange={(checked) => handleDeliveryChange('digital', !!checked)}
            />
            <Label htmlFor="digital" className="text-sm font-normal cursor-pointer">Digital Delivery</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="physical"
              checked={deliveryFilter.includes('physical')}
              onCheckedChange={(checked) => handleDeliveryChange('physical', !!checked)}
            />
            <Label htmlFor="physical" className="text-sm font-normal cursor-pointer">Physical Card</Label>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Price Range</Label>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="All Prices" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="0-25">Under $25</SelectItem>
            <SelectItem value="25-50">$25 - $50</SelectItem>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="100-999">$100+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  if (isLoadingCards || isLoadingCategories) {
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
        <title>Browse Gift Cards | GiftCard Pro</title>
        <meta name="description" content="Browse our complete collection of gift cards. Filter by category, delivery method, and price range. Instant delivery available." />
      </Helmet>
      <Layout>
        <div className="container py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Gift Cards</h1>
            <p className="text-muted-foreground">
              {filteredCards.length} {filteredCards.length === 1 ? 'card' : 'cards'} available
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <h3 className="font-semibold mb-4">Filters</h3>
                <FiltersContent />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search & Sort Bar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search gift cards..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">Most Popular</SelectItem>
                      <SelectItem value="name">Name A-Z</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Mobile Filter Sheet */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FiltersContent />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Grid */}
              <GiftCardGrid cards={filteredCards} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Catalog;
