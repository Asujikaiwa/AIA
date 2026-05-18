import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        aia: {
          red: "#D31145",
          redDark: "#A8072F",
          redLight: "#F6E1E7",
          slate: "#2C3E50",
          gray: "#475569",
          bg: "#FAFAFA"
        }
      },
      fontFamily: {
        sans: ["var(--font-prompt)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(0,0,0,0.12)",
        soft: "0 4px 20px rgba(211, 17, 69, 0.08)"
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
