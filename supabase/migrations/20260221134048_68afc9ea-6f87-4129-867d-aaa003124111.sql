-- Performance indexes for orders table
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders USING btree (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders USING btree (payment_status);

-- Index for hot deals query (discount not null, sorted by discount)
CREATE INDEX IF NOT EXISTS idx_gift_cards_discount ON public.gift_cards USING btree (discount DESC NULLS LAST) WHERE discount IS NOT NULL;

-- Index for in_stock filtering
CREATE INDEX IF NOT EXISTS idx_gift_cards_in_stock ON public.gift_cards USING btree (in_stock);

-- Composite index for category + popularity (common catalog query)
CREATE INDEX IF NOT EXISTS idx_gift_cards_category_popularity ON public.gift_cards USING btree (category, popularity DESC);

-- Index for user_roles lookups (used by has_role function)
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles USING btree (user_id);