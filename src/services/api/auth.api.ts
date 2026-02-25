// src/services/api/auth.api.ts
import axios from '@/lib/axios';
import { AuthResponse, LoginRequest, RegisterRequest, RegisterWithInvitationRequest, User } from '@/types/api';

// ✅ Récupérer le CSRF token avant les mutations
const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie', {
    baseURL: process.env.NEXT_PUBLIC_API_URL?.replace('/api', ''), // Sans /api
  });
};

export const authApi = {
  // Register
  register: async (data: RegisterWithInvitationRequest): Promise<AuthResponse> => {
    await getCsrfToken();
    const response = await axios.post<AuthResponse>('/register', data);
    return response.data;
  },
  // register: async (data: RegisterRequest): Promise<AuthResponse> => {
  //   await getCsrfToken(); // ✅ Obtenir CSRF token d'abord
  //   const response = await axios.post<AuthResponse>('/register', data);
  //   return response.data;
  // },

  // Login
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    await getCsrfToken(); // ✅ Obtenir CSRF token d'abord
    const response = await axios.post<AuthResponse>('/login', data);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await axios.post('/logout');
  },

  // Get current user
  me: async (): Promise<User> => {
    const response = await axios.get<User>('/me');
    return response.data;
  },
};