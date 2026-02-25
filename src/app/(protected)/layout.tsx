'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      const currentPath = window.location.pathname;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [isAuthenticated, router]);

  // Afficher un loader pendant la vérification
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-campus-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-campus-blue mx-auto"></div>
          <p className="text-gray-600 mt-4">Vérification...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}