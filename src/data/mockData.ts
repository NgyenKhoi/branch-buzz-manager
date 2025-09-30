// Mock data for development and testing

export const mockMenuItems = [
  {
    id: '1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with herbs and lemon',
    price: 24.99,
    category: 'Main Course',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: true,
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Crispy romaine lettuce with parmesan and croutons',
    price: 12.99,
    category: 'Salad',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: true,
  },
  {
    id: '3',
    name: 'Beef Burger',
    description: 'Angus beef patty with cheese, lettuce, and tomato',
    price: 16.99,
    category: 'Main Course',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: true,
  },
  {
    id: '4',
    name: 'Pasta Carbonara',
    description: 'Classic Italian pasta with bacon and parmesan',
    price: 18.99,
    category: 'Main Course',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: true,
  },
  {
    id: '5',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, basil, and tomato sauce',
    price: 14.99,
    category: 'Main Course',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: false,
  },
  {
    id: '6',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with vanilla ice cream',
    price: 8.99,
    category: 'Dessert',
    imageUrl: '/placeholder.svg',
    available: true,
    bestSeller: false,
  },
];

export const mockTables = [
  { id: '1', number: 1, capacity: 2, status: 'available', qrCode: 'QR001' },
  { id: '2', number: 2, capacity: 4, status: 'occupied', qrCode: 'QR002' },
  { id: '3', number: 3, capacity: 4, status: 'available', qrCode: 'QR003' },
  { id: '4', number: 4, capacity: 6, status: 'reserved', qrCode: 'QR004' },
  { id: '5', number: 5, capacity: 2, status: 'available', qrCode: 'QR005' },
  { id: '6', number: 6, capacity: 8, status: 'occupied', qrCode: 'QR006' },
];

export const mockOrders = [
  {
    id: '1001',
    tableNumber: 3,
    items: [
      { name: 'Grilled Salmon', quantity: 2, price: 24.99 },
      { name: 'Caesar Salad', quantity: 1, price: 12.99 },
    ],
    total: 62.97,
    status: 'pending',
    createdAt: new Date(Date.now() - 120000).toISOString(),
  },
  {
    id: '1002',
    tableNumber: 6,
    items: [
      { name: 'Beef Burger', quantity: 3, price: 16.99 },
      { name: 'Pasta Carbonara', quantity: 2, price: 18.99 },
    ],
    total: 88.95,
    status: 'preparing',
    createdAt: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: '1003',
    tableNumber: 9,
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 14.99 },
      { name: 'Chocolate Lava Cake', quantity: 2, price: 8.99 },
    ],
    total: 32.97,
    status: 'ready',
    createdAt: new Date(Date.now() - 600000).toISOString(),
  },
  {
    id: '1004',
    tableNumber: 12,
    items: [
      { name: 'Grilled Salmon', quantity: 1, price: 24.99 },
    ],
    total: 24.99,
    status: 'completed',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export const mockStaff = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@restaurant.com',
    role: 'staff',
    branchId: '1',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@restaurant.com',
    role: 'staff',
    branchId: '1',
    status: 'active',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@restaurant.com',
    role: 'branch_manager',
    branchId: '1',
    status: 'active',
  },
];

export const mockBranches = [
  {
    id: '1',
    name: 'Downtown Branch',
    address: '123 Main Street, City Center',
    phone: '+1 234 567 8900',
    status: 'active',
    managerId: '3',
  },
  {
    id: '2',
    name: 'Westside Branch',
    address: '456 West Avenue, Westside',
    phone: '+1 234 567 8901',
    status: 'active',
    managerId: null,
  },
];

export const mockPromotions = [
  {
    id: '1',
    name: 'Happy Hour Special',
    description: '20% off all appetizers between 3-6 PM',
    discountPercent: 20,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'active',
  },
  {
    id: '2',
    name: 'Weekend Brunch Deal',
    description: 'Buy 2 main courses, get 1 dessert free',
    discountPercent: 0,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'active',
  },
];

export const mockMembers = [
  {
    id: '1',
    name: 'Alice Williams',
    email: 'alice.w@email.com',
    phone: '+1 234 567 8910',
    points: 1250,
    membershipTier: 'Gold',
    joinDate: '2024-03-15',
  },
  {
    id: '2',
    name: 'Bob Martinez',
    email: 'bob.m@email.com',
    phone: '+1 234 567 8911',
    points: 580,
    membershipTier: 'Silver',
    joinDate: '2024-06-20',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.d@email.com',
    phone: '+1 234 567 8912',
    points: 2340,
    membershipTier: 'Platinum',
    joinDate: '2023-11-10',
  },
];
