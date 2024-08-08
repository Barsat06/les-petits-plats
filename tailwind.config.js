/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    fontSize: {
      sm: ["12px"],
      base: ["14px"],
      lg: ["16px"],
      xl: ["18px"],
    },
    fontFamily: {
      anton: ["Anton", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        yellow: "#FFD15B",
        black: "#1B1B1B",
        grey: "#7A7A7A",
        lightGrey: "#C6C6C6",
        bodyGrey: "#EDEDED",
      },
      boxShadow: {
        cardShadow: "0 4px 34px 30px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
