const withMT = require('@material-tailwind/react/utils/withMT');

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    fontFamily: {
      roboto: ["'Roboto', sans-serif"], 
      anta: ["'Anta', sans-serif"],
      'open-sans': ["'Open Sans', sans-serif"],
    },
    extend: {
      colors: {
        'light-black': '#181818',
        'blue-gray-dark': '#171e21'
      },
      keyframes: {
        appear: {
          '0%': {
            transform: 'translate(-100%)'
          },
          '100%': {
            transform: 'translate(0)'
          }
        }
      },
      animation: {
        'appear': 'appear 0.5s ease-out'
      }
    },
  },
  plugins: [],
});