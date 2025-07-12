import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Shirt, Users, Sparkles } from 'lucide-react';

export function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How ThriftX Works</h1>
          <p className="text-xl text-muted-foreground">
            Sustainable fashion trading made simple
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Items</h3>
              <p className="text-muted-foreground">
                Upload photos and descriptions of clothing items you want to trade
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Matches</h3>
              <p className="text-muted-foreground">
                Browse items from other users and request swaps for items you like
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Swaps</h3>
              <p className="text-muted-foreground">
                Agree on trades and exchange items with other sustainable fashion lovers
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8">Ready to Start Trading?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/browse"
              className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              Browse Items
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}