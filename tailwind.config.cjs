/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        "tall": { "raw": "(min-height: 800px)"},
        "2tall": { "raw": "(min-height: 1000px)"}
      }
    },
  },
  plugins: [],
}
