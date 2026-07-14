/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        sans: ['"Montserrat"', "sans-serif"],
      },
      colors: {
        brand: {
          amber: "#D97706",
          "amber-dark": "#C26405",
          espresso: "#2A1A0E",
          mocha: "#5C4A3C",
          cream: "#FFF3E0",
          milk: "#FDFDFB",
          sand: "#EADBC8",
          butter: "#FFE4C2",
        },
      },
      zIndex: {
        45: "45",
        200: "200",
      },
    },
  },
  plugins: [],
};
