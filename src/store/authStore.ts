import { create } from 'zustand';

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
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    // TODO: Implement actual authentication with backend
    // Mock login for demo
    setTimeout(() => {
      set({
        user: {
          id: '1',
          email,
          name: 'Demo User',
          role: 'owner',
        },
        isAuthenticated: true,
        isLoading: false,
      });
    }, 1000);
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
}));
