// src/app/register/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { RegisterSchema } from '@/schemas/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { invitationApi } from '@/services/api/invitation.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { invitationApiMock } from '@/services/api/invitation.api.mock';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [isVerifying, setIsVerifying] = useState(true);
  const [invitationData, setInvitationData] = useState<{ email: string; role: string } | null>(null);
  const { register, isRegistering } = useAuth();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  // Vérifier le token au chargement
  useEffect(() => {
    if (!token) {
      toast.error('Token d\'invitation manquant');
      router.push('/login');
      return;
    }

    invitationApiMock
      .verify(token)
      .then((data) => {
        setInvitationData(data);
        // Pré-remplir l'email (readonly)
        form.setValue('email', data.email);
        setIsVerifying(false);
      })
      .catch((error) => {
        toast.error('Invitation invalide', {
          description: error.response?.data?.message || 'Cette invitation a expiré ou est invalide',
        });
        router.push('/login');
      });
  }, [token, router, form]);

  const onSubmit = async (data: any) => {
    try {
      await register({
        ...data,
        invitation_token: token!,
      });
      
      toast.success('Compte créé avec succès !', {
        description: 'Vous pouvez maintenant vous connecter',
      });
      
      router.push('/login');
    } catch (error: any) {
      toast.error('Erreur', {
        description: error.response?.data?.message || 'Une erreur est survenue',
      });
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-campus-gray-100 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-campus-blue mx-auto"></div>
          <p className="text-gray-600 mt-4">Vérification de l'invitation...</p>
        </div>
      </div>
    );
  }

  const roleLabels: Record<string, string> = {
    student: 'Étudiant',
    alumni: 'Alumni',
    bde_member: 'Membre BDE',
    pedagogical: 'Équipe Pédagogique',
    company: 'Entreprise',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-campus-gray-100 to-white p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-campus-blue">Campus</span>
            <span className="text-campus-orange">Hub</span>
          </h1>
          <p className="text-gray-600 mt-2">Créer votre compte</p>
          {invitationData && (
            <div className="mt-4 p-3 bg-campus-blue-50 rounded-lg">
              <p className="text-sm text-campus-blue-900">
                <span className="font-semibold">Rôle :</span> {roleLabels[invitationData.role]}
              </p>
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      readOnly
                      className="bg-gray-50 cursor-not-allowed"
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500">Email pré-rempli depuis l'invitation</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <p className="text-xs text-gray-500">Minimum 8 caractères</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-campus-blue hover:bg-campus-blue-600"
              disabled={isRegistering}
            >
              {isRegistering ? 'Création du compte...' : 'Créer mon compte'}
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Vous avez déjà un compte ?{' '}
          <a href="/login" className="text-campus-blue hover:underline font-semibold">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}