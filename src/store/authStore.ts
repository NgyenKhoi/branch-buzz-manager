import { create } from 'zustand';
import { toast } from '@/hooks/use-toast';
import { mockUsers } from '@/data/mockData';

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

// Simple in-memory session for mock auth
let sessionUser: User | null = null;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  initialize: async () => {
    set({ isLoading: false, user: sessionUser, isAuthenticated: !!sessionUser });
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        set({
          user: {
            id: data.user.id,
            email: data.user.email || '',
            name: data.user.user_metadata?.name || 'User',
            role: data.user.user_metadata?.role || 'customer',
            avatar: data.user.user_metadata?.avatar,
          },
          isAuthenticated: true,
          isLoading: false,
        });
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
      }
    } catch (error: any) {
      set({ isLoading: false });
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
      });
      throw new Error('Invalid credentials');
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'customer',
          },
        },
      });

      if (error) throw error;

      toast({
        title: 'Registration successful!',
        description: 'Please check your email to verify your account.',
      });
      
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: 'Email already registered.',
      });
      throw new Error('Email already registered');
    }
    const newUser: User & { password: string } = {
      id: (mockUsers.length + 1).toString(),
      email,
      name,
      role: 'customer',
      password,
    };
    mockUsers.push(newUser);
    sessionUser = newUser;
    set({ user: newUser, isAuthenticated: true, isLoading: false });
    toast({
      title: 'Registration successful!',
      description: 'You have been registered and logged in.',
    });
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
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
    set({ user, isAuthenticated: !!user });
  },
}));
