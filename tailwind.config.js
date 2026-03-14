/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          50: "#F5EBD8",   // aged linen — light
          100: "#E6D3B8",  // aged linen — mid
        },
        saffron: {
          500: "#C9A96E",  // wheat gold
          600: "#A67D42",  // wheat gold — deep
        },
        crimson: {
          600: "#B5541A",  // burnt sienna
          700: "#8C3F12",  // burnt sienna — deep
        },
        amber: {
          500: "#6B2230",  // dried merlot
        },
        forest: {
          500: "#8A9E84",  // dusty sage
        },
        dusty: {
          500: "#7C5635",  // raw umber
        },
        ink: "#2C1610",    // warm dark — toward raw umber
      },
      fontFamily: {
        sans: ["Instrument Sans", "sans-serif"],
        display: ["Crimson Pro", "serif"],
        body: ["Crimson Text", "serif"],
        script: ["Alex Brush", "cursive"],
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
