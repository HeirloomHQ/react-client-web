const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      outline: {
        heirloomOrange: ["2.5px solid #FF7F59", "1px"],
      },
    },
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
      outlineButtonHover: "#F6F5F3",

      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      "text-default": "#1F1F1F",
      paper: "#FEF9F5",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
