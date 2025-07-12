import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ItemCard } from "@/components/ItemCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

interface FavoriteItem {
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

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const { data: user } = await supabase.auth.getUser();
      
      if (!user.user) {
        setFavorites([]);
        return;
      }

      const { data, error } = await supabase
        .from('favorites')
        .select(`
          items (
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
            profiles (
              full_name
            )
          )
        `)
        .eq('user_id', user.user.id);

      if (error) {
        console.error('Error fetching favorites:', error);
        toast({
          title: "Error",
          description: "Failed to fetch your favorites",
          variant: "destructive",
        });
        return;
      }

      const formattedFavorites = data?.map((fav: any) => ({
        id: fav.items.id,
        title: fav.items.title,
        description: fav.items.description,
        category: fav.items.category_id,
        size: fav.items.size,
        condition: (fav.items.condition === 'Like New' ? 'excellent' : 
                   fav.items.condition === 'Good' ? 'good' : 'fair') as 'excellent' | 'good' | 'fair',
        points: fav.items.points,
        location: fav.items.location,
        tags: fav.items.tags || [],
        images: fav.items.images || [],
        user_id: fav.items.user_id,
        is_available: fav.items.is_available,
        view_count: fav.items.view_count,
        created_at: fav.items.created_at,
        updated_at: fav.items.updated_at,
        uploader: {
          id: fav.items.user_id,
          name: fav.items.profiles?.full_name || 'Unknown User',
          rating: 4.5
        }
      })) || [];

      setFavorites(formattedFavorites);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your favorites",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">My Favorites</h1>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your favorites...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground">Start browsing items and save your favorites!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};