-- Create gift_cards table
CREATE TABLE public.gift_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image TEXT,
  denominations INTEGER[] NOT NULL DEFAULT '{}',
  delivery_options TEXT[] NOT NULL DEFAULT '{digital}',
  popularity INTEGER NOT NULL DEFAULT 50,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  discount INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster category filtering
CREATE INDEX idx_gift_cards_category ON public.gift_cards(category);
CREATE INDEX idx_gift_cards_featured ON public.gift_cards(featured);
CREATE INDEX idx_gift_cards_popularity ON public.gift_cards(popularity DESC);

-- Enable RLS
ALTER TABLE public.gift_cards ENABLE ROW LEVEL SECURITY;

-- Public read access (gift cards are public catalog items)
CREATE POLICY "Gift cards are publicly readable"
ON public.gift_cards
FOR SELECT
USING (true);

-- Create categories table
CREATE TABLE public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Enable RLS for categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Categories are publicly readable"
ON public.categories
FOR SELECT
USING (true);

-- Insert categories
INSERT INTO public.categories (id, name, icon, sort_order) VALUES
  ('gaming', 'Gaming', '🎮', 1),
  ('shopping', 'Shopping', '🛍️', 2),
  ('entertainment', 'Entertainment', '🎬', 3),
  ('dining', 'Food & Dining', '🍽️', 4),
  ('travel', 'Travel', '✈️', 5),
  ('music', 'Music', '🎵', 6);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_gift_cards_updated_at
BEFORE UPDATE ON public.gift_cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();