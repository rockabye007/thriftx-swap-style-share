import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ItemCard, type Item } from '@/components/ItemCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SlidersHorizontal,
  X,
  MapPin,
  Star,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import featuredItemsImage from '@/assets/featured-items.jpg';

// Mock data for items
const mockItems: Item[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic blue denim jacket from the 90s in excellent condition',
    images: [featuredItemsImage],
    category: 'Outerwear',
    type: 'Jacket',
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
    createdAt: '2024-01-15T10:30:00Z',
    isSwapAvailable: true,
    viewCount: 127
  },
  {
    id: '2',
    title: 'Elegant Black Dress',
    description: 'Perfect for evening events, worn only once',
    images: [featuredItemsImage],
    category: 'Dresses',
    type: 'Evening',
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
    createdAt: '2024-01-14T14:20:00Z',
    isSwapAvailable: true,
    viewCount: 89
  },
  {
    id: '3',
    title: 'Cozy Winter Sweater',
    description: 'Warm wool sweater perfect for cold days',
    images: [featuredItemsImage],
    category: 'Knitwear',
    type: 'Sweater',
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
    createdAt: '2024-01-13T09:15:00Z',
    isSwapAvailable: true,
    viewCount: 156
  },
  {
    id: '4',
    title: 'Designer Handbag',
    description: 'Authentic leather handbag in mint condition',
    images: [featuredItemsImage],
    category: 'Accessories',
    type: 'Handbag',
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
    createdAt: '2024-01-12T16:45:00Z',
    isSwapAvailable: true,
    viewCount: 203
  },
  {
    id: '5',
    title: 'Casual Summer Top',
    description: 'Light and airy top perfect for summer days',
    images: [featuredItemsImage],
    category: 'Tops',
    type: 'Blouse',
    size: 'M',
    condition: 'good',
    tags: ['summer', 'casual', 'lightweight'],
    points: 25,
    location: 'San Francisco, CA',
    uploader: {
      id: 'user5',
      name: 'Alex Rivera',
      rating: 4.6
    },
    createdAt: '2024-01-11T08:30:00Z',
    isSwapAvailable: false,
    viewCount: 67
  },
  {
    id: '6',
    title: 'Vintage Leather Boots',
    description: 'Classic brown leather boots with minimal wear',
    images: [featuredItemsImage],
    category: 'Shoes',
    type: 'Boots',
    size: '9',
    condition: 'excellent',
    tags: ['vintage', 'leather', 'boots'],
    points: 55,
    location: 'Portland, OR',
    uploader: {
      id: 'user6',
      name: 'Jordan Kim',
      rating: 4.9
    },
    createdAt: '2024-01-10T15:20:00Z',
    isSwapAvailable: true,
    viewCount: 94
  }
];

const categories = ['All', 'Outerwear', 'Dresses', 'Knitwear', 'Accessories', 'Tops', 'Shoes', 'Bottoms'];
const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
const conditions = ['All', 'excellent', 'good', 'fair'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'points-high', label: 'Points: High to Low' },
  { value: 'points-low', label: 'Points: Low to High' },
  { value: 'most-viewed', label: 'Most Viewed' }
];

export function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [minPoints, setMinPoints] = useState('');
  const [maxPoints, setMaxPoints] = useState('');

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let filtered = mockItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSize = selectedSize === 'All' || item.size === selectedSize;
      const matchesCondition = selectedCondition === 'All' || item.condition === selectedCondition;
      
      const matchesMinPoints = !minPoints || item.points >= parseInt(minPoints);
      const matchesMaxPoints = !maxPoints || item.points <= parseInt(maxPoints);

      return matchesSearch && matchesCategory && matchesSize && matchesCondition && matchesMinPoints && matchesMaxPoints;
    });

    // Sort items
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'points-high':
        filtered.sort((a, b) => b.points - a.points);
        break;
      case 'points-low':
        filtered.sort((a, b) => a.points - b.points);
        break;
      case 'most-viewed':
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedSize, selectedCondition, sortBy, minPoints, maxPoints]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedCondition('All');
    setMinPoints('');
    setMaxPoints('');
    setSortBy('newest');
  };

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedSize !== 'All',
    selectedCondition !== 'All',
    minPoints !== '',
    maxPoints !== '',
    searchQuery !== ''
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Browse Items</h1>
              <p className="text-muted-foreground">
                Discover amazing fashion finds from our community of {mockItems.length} items
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search items, categories, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={cn(
            "lg:w-64 space-y-6",
            showFilters ? "block" : "hidden lg:block"
          )}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Category</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map(category => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className="justify-start text-xs"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Size Filter */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Size</Label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map(size => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Condition Filter */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Condition</Label>
                    <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map(condition => (
                          <SelectItem key={condition} value={condition}>
                            {condition === 'All' ? 'All Conditions' : 
                             condition.charAt(0).toUpperCase() + condition.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Points Range */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Points Range</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Min"
                        value={minPoints}
                        onChange={(e) => setMinPoints(e.target.value)}
                        type="number"
                      />
                      <Input
                        placeholder="Max"
                        value={maxPoints}
                        onChange={(e) => setMaxPoints(e.target.value)}
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
                </span>
                {activeFiltersCount > 0 && (
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} active</Badge>
                  </div>
                )}
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Items Grid/List */}
            {filteredItems.length > 0 ? (
              <div className={cn(
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "space-y-4"
              )}>
                {filteredItems.map((item, index) => (
                  <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <ItemCard 
                      item={item} 
                      className={viewMode === 'list' ? 'flex flex-row' : ''} 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-12">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">No items found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Try adjusting your search criteria or filters to find what you're looking for.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}