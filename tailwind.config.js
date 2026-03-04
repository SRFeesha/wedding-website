/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          50: "#f8f1e8",
          100: "#ecdecb",
        },
        saffron: {
          500: "#d8a145",
          600: "#bf8426",
        },
        crimson: {
          600: "#6b1d23",
          700: "#4c1318",
        },
        amber: {
          500: "#b9652f",
        },
        forest: {
          500: "#44503b",
        },
        dusty: {
          500: "#6f7f93",
        },
        ink: "#2c1a16",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Sora", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 36px rgba(44, 26, 22, 0.09)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 560ms ease-out both",
      },
    },
  },
  plugins: [],
};
