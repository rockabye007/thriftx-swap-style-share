import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Eye, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import vintageJacketImage from '@/assets/vintage-denim-jacket.jpg';
import blackDressImage from '@/assets/black-evening-dress.jpg';
import winterSweaterImage from '@/assets/winter-sweater.jpg';
import designerBagImage from '@/assets/designer-handbag.jpg';

// Mock data matching the landing page items
const mockItems = {
  '1': {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket from the 90s in excellent condition. Perfect for casual wear and layering.',
    images: [vintageJacketImage],
    category: 'Outerwear',
    size: 'M',
    condition: 'excellent',
    tags: ['vintage', 'denim', 'classic'],
    points: 45,
    location: 'New York, NY',
    uploader: {
      id: 'user1',
      name: 'Sarah Johnson',
      rating: 4.8
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
    category: 'Dresses',
    size: 'S',
    condition: 'good',
    tags: ['elegant', 'black', 'evening'],
    points: 60,
    location: 'Los Angeles, CA',
    uploader: {
      id: 'user2',
      name: 'Emma Davis',
      rating: 4.9
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
    category: 'Knitwear',
    size: 'L',
    condition: 'excellent',
    tags: ['wool', 'winter', 'cozy'],
    points: 35,
    location: 'Chicago, IL',
    uploader: {
      id: 'user3',
      name: 'Michael Chen',
      rating: 4.7
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
    category: 'Accessories',
    size: 'One Size',
    condition: 'excellent',
    tags: ['designer', 'leather', 'authentic'],
    points: 120,
    location: 'Miami, FL',
    uploader: {
      id: 'user4',
      name: 'Lisa Thompson',
      rating: 5.0
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

export default function ItemDetailPage() {
  const { id } = useParams();
  const item = mockItems[id as keyof typeof mockItems];

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Item Not Found</h1>
            <p className="text-muted-foreground mb-6">The item you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>Back to Home</Button>
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
            to="/" 
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
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{item.title}</h1>
              <p className="text-muted-foreground">{item.description}</p>
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
                  <span className="text-sm font-medium text-foreground">Category</span>
                  <p className="text-muted-foreground">{item.category}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">Size</span>
                  <p className="text-muted-foreground">{item.size}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{item.location}</span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{item.view_count} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Listed recently</span>
                </div>
              </div>

              {/* Tags */}
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

              {/* Uploader Info */}
              <div className="border-t pt-4">
                <span className="text-sm font-medium text-foreground">Listed by</span>
                <div className="flex items-center space-x-3 mt-2">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-medium">
                    {item.uploader.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.uploader.name}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-muted-foreground">{item.uploader.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
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