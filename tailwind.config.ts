import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#130D28',
        background: '#F7F7FB',
        primary: {
          DEFAULT: '#6C5DD3',
          500: '#6C5DD3',
          400: '#A394F2',
          200: '#D6D4F8'
        }
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem'
      },
      boxShadow: {
        card: '0 6px 24px rgba(0,0,0,0.06)',
        focus: '0 0 0 3px rgba(108,93,211,0.35)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;





