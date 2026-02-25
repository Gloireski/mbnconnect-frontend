// User Types
export type UserRole = 'student' | 'alumni' | 'bde_member' | 'pedagogical' | 'company' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar_url?: string | null;
  bio?: string | null;
  phone?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  website_url?: string | null;
  created_at: string;
  updated_at: string;
}

// auth types

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface AuthResponse {
    user: User;
    // token: string;
}

// API Response Wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Pagination
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}