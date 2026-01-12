import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type GiftCard = Tables<'gift_cards'>;
type GiftCardInsert = TablesInsert<'gift_cards'>;
type GiftCardUpdate = TablesUpdate<'gift_cards'>;

export const useGiftCards = (category?: string) => {
  return useQuery({
    queryKey: ['gift_cards', category],
    queryFn: async () => {
      let query = supabase.from('gift_cards').select('*').order('popularity', { ascending: false });
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as GiftCard[];
    },
  });
};

export const useGiftCard = (slug: string) => {
  return useQuery({
    queryKey: ['gift_card', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      return data as GiftCard | null;
    },
    enabled: !!slug,
  });
};

export const useFeaturedGiftCards = () => {
  return useQuery({
    queryKey: ['gift_cards', 'featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('featured', true)
        .order('popularity', { ascending: false })
        .limit(8);
      
      if (error) throw error;
      return data as GiftCard[];
    },
  });
};

export const useHotDeals = () => {
  return useQuery({
    queryKey: ['gift_cards', 'hot_deals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gift_cards')
        .select('*')
        .not('discount', 'is', null)
        .order('discount', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data as GiftCard[];
    },
  });
};

export const useCreateGiftCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (giftCard: GiftCardInsert) => {
      const { data, error } = await supabase
        .from('gift_cards')
        .insert(giftCard)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gift_cards'] });
    },
  });
};

export const useUpdateGiftCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: GiftCardUpdate }) => {
      const { data, error } = await supabase
        .from('gift_cards')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gift_cards'] });
    },
  });
};

export const useDeleteGiftCard = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('gift_cards')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gift_cards'] });
    },
  });
};
