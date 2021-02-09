const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      display: ["Recoleta"],
      body: ["Avenir"],
      sans: ["Inter"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      heirloomOrange: {
        DEFAULT: "#FF7F59",
        light: "#ffb087",
        dark: "#c74f2e",
      },

      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
