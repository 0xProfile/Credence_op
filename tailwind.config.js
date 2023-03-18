/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 1s ease-in-out',
      },
      keyframes: {
        // bouncing left to right to left
        wiggle: {
          '0%, 100%': { transform: 'translateX(-5%)' },
          '50%': { transform: 'translateX(5%)' },
        },
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
