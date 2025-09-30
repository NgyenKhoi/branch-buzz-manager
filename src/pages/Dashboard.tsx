import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  ArrowUpRight
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuthStore();

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      title: 'Orders Today',
      value: '142',
      change: '+12.5%',
      icon: ShoppingCart,
      trend: 'up',
    },
    {
      title: 'Active Tables',
      value: '28',
      change: '+4.2%',
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Avg Order Value',
      value: '$32.50',
      change: '+8.3%',
      icon: TrendingUp,
      trend: 'up',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your restaurant today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="transition-smooth hover:shadow-medium">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 text-secondary mr-1" />
                  <span className="text-secondary font-medium">{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from your restaurant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                    <div>
                      <p className="font-medium">Order #{1000 + item}</p>
                      <p className="text-sm text-muted-foreground">Table {item * 3}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(25 + item * 10).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">2 min ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Top Selling Items</CardTitle>
              <CardDescription>Most popular dishes this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Grilled Salmon', 'Caesar Salad', 'Beef Burger', 'Pasta Carbonara'].map((item, index) => (
                  <div key={item} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <p className="font-medium">{item}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{120 - index * 20} sold</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
