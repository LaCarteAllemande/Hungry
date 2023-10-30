/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    "./src/**/*.{html,js}",
  "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      justifyItems: ['hover', 'focus'],
      transform: ['hover', 'focus'],
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
  darkMode: "class"
}
