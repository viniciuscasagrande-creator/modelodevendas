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
        diskhub: {
          orange: '#F97316',
          darkOrange: '#EA580C',
        }
      }
    },
  },
  plugins: [],
}
