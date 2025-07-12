import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Recycle, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-primary rounded-lg p-2">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                thriftX
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Revolutionizing fashion through sustainable clothing swaps. 
              Giving your wardrobe a second life while building a community of conscious consumers.
            </p>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Recycle className="h-4 w-4 text-primary" />
                <span className="text-xs">Sustainable</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-secondary" />
                <span className="text-xs">Community</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="space-y-3">
              <Link to="/browse" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Browse Items
              </Link>
              <Link to="/how-it-works" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                How it Works
              </Link>
              <Link to="/add-item" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                List an Item
              </Link>
              <Link to="/browse" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Categories
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <nav className="space-y-3">
              <Link to="/help" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Help Center
              </Link>
              <Link to="/safety" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Safety Guidelines
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact Us
              </Link>
              <Link to="/dashboard" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest sustainable fashion tips and exclusive swap opportunities.
            </p>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Your email" 
                  className="flex-1 bg-background"
                />
                <Button variant="premium" size="sm">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© 2024 thriftX. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 text-primary" />
                  <span className="text-xs">Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3 text-accent" />
                  <span className="text-xs">Community</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/mobile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Mobile App
              </Link>
              <Link to="/sustainability" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Our Impact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}