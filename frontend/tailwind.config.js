/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF', // Royal Blue
          dark: '#1E3A8A',
          light: '#3B82F6',
        },
        secondary: {
          DEFAULT: '#10B981', // Emerald Green
          dark: '#059669',
          light: '#34D399',
        },
        danger: {
          DEFAULT: '#EF4444', // Soft Red
          dark: '#DC2626',
          light: '#F87171',
        },
        background: {
          light: '#F9FAFB', // Cool gray 50
          DEFAULT: '#FFFFFF',
          dark: '#111827',
        },
        indigo: {
          950: '#1e1b4b',
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'premium': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      }
    },
  },
  plugins: [],
}
