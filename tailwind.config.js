/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Utiliser la classe `dark` pour activer le mode sombre
  theme: {
    extend: {
      // Ajouter des personnalisations ici
    },
  },
  plugins: [],
}
