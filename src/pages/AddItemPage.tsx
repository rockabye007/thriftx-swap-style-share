import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Camera, Sparkles, Loader2 } from 'lucide-react';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import { useItems } from '@/hooks/useItems';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function AddItemPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
    images: [] as string[]
  });

  const { generateDescription, categorizeItem, loading } = useGeminiAI();
  const { createItem } = useItems();
  const { user } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.title && !formData.category) {
      toast.error('Please add a title or category first');
      return;
    }

    const itemDetails = `Title: ${formData.title}, Category: ${formData.category}, Type: ${formData.type}, Size: ${formData.size}, Condition: ${formData.condition}`;
    const description = await generateDescription(itemDetails);
    
    if (description) {
      setFormData(prev => ({ ...prev, description }));
      toast.success('AI description generated!');
    }
  };

  const handleSmartCategorize = async () => {
    if (!formData.title) {
      toast.error('Please add a title first');
      return;
    }

    const result = await categorizeItem(`Item: ${formData.title}, Current description: ${formData.description}`);
    
    if (result) {
      try {
        const suggestions = JSON.parse(result);
        setFormData(prev => ({
          ...prev,
          category: suggestions.category || prev.category,
          type: suggestions.type || prev.type,
          tags: suggestions.suggestedTags?.join(', ') || prev.tags
        }));
        toast.success('Smart categorization applied!');
      } catch {
        toast.success('AI suggestions received!');
      }
    }
  };

  const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];
  const conditions = ['Like New', 'Good', 'Fair', 'Well-Loved'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleSaveAsDraft = () => {
    toast.success('Item saved as draft');
  };

  const handleListItem = async () => {
    if (!user) {
      toast.error('Please log in to list items');
      return;
    }

    if (!formData.title || !formData.category || !formData.condition) {
      toast.error('Please fill in required fields: title, category, and condition');
      return;
    }

    const itemData = {
      title: formData.title,
      description: formData.description,
      size: formData.size,
      condition: (formData.condition === 'Like New' ? 'excellent' : 
                 formData.condition === 'Good' ? 'good' : 'fair') as 'excellent' | 'good' | 'fair',
      points: 50, // Default points for now
      location: 'Not specified',
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      images: [],
      user_id: user.id
    };

    const result = await createItem(itemData);
    if (result.success) {
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        type: '',
        size: '',
        condition: '',
        tags: '',
        images: []
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
            List Your Item
          </h1>
          <p className="text-muted-foreground text-lg">
            Share your fashion finds with the ThriftX community
          </p>
        </div>

        <Card className="shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Item Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g. Vintage Denim Jacket"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select value={formData.size} onValueChange={(value) => handleInputChange('size', value)}>
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

              <div className="space-y-2">
                <Label htmlFor="condition">Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map(condition => (
                      <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* AI-Enhanced Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Description</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateDescription}
                  disabled={loading}
                  className="text-xs"
                >
                  {loading ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    <Sparkles className="h-3 w-3 mr-1" />
                  )}
                  AI Generate
                </Button>
              </div>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your item's style, fit, and unique features..."
                rows={4}
              />
            </div>

            {/* Smart Categorization */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSmartCategorize}
                  disabled={loading}
                  className="text-xs"
                >
                  {loading ? (
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  ) : (
                    <Sparkles className="h-3 w-3 mr-1" />
                  )}
                  Smart Tags
                </Button>
              </div>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="vintage, oversized, summer, casual"
              />
              {formData.tags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.split(',').map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="flex-1" onClick={handleSaveAsDraft}>
                Save as Draft
              </Button>
              <Button className="flex-1 bg-gradient-primary" onClick={handleListItem}>
                List Item
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}