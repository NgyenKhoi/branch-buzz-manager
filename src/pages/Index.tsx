import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import StaffLoginForm from '@/components/auth/StaffLoginForm';
import { 
  Users, 
  ChefHat, 
  BarChart3, 
  QrCode, 
  CreditCard, 
  Store,
  UserCog,
  ShieldCheck,
  UtensilsCrossed
} from 'lucide-react';
import heroImage from '@/assets/hero-restaurant.jpg';

const roles = [
  {
    title: 'Customer',
    description: 'Scan QR codes, browse menus, place orders, and manage your bills seamlessly.',
    icon: QrCode,
    color: 'text-primary',
  },
  {
    title: 'Staff',
    description: 'Handle orders, process payments, manage memberships, and serve customers efficiently.',
    icon: ChefHat,
    color: 'text-secondary',
  },
  {
    title: 'Branch Manager',
    description: 'Oversee operations, manage promotions, track orders, and optimize table arrangements.',
    icon: UserCog,
    color: 'text-accent',
  },
  {
    title: 'Restaurant Owner',
    description: 'Control multiple branches, manage staff, analyze reports, and configure system-wide settings.',
    icon: Store,
    color: 'text-primary',
  },
];

const features = [
  { icon: QrCode, title: 'QR Code Ordering', description: 'Contactless menu access and ordering' },
  { icon: CreditCard, title: 'Smart Billing', description: 'Automated payment processing & discounts' },
  { icon: Users, title: 'Membership System', description: 'Reward loyal customers with points' },
  { icon: BarChart3, title: 'Analytics Dashboard', description: 'Real-time insights and reports' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Manage Your Restaurant
                <span className="block text-primary mt-2">Like Never Before</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                Complete restaurant management solution for chains. Handle orders, staff, menus, analytics, and more from a single powerful platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/register">
                  <Button variant="hero" size="lg">
                    Start Free Trial
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="animate-fade-in relative">
              <div className="relative rounded-2xl overflow-hidden shadow-large">
                <img 
                  src={heroImage} 
                  alt="Modern restaurant interior" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Everything You Need</h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed for modern restaurant operations
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="transition-smooth hover:shadow-medium border-border/50">
                <CardHeader>
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg gradient-primary">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Built for Every Role</h2>
            <p className="text-lg text-muted-foreground">
              From customers to owners, everyone gets the tools they need
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {roles.map((role, index) => (
              <Card key={index} className="transition-smooth hover:shadow-medium border-border/50">
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                    <role.icon className={`h-8 w-8 ${role.color}`} />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{role.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Login Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Owner/Customer Login */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">For Owners & Customers</h2>
                <p className="text-muted-foreground mb-8">
                  Start your restaurant management journey or enjoy seamless dining
                </p>
              </div>
              
              <Card className="border-border/50 shadow-medium">
                <CardHeader>
                  <CardTitle className="text-2xl">Get Started</CardTitle>
                  <CardDescription>Choose how you want to begin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Link to="/register" className="block">
                      <Button variant="hero" size="lg" className="w-full">
                        <Store className="mr-2 h-5 w-5" />
                        Register New Restaurant
                      </Button>
                    </Link>
                    <Link to="/login" className="block">
                      <Button variant="outline" size="lg" className="w-full">
                        Sign In as Owner
                      </Button>
                    </Link>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or
                        </span>
                      </div>
                    </div>
                    <Link to="/login" className="block">
                      <Button variant="ghost" size="lg" className="w-full">
                        <QrCode className="mr-2 h-5 w-5" />
                        Customer Login
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Staff/Manager Login */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">For Staff & Managers</h2>
                <p className="text-muted-foreground mb-8">
                  Access your workspace to manage daily operations
                </p>
              </div>
              
              <StaffLoginForm />
              
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Need Access?</p>
                      <p className="text-sm text-muted-foreground">
                        Contact your branch manager to get your login credentials and restaurant ID.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">Ready to Transform Your Restaurant?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of restaurant chains already using RestaurantOS
            </p>
            <Link to="/register">
              <Button variant="hero" size="lg" className="shadow-large">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">RestaurantOS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 RestaurantOS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
