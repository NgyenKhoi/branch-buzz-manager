import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { 
  UtensilsCrossed, 
  LogOut, 
  LayoutDashboard,
  Menu as MenuIcon,
  Table,
  UsersRound,
  BarChart3
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface OwnerDashboardLayoutProps {
  children: ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
}

const OwnerDashboardLayout = ({ children, activeView, onViewChange }: OwnerDashboardLayoutProps) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { 
      id: 'overview', 
      icon: LayoutDashboard, 
      label: 'Overview',
      description: 'Dashboard summary and KPIs'
    },
    { 
      id: 'menu', 
      icon: MenuIcon, 
      label: 'Menu Management',
      description: 'Manage menu items'
    },
    { 
      id: 'tables', 
      icon: Table, 
      label: 'Table Management',
      description: 'Manage tables and QR codes'
    },
    { 
      id: 'staff', 
      icon: UsersRound, 
      label: 'Staff Management',
      description: 'Manage staff accounts'
    },
    { 
      id: 'reports', 
      icon: BarChart3, 
      label: 'Reports & Analytics',
      description: 'View performance metrics'
    },
  ];

  return (
    <div className="min-h-screen flex w-full bg-muted/30">
      {/* Sidebar */}
      <aside className="w-72 border-r bg-card shadow-soft flex flex-col fixed h-screen">
        <div className="p-6 border-b">
          <Link to="/dashboard/owner" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold block">RestaurantOS</span>
              <span className="text-xs text-muted-foreground">Owner Portal</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start h-auto py-3 px-4 transition-smooth",
                activeView === item.id 
                  ? "bg-primary/10 text-primary hover:bg-primary/15 border-l-4 border-primary" 
                  : "hover:bg-accent"
              )}
              onClick={() => onViewChange(item.id)}
            >
              <div className="flex items-start gap-3 w-full">
                <item.icon className={cn(
                  "h-5 w-5 mt-0.5 flex-shrink-0",
                  activeView === item.id ? "text-primary" : ""
                )} />
                <div className="flex-1 text-left">
                  <div className={cn(
                    "font-medium text-sm",
                    activeView === item.id ? "text-primary" : ""
                  )}>
                    {item.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t bg-muted/30">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-card">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="gradient-primary text-primary-foreground">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground truncate capitalize">{user?.role || 'Owner'}</p>
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

      {/* Main Content with left margin to account for fixed sidebar */}
      <main className="flex-1 overflow-auto ml-72 p-6 md:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
};

export default OwnerDashboardLayout;
