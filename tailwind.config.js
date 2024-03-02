/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./node_modules/tw-elements-react/dist/js/**/*.js`,
  ],
  theme: {
    fontFamily: {
      roboto: ["'Roboto', sans-serif"]
    },
    extend: {},
  },
  plugins: [require("tw-elements-react/dist/plugin")],
  darkMode: "class",
}
