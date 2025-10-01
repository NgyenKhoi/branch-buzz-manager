import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Store, ArrowRight } from 'lucide-react';
import { mockBrands } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const BrandSelection = () => {
  const navigate = useNavigate();

  const handleBrandSelect = (brandId: string) => {
    const brand = mockBrands.find(b => b.id === brandId);
    
    localStorage.setItem('selected_brand', brandId);
    
    toast({
      title: 'Brand Selected',
      description: `You've selected ${brand?.name}`,
    });

    navigate('/dashboard/owner');
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="container max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Select Your Brand</h1>
          <p className="text-lg text-muted-foreground">
            Choose which restaurant brand you want to manage
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockBrands.map((brand) => (
            <Card
              key={brand.id}
              className="cursor-pointer transition-smooth hover:shadow-medium hover:border-primary border-border/50"
              onClick={() => handleBrandSelect(brand.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg gradient-primary">
                    <Building2 className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    brand.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {brand.status}
                  </span>
                </div>
                <CardTitle className="text-2xl">{brand.name}</CardTitle>
                <CardDescription className="text-base">{brand.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Store className="h-4 w-4 text-muted-foreground" />
                    <span>{brand.totalBranches} Branches</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Est. {brand.established}</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Manage Brand
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={() => navigate('/setup/landing')}>
            + Create New Brand
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrandSelection;
