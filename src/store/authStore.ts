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
    const found = mockUsers.find(u => u.email === email && u.password === password);
    if (found) {
      const { password, ...user } = found;
      sessionUser = user;
      set({ user, isAuthenticated: true, isLoading: false });
      toast({ title: 'Welcome back!', description: 'You have successfully logged in.' });
    } else {
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
    const exists = mockUsers.some(u => u.email === email);
    if (exists) {
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
    sessionUser = null;
    set({ user: null, isAuthenticated: false });
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  },

  setUser: (user) => {
    sessionUser = user;
    set({ user, isAuthenticated: !!user });
  },
}));
