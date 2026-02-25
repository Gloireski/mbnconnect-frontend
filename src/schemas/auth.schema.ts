// src/schemas/auth.schema.ts
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Email invalide'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, 'Le nom est requis')
    .min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Email invalide'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  password_confirmation: z
    .string()
    .min(1, 'La confirmation est requise'),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['password_confirmation'],
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').optional(),
  bio: z.string().max(500, 'La bio ne peut pas dépasser 500 caractères').optional(),
  phone: z.string().optional(),
  linkedin_url: z.string().url('URL LinkedIn invalide').optional().or(z.literal('')),
  github_url: z.string().url('URL GitHub invalide').optional().or(z.literal('')),
  website_url: z.string().url('URL invalide').optional().or(z.literal('')),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;