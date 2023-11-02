/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [    "./*.{html,js,ts}",
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
