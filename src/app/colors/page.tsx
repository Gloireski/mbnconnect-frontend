// src/app/colors/page.tsx
import { ColorPalette } from '@/components/ColorPalette';

export default function ColorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-campus-gray-100 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <ColorPalette />
      </div>
    </div>
  );
}