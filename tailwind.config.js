/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./*.ts"],
  theme: {
    extend: {
      justifyItems: ['hover', 'focus'],
      transform: ['hover', 'focus'],
    },
  },
  plugins: [],
}
