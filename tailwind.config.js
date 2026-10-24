/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#04050D",
        surface: "#0A0B16",
        "surface-muted": "#0E1020",
        "surface-container": "#1E1F29",
        "surface-container-high": "#282934",
        "surface-container-highest": "#33343F",
        "primary-container": "#FFD83D",
        "accent-teal": "#22E3C8",
        "accent-pink": "#FF2E88",
        border: "#1E2033",
        divider: "#1A1C2E",
        "text-primary": "#FFFFFF",
        "text-secondary": "#C9CAD6",
        "text-muted": "#8B8DA3",
        secondary: "#7C4DFF",
        "track-social": "#2F5BFF",
        "track-creative": "#FF3366",
        "track-aiml": "#7C4DFF",
        "track-fintech": "#2ECC71",
        "challenge-replit": "#FF5A2A",
        "challenge-photon": "#F5B82E",
        "challenge-shock": "#3B6CFF",
        "prize-gold": "#F2B01E",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        wordmark: ["Fredoka", "Outfit", "cursive", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(34, 227, 200, 0.25)",
        pinkGlow: "0 0 25px rgba(255, 46, 136, 0.3)",
        goldGlow: "0 0 25px rgba(255, 216, 61, 0.35)",
        badgeGlow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 45px rgba(255, 216, 61, 0.15)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
        ribbonWave: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(-50%)" },
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      }
    },
  },
  plugins: [],
}
