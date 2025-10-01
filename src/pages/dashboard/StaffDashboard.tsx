import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ClipboardList, 
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { mockOrders } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const StaffDashboard = () => {
  const [orders, setOrders] = useState(mockOrders);

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: 'Order Updated',
      description: `Order #${orderId} status changed to ${newStatus}`,
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending':
        return 'default';
      case 'preparing':
        return 'secondary';
      case 'ready':
        return 'default';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'preparing':
        return <Clock className="h-4 w-4" />;
      case 'ready':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <ClipboardList className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Staff Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage orders and serve customers
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'pending').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Preparing</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'preparing').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ready</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'ready').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter(o => o.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
            <CardDescription>Manage current restaurant orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg">Order #{order.id}</h3>
                          <Badge variant={getStatusBadgeVariant(order.status)} className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Table {order.tableNumber} • {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(order.id, 'preparing')}
                        >
                          Start Preparing
                        </Button>
                      )}
                      {order.status === 'preparing' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(order.id, 'ready')}
                        >
                          Mark as Ready
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(order.id, 'completed')}
                        >
                          Complete Order
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;
