/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        linen: {
          50:  "#F4F0EB",  // aged linen — card/hero bg
          100: "#E8DFD0",  // aged linen — section bg
        },
        sienna: {
          600: "#B5541A",  // burnt sienna — primary interactive accent
          700: "#8C3F12",  // burnt sienna — deep hover
        },
        gold: {
          500: "#C9A96E",  // wheat gold — dividers, borders
          600: "#A67D42",  // wheat gold — icons, text accents
        },
        merlot: {
          600: "#6B2230",  // dried merlot — typographic accent
        },
        sage: {
          500: "#8A9E84",  // dusty sage — success states
        },
        umber: {
          500: "#7C5635",  // raw umber — tertiary earthy
        },
        ink:   "#2C1610",  // warm dark — primary text
        error: "#B5340F",  // validation errors
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
        display: ["Crimson Pro", "serif"],
        body: ["Crimson Text", "serif"],
        script: ["Alex Brush", "cursive"],
        dm: ["DM Serif Display", "serif"],
        condensed: ["IBM Plex Sans Condensed", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 36px rgba(44, 26, 22, 0.09)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        pingOnce: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 560ms ease-out both",
        fadeOut: "fadeOut 400ms ease-in both",
        "ping-once": "pingOnce 700ms cubic-bezier(0, 0, 0.2, 1) 1 forwards",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.25, 1, 0.5, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
