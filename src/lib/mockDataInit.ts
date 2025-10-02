// Initialize localStorage with mock data on app load
import { 
  mockBranches, 
  mockMenuItems, 
  mockTables, 
  mockOrders, 
  mockStaff,
  mockBrands,
  mockUsers
} from '@/data/mockData';

export const initializeMockData = () => {
  // Only initialize if not already present
  if (!localStorage.getItem('mock_branches')) {
    localStorage.setItem('mock_branches', JSON.stringify(mockBranches));
  }
  if (!localStorage.getItem('mock_menu_items')) {
    localStorage.setItem('mock_menu_items', JSON.stringify(mockMenuItems));
  }
  if (!localStorage.getItem('mock_tables')) {
    localStorage.setItem('mock_tables', JSON.stringify(mockTables));
  }
  if (!localStorage.getItem('mock_orders')) {
    localStorage.setItem('mock_orders', JSON.stringify(mockOrders));
  }
  if (!localStorage.getItem('mock_staff')) {
    localStorage.setItem('mock_staff', JSON.stringify(mockStaff));
  }
  if (!localStorage.getItem('mock_brands')) {
    localStorage.setItem('mock_brands', JSON.stringify(mockBrands));
  }
  if (!localStorage.getItem('mock_users')) {
    localStorage.setItem('mock_users', JSON.stringify(mockUsers));
  }
};

// Get data for a specific branch
export const getBranchData = (branchId: string) => {
  const menuItems = JSON.parse(localStorage.getItem('mock_menu_items') || '[]')
    .filter((item: any) => item.branchId === branchId);
  
  const tables = JSON.parse(localStorage.getItem('mock_tables') || '[]')
    .filter((table: any) => table.branchId === branchId);
  
  const orders = JSON.parse(localStorage.getItem('mock_orders') || '[]')
    .filter((order: any) => order.branchId === branchId);
  
  const staff = JSON.parse(localStorage.getItem('mock_staff') || '[]')
    .filter((s: any) => s.branchId === branchId);

  return { menuItems, tables, orders, staff };
};
