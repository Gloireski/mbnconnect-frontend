// src/components/ColorPalette.tsx
export function ColorPalette() {
  const colors = {
    primary: [
      { name: 'Bleu Primaire', hex: '#0038BC', class: 'bg-campus-blue', usage: 'Boutons principaux, liens' },
      { name: 'Bleu Clair', hex: '#93B2F8', class: 'bg-campus-blue-light', usage: 'Boutons secondaires' },
      { name: 'Orange', hex: '#EF8F00', class: 'bg-campus-orange', usage: 'Accents, CTAs' },
    ],
    secondary: [
      { name: 'Gris Clair', hex: '#EEEEEE', class: 'bg-campus-gray', usage: 'Backgrounds, sections', border: true },
    ],
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">🎨 Palette CampusHub</h2>
      
      {/* Couleurs Primaires */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Couleurs Primaires</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {colors.primary.map((color) => (
            <div key={color.hex} className="text-center">
              <div className={`w-24 h-24 ${color.class} rounded-full mx-auto mb-3 shadow-lg`}></div>
              <p className="font-semibold text-gray-900 mb-1">{color.name}</p>
              <p className="font-mono text-sm text-gray-700 mb-2">{color.hex}</p>
              <p className="text-xs text-gray-500 italic">{color.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Couleur Secondaire */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Couleur Secondaire</h3>
        <div className="grid grid-cols-1 gap-6 max-w-xs">
          {colors.secondary.map((color) => (
            <div key={color.hex} className="text-center">
              <div 
                className={`w-24 h-24 ${color.class} rounded-full mx-auto mb-3 shadow-lg ${color.border ? 'border-2 border-gray-300' : ''}`}
              ></div>
              <p className="font-semibold text-gray-900 mb-1">{color.name}</p>
              <p className="font-mono text-sm text-gray-700 mb-2">{color.hex}</p>
              <p className="text-xs text-gray-500 italic">{color.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Variantes Bleu */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Variantes Bleu</h3>
        <div className="grid grid-cols-5 gap-3">
          <div className="text-center">
            <div className="w-16 h-16 bg-campus-blue-100 rounded-lg mx-auto mb-2"></div>
            <p className="text-xs text-gray-700">100</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-campus-blue-300 rounded-lg mx-auto mb-2"></div>
            <p className="text-xs text-gray-700">300</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-campus-blue rounded-lg mx-auto mb-2"></div>
            <p className="text-xs text-gray-700 font-bold">500</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-campus-blue-700 rounded-lg mx-auto mb-2"></div>
            <p className="text-xs text-gray-700">700</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-campus-blue-900 rounded-lg mx-auto mb-2"></div>
            <p className="text-xs text-gray-700">900</p>
          </div>
        </div>
      </div>

      {/* Exemples d'utilisation */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Exemples d'utilisation</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Bouton Primaire</p>
            <button className="px-6 py-3 bg-campus-blue text-white rounded-lg font-semibold hover:bg-campus-blue-600 transition-colors shadow-md hover:shadow-lg w-full">
              Postuler maintenant
            </button>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Bouton Secondaire</p>
            <button className="px-6 py-3 bg-campus-blue-light text-campus-blue-900 rounded-lg font-semibold hover:bg-campus-blue-300 transition-colors w-full">
              En savoir plus
            </button>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Bouton Accent</p>
            <button className="px-6 py-3 bg-campus-orange text-white rounded-lg font-semibold hover:bg-campus-orange-600 transition-colors shadow-md hover:shadow-lg w-full">
              Inscription rapide
            </button>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Card avec fond gris</p>
            <div className="p-4 bg-campus-gray rounded-lg border border-gray-300">
              <h4 className="font-semibold text-gray-900 mb-2">Titre de la card</h4>
              <p className="text-gray-700 text-sm">Zone de contenu avec fond gris clair pour différencier les sections.</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Badges</p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-campus-blue text-white text-sm rounded-full font-medium">Stage</span>
              <span className="px-3 py-1 bg-campus-blue-light text-campus-blue-900 text-sm rounded-full font-medium">Alternance</span>
              <span className="px-3 py-1 bg-campus-orange text-white text-sm rounded-full font-medium">Urgent</span>
              <span className="px-3 py-1 bg-campus-gray text-gray-700 text-sm rounded-full font-medium border border-gray-300">CDI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}