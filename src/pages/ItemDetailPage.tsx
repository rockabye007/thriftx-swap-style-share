import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Eye, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useItem } from '@/hooks/useItem';
import vintageJacketImage from '@/assets/vintage-denim-jacket.jpg';
import blackDressImage from '@/assets/black-evening-dress.jpg';
import winterSweaterImage from '@/assets/winter-sweater.jpg';
import designerBagImage from '@/assets/designer-handbag.jpg';

// Mock data for landing page items (IDs 1-4)
const mockItems = {
  '1': {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket from the 90s in excellent condition. Perfect for casual wear and layering.',
    images: [vintageJacketImage],
    size: 'M',
    condition: 'excellent',
    tags: ['vintage', 'denim', 'classic'],
    points: 45,
    location: 'New York, NY',
    profiles: {
      full_name: 'Sarah Johnson'
    },
    created_at: '2024-01-15T10:30:00Z',
    is_available: true,
    view_count: 127
  },
  '2': {
    id: '2',
    title: 'Elegant Black Dress',
    description: 'Perfect for evening events, this elegant black dress is in great condition with a flattering fit.',
    images: [blackDressImage],
    size: 'S',
    condition: 'good',
    tags: ['elegant', 'black', 'evening'],
    points: 60,
    location: 'Los Angeles, CA',
    profiles: {
      full_name: 'Emma Davis'
    },
    created_at: '2024-01-14T14:20:00Z',
    is_available: true,
    view_count: 89
  },
  '3': {
    id: '3',
    title: 'Cozy Winter Sweater',
    description: 'Warm wool sweater perfect for cold days. Super soft and comfortable to wear.',
    images: [winterSweaterImage],
    size: 'L',
    condition: 'excellent',
    tags: ['wool', 'winter', 'cozy'],
    points: 35,
    location: 'Chicago, IL',
    profiles: {
      full_name: 'Michael Chen'
    },
    created_at: '2024-01-13T09:15:00Z',
    is_available: true,
    view_count: 156
  },
  '4': {
    id: '4',
    title: 'Designer Handbag',
    description: 'Authentic leather handbag in mint condition. A timeless piece that goes with any outfit.',
    images: [designerBagImage],
    size: 'One Size',
    condition: 'excellent',
    tags: ['designer', 'leather', 'authentic'],
    points: 120,
    location: 'Miami, FL',
    profiles: {
      full_name: 'Lisa Thompson'
    },
    created_at: '2024-01-12T16:45:00Z',
    is_available: true,
    view_count: 203
  }
};

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

export default function ItemDetailPage() {
  const { id } = useParams();
  const { data: dbItem, isLoading, error } = useItem(id!);
  
  // Use database item if available, otherwise fall back to mock data for IDs 1-4
  const item = dbItem || (mockItems[id as keyof typeof mockItems]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading item details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if ((error || !dbItem) && !mockItems[id as keyof typeof mockItems]) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Item Not Found</h1>
            <p className="text-muted-foreground mb-6">The item you're looking for doesn't exist or has been removed.</p>
            <Link to="/browse">
              <Button>Back to Browse</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-6">
          <Link 
            to="/browse" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to browse
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted/30 rounded-lg overflow-hidden">
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-secondary flex items-center justify-center">
                  <span className="text-muted-foreground">No image available</span>
                </div>
              )}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{item.title}</h1>
              <p className="text-muted-foreground">{item.description || 'No description provided'}</p>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className={`text-sm border ${getConditionColor(item.condition)}`}>
                {item.condition}
              </Badge>
              <div className="flex items-center space-x-1 text-sm text-primary font-medium">
                <Star className="h-4 w-4 fill-current" />
                <span>{item.points} points</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-foreground">Size</span>
                  <p className="text-muted-foreground">{item.size || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">Condition</span>
                  <p className="text-muted-foreground capitalize">{item.condition}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{item.location || 'Location not specified'}</span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{item.view_count} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{timeAgo(item.created_at)}</span>
                </div>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm font-medium text-foreground">Tags</span>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Uploader Info */}
              {item.profiles && (
                <div className="border-t pt-4">
                  <span className="text-sm font-medium text-foreground">Listed by</span>
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium">
                      {item.profiles.full_name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.profiles.full_name || 'Unknown User'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full" size="lg" disabled={!item.is_available}>
                {item.is_available ? "Request Swap" : "Unavailable"}
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Heart className="h-4 w-4 mr-2" />
                Add to Favorites
              </Button>
              <Button variant="secondary" className="w-full" size="lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Owner
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}