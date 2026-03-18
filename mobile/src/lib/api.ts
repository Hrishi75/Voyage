import axios from 'axios';
import Constants from 'expo-constants';
import { storage } from './storage';

const getBaseUrl = () => {
  // Use environment variable if set, otherwise derive from Expo dev server
  const envUrl = Constants.expoConfig?.extra?.apiUrl;
  if (envUrl) return envUrl;

  // Default for development - update this to your machine's LAN IP
  return 'http://192.168.1.100:5000/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor to inject JWT token
api.interceptors.request.use(async (config) => {
  const token = await storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await storage.removeToken();
      // Dynamic import to avoid circular dependency
      const { useAuthStore } = require('../stores/authStore');
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
