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
        "light-grey": "#C6C6C6",
      },
    },
  },
  plugins: [],
};
