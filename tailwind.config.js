/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'script': ['cursive'], // Aquí pones la fuente caligráfica
      },
    },
  },
  plugins: [],
}
