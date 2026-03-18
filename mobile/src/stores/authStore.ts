import { create } from 'zustand';
import api from '../lib/api';
import { storage } from '../lib/storage';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isInitialized: boolean;

  loadToken: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleAuth: (googleId: string, email: string, name: string, avatar?: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isInitialized: false,

  loadToken: async () => {
    try {
      const token = await storage.getToken();
      if (token) {
        set({ token });
        const { data } = await api.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        set({ user: data, isInitialized: true });
      } else {
        set({ isInitialized: true });
      }
    } catch {
      await storage.removeToken();
      set({ user: null, token: null, isInitialized: true });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      await storage.setToken(data.token);
      set({ user: data.user, token: data.token, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      await storage.setToken(data.token);
      set({ user: data.user, token: data.token, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  googleAuth: async (googleId, email, name, avatar) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/google', { googleId, email, name, avatar });
      await storage.setToken(data.token);
      set({ user: data.user, token: data.token, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false });
      throw new Error(error.response?.data?.message || 'Google auth failed');
    }
  },

  logout: async () => {
    await storage.removeToken();
    set({ user: null, token: null });
  },
}));
