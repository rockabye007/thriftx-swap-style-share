import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ItemCard, type Item } from '@/components/ItemCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Star, 
  ShoppingBag, 
  Heart,
  TrendingUp,
  Plus,
  Settings,
  MapPin,
  Calendar,
  Award,
  Eye,
  MessageSquare
} from 'lucide-react';
import featuredItemsImage from '@/assets/featured-items.jpg';

// Mock user data
const mockUser = {
  id: 'user1',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  avatar: '',
  location: 'New York, NY',
  joinedDate: '2024-01-01',
  rating: 4.8,
  totalSwaps: 23,
  points: 150,
  level: 'Gold Swapper',
  nextLevelPoints: 200
};

// Mock items data
const mockUserItems: Item[] = [
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
    uploader: mockUser,
    created_at: '2024-01-15T10:30:00Z',
    is_available: true,
    view_count: 127
  },
  {
    id: '2',
    title: 'Summer Floral Dress',
    description: 'Light and breezy dress perfect for summer',
    images: [featuredItemsImage],
    category: 'Dresses',
    size: 'S',
    condition: 'good',
    tags: ['floral', 'summer', 'casual'],
    points: 35,
    location: 'New York, NY',
    uploader: mockUser,
    created_at: '2024-01-10T14:20:00Z',
    is_available: false,
    view_count: 89
  }
];

const mockSwapHistory = [
  {
    id: 'swap1',
    type: 'completed',
    otherUser: 'Emma Davis',
    itemGiven: 'Black Leather Boots',
    itemReceived: 'Vintage Silk Scarf',
    date: '2024-01-12',
    points: 25
  },
  {
    id: 'swap2',
    type: 'pending',
    otherUser: 'Michael Chen',
    itemGiven: 'Wool Sweater',
    itemReceived: 'Denim Jeans',
    date: '2024-01-14',
    points: 40
  }
];

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const progressToNextLevel = ((mockUser.points / mockUser.nextLevelPoints) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {mockUser.name.charAt(0)}
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-foreground">{mockUser.name}</h1>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{mockUser.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(mockUser.joinedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{mockUser.rating}</span>
                        <span className="text-muted-foreground">({mockUser.totalSwaps} swaps)</span>
                      </div>
                      <Badge variant="secondary" className="bg-gradient-primary text-white">
                        {mockUser.level}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/profile/edit">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                  <Link to="/add-item">
                    <Button variant="hero" className="w-full sm:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      List New Item
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-primary">{mockUser.points}</div>
              <div className="text-sm text-muted-foreground">Points Balance</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-secondary">{mockUserItems.length}</div>
              <div className="text-sm text-muted-foreground">Items Listed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-accent">{mockUser.totalSwaps}</div>
              <div className="text-sm text-muted-foreground">Completed Swaps</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-primary">{mockUser.rating}</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Level Progress</h3>
                <Badge variant="outline">{mockUser.level}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Points: {mockUser.points}</span>
                  <span>Next Level: {mockUser.nextLevelPoints}</span>
                </div>
                <Progress value={progressToNextLevel} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {mockUser.nextLevelPoints - mockUser.points} more points to reach Platinum Swapper
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items">My Items</TabsTrigger>
            <TabsTrigger value="swaps">Swap History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">Listed "Vintage Denim Jacket" (+5 points)</span>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">Completed swap with Emma Davis (+25 points)</span>
                      <span className="text-xs text-muted-foreground">5 days ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-sm">Received 5-star rating from Michael Chen</span>
                      <span className="text-xs text-muted-foreground">1 week ago</span>
                    </div>
                  </div>
                  <Separator />
                  <Link to="/activity">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Activity
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/add-item">
                      <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center space-y-1">
                        <Plus className="h-5 w-5" />
                        <span className="text-xs">List Item</span>
                      </Button>
                    </Link>
                    <Link to="/browse">
                      <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center space-y-1">
                        <Eye className="h-5 w-5" />
                        <span className="text-xs">Browse</span>
                      </Button>
                    </Link>
                    <Link to="/favorites">
                      <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center space-y-1">
                        <Heart className="h-5 w-5" />
                        <span className="text-xs">Favorites</span>
                      </Button>
                    </Link>
                    <Link to="/messages">
                      <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center space-y-1">
                        <MessageSquare className="h-5 w-5" />
                        <span className="text-xs">Messages</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="items" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">My Listed Items ({mockUserItems.length})</h3>
              <Link to="/add-item">
                <Button variant="hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </Link>
            </div>

            {mockUserItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockUserItems.map((item) => (
                  <ItemCard key={item.id} item={item} showUploader={false} />
                ))}
              </div>
            ) : (
              <Card className="p-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">No items listed yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Start by listing your first item to begin swapping with the community.
                  </p>
                  <Link to="/add-item">
                    <Button variant="hero">List Your First Item</Button>
                  </Link>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Swap History</h3>
              
              {mockSwapHistory.map((swap) => (
                <Card key={swap.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant={swap.type === 'completed' ? 'default' : 'secondary'}>
                            {swap.type === 'completed' ? 'Completed' : 'Pending'}
                          </Badge>
                          <span className="font-medium">Swap with {swap.otherUser}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Gave: {swap.itemGiven} • Received: {swap.itemReceived}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(swap.date).toLocaleDateString()} • {swap.points} points
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}