import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UtensilsCrossed } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
            <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">RestaurantOS</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button variant="hero">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
