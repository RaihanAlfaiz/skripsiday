/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        museum: {
          bg: "#090909",
          card: "#111111",
          cardBorder: "#222222",
          gold: "#D4AF37",
          goldLight: "#F5E096",
          goldMuted: "rgba(212, 175, 55, 0.15)",
          textSecondary: "#A8A8A8",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        cinematic: ["var(--font-cinematic)", "serif"],
      },
      boxShadow: {
        goldGlow: "0 0 30px rgba(212, 175, 55, 0.25)",
        goldGlowLg: "0 0 50px rgba(212, 175, 55, 0.35)",
        polaroid: "0 10px 30px rgba(0, 0, 0, 0.7), 0 0 1px rgba(255, 255, 255, 0.1)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
