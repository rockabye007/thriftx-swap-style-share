import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useItems } from '@/hooks/useItems';
import { useFavorites } from '@/hooks/useFavorites';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ItemCard } from '@/components/ItemCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { 
  User, 
  Package, 
  Heart, 
  Star, 
  TrendingUp, 
  Plus, 
  Calendar,
  MapPin,
  Settings,
  Award,
  Gift,
  ShoppingBag,
  BarChart3
} from 'lucide-react';

interface SwapHistory {
  id: string;
  itemTitle: string;
  partnerName: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  type: 'outgoing' | 'incoming';
}

export function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { items, loading: itemsLoading } = useItems();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [swapHistory, setSwapHistory] = useState<SwapHistory[]>([]);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchSwapHistory();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
      setFullName(data.full_name || '');
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSwapHistory = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('swaps')
        .select('*')
        .or(`requester_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // For now, just use basic swap data without complex joins
      const formattedHistory: SwapHistory[] = data?.map(swap => ({
        id: swap.id,
        itemTitle: 'Item',
        partnerName: 'User',
        date: new Date(swap.created_at).toLocaleDateString(),
        status: swap.status as 'completed' | 'pending' | 'cancelled',
        type: swap.requester_id === user.id ? 'outgoing' : 'incoming'
      })) || [];
      
      setSwapHistory(formattedHistory);
    } catch (error) {
      console.error('Error fetching swap history:', error);
    }
  };

  const updateProfile = async () => {
    if (!user || !profile) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      
      setEditProfileOpen(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  // Get user's items
  const userItems = items.filter(item => item.user_id === user?.id);
  const userPoints = profile?.points || 100;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="text-lg font-semibold bg-gradient-primary text-white">
                      {(profile?.full_name || user?.email || 'U').split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground">
                      {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Recently'}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {userPoints} Points
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <Button onClick={updateProfile} className="w-full">
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" onClick={() => navigate('/add-item')}>
                    <Plus className="h-4 w-4 mr-2" />
                    List New Item
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Items Listed</p>
                    <p className="text-3xl font-bold text-primary">{userItems.length}</p>
                  </div>
                  <Package className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Successful Swaps</p>
                    <p className="text-3xl font-bold text-primary">{swapHistory.filter(s => s.status === 'completed').length}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Points Available</p>
                    <p className="text-3xl font-bold text-primary">{userPoints}</p>
                  </div>
                  <Award className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Favorites</p>
                    <p className="text-3xl font-bold text-primary">{favorites.length}</p>
                  </div>
                  <Heart className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" onClick={() => navigate('/add-item')} className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Plus className="h-6 w-6" />
                  <span>List New Item</span>
                </Button>
                <Button variant="outline" onClick={() => navigate('/browse')} className="h-auto p-4 flex flex-col items-center space-y-2">
                  <ShoppingBag className="h-6 w-6" />
                  <span>Browse Items</span>
                </Button>
                <Button variant="outline" onClick={() => navigate('/favorites')} className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Heart className="h-6 w-6" />
                  <span>View Favorites</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="space-y-6">
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
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {swapHistory.length > 0 ? (
                      <div className="space-y-4">
                        {swapHistory.slice(0, 3).map((activity) => (
                          <div key={activity.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                            <div className={`w-2 h-2 rounded-full ${
                              activity.status === 'completed' ? 'bg-green-500' : 
                              activity.status === 'pending' ? 'bg-blue-500' : 'bg-red-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">
                                {activity.type === 'outgoing' ? 'Requested swap for' : 'Received swap request for'} {activity.itemTitle}
                              </p>
                              <p className="text-xs text-muted-foreground">{activity.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No recent activity</p>
                    )}
                  </CardContent>
                </Card>

                {/* Items Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userItems.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          You have {userItems.length} item{userItems.length !== 1 ? 's' : ''} listed
                        </p>
                        <div className="space-y-2">
                          {userItems.slice(0, 3).map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <span className="text-sm font-medium">{item.title}</span>
                              <Badge variant="outline">{item.points} pts</Badge>
                            </div>
                          ))}
                        </div>
                        {userItems.length > 3 && (
                          <Button variant="outline" size="sm" onClick={() => {
                            const itemsTab = document.querySelector('[data-value="items"]');
                            if (itemsTab && 'click' in itemsTab) {
                              (itemsTab as HTMLElement).click();
                            }
                          }}>
                            View all items
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">No items listed yet</p>
                        <Button onClick={() => navigate('/add-item')}>
                          <Plus className="h-4 w-4 mr-2" />
                          List Your First Item
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="items" className="space-y-6" data-value="items">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Listed Items</h3>
                <Button onClick={() => navigate('/add-item')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </div>
              
              {itemsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-muted rounded-lg aspect-square mb-4"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : userItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userItems.map((item, index) => (
                    <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <ItemCard item={item} showUploader={false} />
                    </div>
                  ))}
                </div>
              ) : (
                <Card className="p-12">
                  <div className="text-center space-y-4">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto" />
                    <h3 className="text-xl font-semibold">No items listed</h3>
                    <p className="text-muted-foreground">
                      Start by listing your first item to join the ThriftX community!
                    </p>
                    <Button onClick={() => navigate('/add-item')}>
                      <Plus className="h-4 w-4 mr-2" />
                      List Your First Item
                    </Button>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="swaps" className="space-y-6">
              <h3 className="text-lg font-semibold">Swap History</h3>
              
              {swapHistory.length > 0 ? (
                <div className="space-y-4">
                  {swapHistory.map((swap, index) => (
                    <Card key={swap.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <h4 className="font-medium">{swap.itemTitle}</h4>
                              <p className="text-sm text-muted-foreground">
                                {swap.type === 'outgoing' ? 'Swapped with' : 'Request from'} {swap.partnerName}
                              </p>
                              <p className="text-xs text-muted-foreground">{swap.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant={
                                swap.status === 'completed' ? 'default' : 
                                swap.status === 'pending' ? 'secondary' : 'destructive'
                              }
                            >
                              {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
                            </Badge>
                            <Badge variant="outline">
                              {swap.type === 'outgoing' ? 'Sent' : 'Received'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12">
                  <div className="text-center space-y-4">
                    <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto" />
                    <h3 className="text-xl font-semibold">No swap history</h3>
                    <p className="text-muted-foreground">
                      Your swap activities will appear here once you start trading!
                    </p>
                    <Button onClick={() => navigate('/browse')}>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Browse Items to Swap
                    </Button>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}