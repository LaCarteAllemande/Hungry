/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./ingredients.html", "./recipies.html","./*.ts"],
  theme: {
    extend: {
      justifyItems: ['hover', 'focus'],
      transform: ['hover', 'focus'],
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
