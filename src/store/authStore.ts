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

let sessionUser: User | null = loadUser();

export const useAuthStore = create<AuthState>((set) => ({
  user: sessionUser,
  isAuthenticated: !!sessionUser,
  isLoading: false,

  initialize: async () => {
    sessionUser = loadUser();
    set({ isLoading: false, user: sessionUser, isAuthenticated: !!sessionUser });
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    // Find user and ensure role is UserRole
    const found = mockUsers.find(u => u.email === email && u.password === password);
    if (found) {
      const { password, ...userRaw } = found;
      const user: User = {
        id: userRaw.id,
        email: userRaw.email,
        name: userRaw.name,
        role: userRaw.role as UserRole,
        avatar: userRaw.avatar,
      };
      sessionUser = user;
      saveUser(user);
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
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      email,
      name,
      role: 'customer' as UserRole,
      avatar: undefined,
      password,
    };
    mockUsers.push(newUser);
    const { password: _pw, ...user } = newUser;
    sessionUser = user;
    saveUser(user);
    set({ user, isAuthenticated: true, isLoading: false });
    toast({
      title: 'Registration successful!',
      description: 'You have been registered and logged in.',
    });
  },

  logout: async () => {
    sessionUser = null;
    saveUser(null);
    set({ user: null, isAuthenticated: false });
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  },

  setUser: (user) => {
    sessionUser = user;
    saveUser(user);
    set({ user, isAuthenticated: !!user });
  },
}));
