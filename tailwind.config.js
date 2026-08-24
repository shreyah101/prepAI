/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      colors: {
        neo: {
          yellow: "#CCFF00",
          lime: "#D4FF00",
          cyan: "#5EEAD4",
          blue: "#67E8F9",
          pink: "#F472B6",
          rose: "#FDA4AF",
          purple: "#C084FC",
          lavender: "#DDD6FE",
          cream: "#FEF9C3",
          green: "#86EFAC",
          orange: "#FDBA74",
          black: "#111111",
          card: "#FFFFFF",
          bg: "#F5F5F0",
        },
      },
      boxShadow: {
        neo: "4px 4px 0px 0px #000000",
        "neo-sm": "2px 2px 0px 0px #000000",
        "neo-md": "5px 5px 0px 0px #000000",
        "neo-lg": "8px 8px 0px 0px #000000",
        "neo-yellow": "4px 4px 0px 0px #CCFF00",
        "neo-cyan": "4px 4px 0px 0px #5EEAD4",
        "neo-pink": "4px 4px 0px 0px #F472B6",
      },
    },
  },
  plugins: [],
};

