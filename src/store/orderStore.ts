import { create } from 'zustand';

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  branchId: string;
  branchName: string;
  guestName: string;
  guestPhone: string;
  tableNumber?: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  notes?: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt' | 'total'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByBranch: (branchId?: string) => Order[];
  getPendingOrders: (branchId?: string) => Order[];
}

const STORAGE_KEY = 'mock_orders';

const saveOrders = (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

const loadOrders = (): Order[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const useOrderStore = create<OrderState>((set) => ({
  orders: loadOrders(),

  addOrder: (orderData) =>
    set((state) => {
      const total = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const newOrder: Order = {
        ...orderData,
        id: Date.now().toString(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        total,
      };
      const updated = [newOrder, ...state.orders];
      saveOrders(updated);
      // Notify staff/manager in localStorage for cross-tab
      localStorage.setItem('order_notification', JSON.stringify(newOrder));
      return { orders: updated };
    }),

  updateOrderStatus: (orderId, status) =>
    set((state) => {
      const updated = state.orders.map((o) =>
        o.id === orderId ? { ...o, status } : o
      );
      saveOrders(updated);
      return { orders: updated };
    }),

  getOrdersByBranch: (branchId) => {
    const allOrders = loadOrders();
    if (!branchId) return allOrders;
    return allOrders.filter((order) => order.branchId === branchId);
  },

  getPendingOrders: (branchId) => {
    const { orders } = useOrderStore.getState();
    const filtered = branchId 
      ? orders.filter((o) => o.branchId === branchId && o.status === 'pending')
      : orders.filter((o) => o.status === 'pending');
    return filtered;
  },
}));
