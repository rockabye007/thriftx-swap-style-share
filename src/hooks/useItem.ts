import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ItemDetail {
  id: string;
  title: string;
  description: string;
  images: string[];
  category_id: string | null;
  size: string;
  condition: string;
  tags: string[];
  points: number;
  location: string;
  user_id: string;
  is_available: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  profiles: {
    full_name: string;
  } | null;
}

export const useItem = (id: string) => {
  return useQuery({
    queryKey: ['item', id],
    queryFn: async (): Promise<ItemDetail | null> => {
      const { data, error } = await supabase
        .from('items')
        .select(`
          *,
          profiles(full_name)
        `)
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        throw error;
      }

      return data;
    },
    enabled: !!id,
  });
};