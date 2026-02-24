// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ✅ Couleurs CampusHub
        campus: {
          blue: {
            DEFAULT: '#0038BC',    // Bleu foncé primaire
            light: '#93B2F8',      // Bleu clair
            50: '#F0F5FF',
            100: '#E0EBFF',
            200: '#C7DBFF',
            300: '#93B2F8',
            400: '#6B95F5',
            500: '#0038BC',
            600: '#002A8F',
            700: '#001F6B',
            800: '#001548',
            900: '#000B24',
          },
          orange: {
            DEFAULT: '#EF8F00',    // Orange accent
            50: '#FFF7E6',
            100: '#FFEFD0',
            200: '#FFDFA1',
            300: '#FFCF72',
            400: '#FFBF43',
            500: '#EF8F00',
            600: '#C07300',
            700: '#915700',
            800: '#623B00',
            900: '#331F00',
          },
          gray: {
            DEFAULT: '#EEEEEE',    // Gris secondaire
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#EEEEEE',
            300: '#E0E0E0',
            400: '#BDBDBD',
            500: '#9E9E9E',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
          },
        },

        // ✅ Mapping shadcn/ui avec couleurs CampusHub
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: '#0038BC',              // Bleu primaire
        background: '#FFFFFF',
        foreground: '#212121',
        
        primary: {
          DEFAULT: '#0038BC',         // Bleu primaire
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#93B2F8',         // Bleu clair
          foreground: '#001548',
        },
        accent: {
          DEFAULT: '#EF8F00',         // Orange
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#EEEEEE',         // Gris clair
          foreground: '#616161',
        },
        destructive: {
          DEFAULT: '#DC2626',
          foreground: '#FFFFFF',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#212121',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#212121',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;