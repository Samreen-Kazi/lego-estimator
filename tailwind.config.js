/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        legoRed: "#d62828",
        legoYellow: "#f77f00",
        legoBlue: "#003f91",
      },
      fontFamily: {
        lego: ['"Fredoka One"', "cursive"],
      },
    },
  },
  plugins: [],
}
