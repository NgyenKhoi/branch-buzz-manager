import { create } from 'zustand';
import { toast } from '@/hooks/use-toast';

export type UserRole = 'customer' | 'staff' | 'branch_manager' | 'owner' | 'admin';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

// Mock storage helpers
const STORAGE_KEY = 'mock_auth_user';

const saveUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

const loadUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  initialize: async () => {
    try {
      const user = loadUser();
      set({ user, isAuthenticated: !!user, isLoading: false });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Mock login - accept any email/password
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role: 'owner',
      };

      saveUser(user);
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
    } catch (error: any) {
      set({ isLoading: false });
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error.message || 'Please check your credentials and try again.',
      });
      throw error;
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true });
    try {
      // Mock registration
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: 'owner',
      };

      saveUser(user);
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      toast({
        title: 'Registration successful!',
        description: 'You can now access your dashboard.',
      });
    } catch (error: any) {
      set({ isLoading: false });
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: error.message || 'Please try again.',
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      saveUser(null);
      set({ user: null, isAuthenticated: false });
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Logout failed',
        description: error.message,
      });
    }
  },

  setUser: (user) => {
    saveUser(user);
    set({ user, isAuthenticated: !!user });
  },
}));
