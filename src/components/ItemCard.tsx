import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface Item {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  size: string;
  condition: 'excellent' | 'good' | 'fair';
  tags: string[];
  points: number;
  location: string;
  uploader?: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  created_at: string;
  is_available: boolean;
  view_count: number;
}

interface ItemCardProps {
  item: Item;
  className?: string;
  showUploader?: boolean;
}

export function ItemCard({ item, className, showUploader = true }: ItemCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Card className={cn("group overflow-hidden hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1", className)}>
      <Link to={`/item/${item.id}`}>
        <div className="relative overflow-hidden bg-muted/30">
          {/* Image */}
          <div className="aspect-square relative">
            {!imageError ? (
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-secondary flex items-center justify-center">
                <span className="text-muted-foreground text-sm">No image</span>
              </div>
            )}
            
            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white h-8 w-8 rounded-full shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                setIsFavorited(!isFavorited);
              }}
            >
              <Heart className={cn("h-4 w-4", isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
            </Button>

            {/* Condition Badge */}
            <Badge 
              variant="secondary" 
              className={cn("absolute top-2 left-2 text-xs border", getConditionColor(item.condition))}
            >
              {item.condition}
            </Badge>

            {/* Points */}
            <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Star className="h-3 w-3 mr-1" />
              {item.points}
            </div>
          </div>
        </div>
      </Link>

      <CardContent className="p-4 space-y-3">
        <Link to={`/item/${item.id}`}>
          <div className="space-y-2">
            {/* Title */}
            <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>

            {/* Size & Category */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{item.category}</span>
              <span>•</span>
              <span>Size {item.size}</span>
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs py-0 px-2 h-5">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs py-0 px-2 h-5">
                    +{item.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </Link>

        {/* Uploader Info */}
        {showUploader && item.uploader && (
          <div className="flex items-center justify-between pt-2 border-t">
            <Link to={`/profile/${item.uploader.id}`} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
                {item.uploader.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.uploader.name}</p>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-muted-foreground">{item.uploader.rating}</span>
                </div>
              </div>
            </Link>

            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{item.view_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{timeAgo(item.created_at)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Link to={`/item/${item.id}`} className="flex-1">
            <Button 
              variant={item.is_available ? "default" : "outline"} 
              className="w-full text-sm"
              disabled={!item.is_available}
            >
              {item.is_available ? "Request Swap" : "Unavailable"}
            </Button>
          </Link>
          <Link to={`/item/${item.id}`}>
            <Button variant="accent" className="px-4 text-sm">
              Redeem
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}