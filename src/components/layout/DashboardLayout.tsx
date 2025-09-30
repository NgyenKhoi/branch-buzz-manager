import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { 
  UtensilsCrossed, 
  LogOut, 
  User,
  LayoutDashboard,
  ChefHat,
  Store,
  Settings,
  BarChart3
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: ChefHat, label: 'Orders', path: '/dashboard/orders' },
    { icon: Store, label: 'Branches', path: '/dashboard/branches' },
    { icon: BarChart3, label: 'Reports', path: '/dashboard/reports' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card shadow-soft flex flex-col">
        <div className="p-6 border-b">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">RestaurantOS</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-accent transition-smooth"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarFallback className="gradient-primary text-primary-foreground">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.role || 'Role'}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
