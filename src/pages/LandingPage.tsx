import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ItemCard, type Item } from '@/components/ItemCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  Recycle, 
  Star, 
  ArrowRight, 
  ShoppingBag, 
  Heart,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import featuredItemsImage from '@/assets/featured-items.jpg';

// Mock data for featured items
const mockFeaturedItems: Item[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket from the 90s',
    images: [featuredItemsImage],
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
  {
    id: '2',
    title: 'Elegant Black Dress',
    description: 'Perfect for evening events',
    images: [featuredItemsImage],
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
  {
    id: '3',
    title: 'Cozy Winter Sweater',
    description: 'Warm wool sweater perfect for cold days',
    images: [featuredItemsImage],
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
  {
    id: '4',
    title: 'Designer Handbag',
    description: 'Authentic leather handbag in mint condition',
    images: [featuredItemsImage],
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
];


const features = [
  {
    icon: Recycle,
    title: 'Sustainable Fashion',
    description: 'Give your clothes a second life and reduce textile waste through our circular fashion economy.'
  },
  {
    icon: Zap,
    title: 'Instant Swaps',
    description: 'Quick and easy swapping process. Find what you love and request a swap in just a few clicks.'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Protected transactions with user verification and quality guarantees for peace of mind.'
  },
  {
    icon: Globe,
    title: 'Global Community',
    description: 'Connect with fashion lovers worldwide and discover unique pieces from different cultures.'
  }
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8 animate-fade-in">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-4">
              🌱 Sustainable Fashion Revolution
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Swap, Share & 
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent block">
                Style Sustainably
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Transform your wardrobe without buying new. Connect with fashion lovers worldwide and discover amazing pieces through our points-based swap system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 shadow-glow">
                  Start Swapping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Browse Items
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-primary border-primary/30">
              Why Choose ThriftX
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Fashion That Makes a Difference
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of fashion enthusiasts who are already making sustainable choices while discovering amazing pieces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-elegant hover:shadow-glow transition-all duration-300 group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-accent border-accent/30">
              Featured Items
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Discover Amazing Finds
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Check out some of the incredible items our community members are sharing right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {mockFeaturedItems.map((item, index) => (
              <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/browse">
              <Button variant="hero" size="lg" className="px-8">
                View All Items
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-hero text-white border-none shadow-glow">
            <CardContent className="p-12 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold">
                  Ready to Transform Your Wardrobe?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Join our community of sustainable fashion lovers. Start swapping today and discover your next favorite piece while making a positive impact on the planet.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8">
                    <Heart className="mr-2 h-5 w-5" />
                    Join ThriftX
                  </Button>
                </Link>
                <Link to="/add-item">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    List Your First Item
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}