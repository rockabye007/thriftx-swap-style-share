import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';
import type { Item } from './useItems';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          items(
            id,
            title,
            description,
            category_id,
            size,
            condition,
            points,
            location,
            tags,
            images,
            user_id,
            is_available,
            view_count,
            created_at,
            updated_at,
            profiles(full_name)
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedFavorites = data?.map(fav => ({
        ...fav.items,
        category: 'General', // Default category since we're transitioning from category_id
        condition: (fav.items.condition || 'fair') as 'excellent' | 'good' | 'fair',
        uploader: fav.items.profiles ? {
          id: fav.items.user_id,
          name: fav.items.profiles.full_name || 'Unknown',
          rating: 4.5
        } : undefined
      })) || [];

      setFavorites(formattedFavorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        title: "Error",
        description: "Failed to fetch favorites",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (itemId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add favorites",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, item_id: itemId });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item added to favorites",
      });

      fetchFavorites(); // Refresh favorites
      return true;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: "Error",
        description: "Failed to add to favorites",
        variant: "destructive",
      });
      return false;
    }
  };

  const removeFromFavorites = async (itemId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('item_id', itemId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item removed from favorites",
      });

      fetchFavorites(); // Refresh favorites
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast({
        title: "Error",
        description: "Failed to remove from favorites",
        variant: "destructive",
      });
      return false;
    }
  };

  const isFavorite = (itemId: string) => {
    return favorites.some(fav => fav.id === itemId);
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    refetch: fetchFavorites
  };
}