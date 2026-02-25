// src/app/(protected)/dashboard/page.tsx
export default function DashboardPage() {
  // Pas besoin de useRequireAuth ici, c'est géré par le layout
  return (
    <div className="min-h-screen p-8 bg-campus-gray-100">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
    </div>
  );
}