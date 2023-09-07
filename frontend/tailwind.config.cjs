/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        "tall": { "raw": "(min-height: 800px)"},
        "2tall": { "raw": "(min-height: 1000px)"},
        "3tall": { "raw": "(min-height: 1200px)"}
      }
    },
    fontFamily: {
      fragment: ["Fragment"]
    }
  },
  keyframes: {
    heartbeat: {
      '0%': {
        transform: 'scale(1)',
      },
      '50%': {
        transform: 'scale(1.25)',
      },
      '100%': {
        transform: 'scale(1)',
      },
    },
  },
  animation: {
    heartbeat: 'heartbeat 1.5s ease-in-out infinite both',
  },
  plugins: [],
}
