import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { mockOwnerStats, mockMenuItems } from '@/data/mockData';

const OwnerDashboard = () => {
  const stats = mockOwnerStats;
  const bestSellers = mockMenuItems.filter(item => item.bestSeller).slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of all your restaurant operations
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <ArrowUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+{stats.revenueGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <ArrowUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+{stats.ordersGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCustomers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <ArrowUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">+{stats.customerGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.avgOrderValue}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <ArrowDown className="h-3 w-3 text-red-500" />
                <span className="text-red-500">-2.1%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Best Sellers */}
        <Card>
          <CardHeader>
            <CardTitle>Best Selling Menu Items</CardTitle>
            <CardDescription>Top performing items across all branches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bestSellers.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${item.price}</p>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 100 + 50)} orders
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Branch Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Branch Performance</CardTitle>
            <CardDescription>Revenue by branch location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.branchPerformance.map((branch) => (
                <div key={branch.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{branch.name}</span>
                    <span className="text-muted-foreground">
                      ${branch.revenue.toLocaleString()} ({branch.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary"
                      style={{ width: `${branch.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OwnerDashboard;
