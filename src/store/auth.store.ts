// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Actions
  setAuth: (user: User) => void; // plus de token usage session
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user) => {
        // localStorage.setItem('token', token);
        // le token est dans le http cookie pas besoin de sauver
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        // localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'auth-storage', // Clé dans localStorage
      partialize: (state) => ({
        user: state.user,
        // token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);