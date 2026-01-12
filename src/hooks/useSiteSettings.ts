import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SiteSettings {
  id: string;
  hero_title: string | null;
  hero_subtitle: string | null;
  announcement_text: string | null;
  announcement_active: boolean | null;
  updated_at: string;
}

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ['site_settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'main')
        .maybeSingle();
      
      if (error) throw error;
      return data as SiteSettings | null;
    },
  });
};

export const useUpdateSiteSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (settings: Partial<SiteSettings>) => {
      const { data, error } = await supabase
        .from('site_settings')
        .update(settings)
        .eq('id', 'main')
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site_settings'] });
    },
  });
};
