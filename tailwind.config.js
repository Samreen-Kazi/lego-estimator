/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        legoRed: '#DA291C',
        legoBlue: '#0055BF',
        legoYellow: '#F2CD37',
      },
    },
  },
  plugins: [],
}