/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#020617',
          900: '#0b0f19',
          800: '#191f25',
          700: '#272d33',
          600: '#3d4550',
          500: '#38bdf8',
        },
      },
      boxShadow: {
        glow: '0 0 30px rgba(56, 189, 248, 0.35)',
      },
    },
  },
  plugins: [],
};
