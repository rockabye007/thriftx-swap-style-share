import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  size: string;
  condition: 'excellent' | 'good' | 'fair';
  points: number;
  location: string;
  tags: string[];
  images: string[];
  user_id: string;
  is_available: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
  uploader?: {
    id: string;
    name: string;
    rating: number;
  };
}

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('items')
        .select(`
          *,
          profiles(full_name)
        `)
        .eq('is_available', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching items:', error);
        toast({
          title: "Error",
          description: "Failed to load items. Please try again.",
          variant: "destructive"
        });
        return;
      }

      const formattedItems: Item[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        category: item.category_id, // Will need to map this to category name
        size: item.size || '',
        condition: item.condition as 'excellent' | 'good' | 'fair',
        points: item.points,
        location: item.location || '',
        tags: item.tags || [],
        images: item.images || [],
        user_id: item.user_id,
        is_available: item.is_available,
        view_count: item.view_count,
        created_at: item.created_at,
        updated_at: item.updated_at,
        uploader: {
          id: item.user_id,
          name: (item.profiles as any)?.full_name || 'Anonymous',
          rating: 4.5 // Mock rating for now
        }
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error('Error in fetchItems:', error);
      toast({
        title: "Error",
        description: "Failed to load items. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (itemData: Partial<Item>) => {
    try {
      const { data, error } = await supabase
        .from('items')
        .insert([{
          title: itemData.title,
          description: itemData.description,
          size: itemData.size,
          condition: itemData.condition,
          points: itemData.points,
          location: itemData.location,
          tags: itemData.tags,
          images: itemData.images,
          user_id: itemData.user_id
        }])
        .select();

      if (error) {
        console.error('Error creating item:', error);
        toast({
          title: "Error",
          description: "Failed to create item. Please try again.",
          variant: "destructive"
        });
        return { success: false, error: error.message };
      }

      toast({
        title: "Success",
        description: "Item created successfully!",
      });

      // Refresh items list
      fetchItems();

      return { success: true, data };
    } catch (error: any) {
      console.error('Error in createItem:', error);
      const errorMessage = error.message || 'An unexpected error occurred';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    fetchItems,
    createItem
  };
}

export function useCategories() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (error) {
          console.error('Error fetching categories:', error);
          return;
        }

        setCategories(data || []);
      } catch (error) {
        console.error('Error in fetchCategories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
}