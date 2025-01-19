import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        card: {
          DEFAULT: "#111111",
          foreground: "#ffffff"
        },
        popover: {
          DEFAULT: "#111111",
          foreground: "#ffffff"
        },
        primary: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff"
        },
        secondary: {
          DEFAULT: "#1f2937",
          foreground: "#9ca3af"
        },
        muted: {
          DEFAULT: "#1f2937",
          foreground: "#9ca3af"
        },
        accent: {
          DEFAULT: "#18181b",
          foreground: "#ffffff"
        },
        destructive: {
          DEFAULT: "#991b1b",
          foreground: "#ffffff"
        },
        border: "#2d2d2d",
        input: "#2d2d2d",
        ring: "#6366f1",
      },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.15)",
        "glow-lg": "0 0 30px rgba(139, 92, 246, 0.2)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #6366f1, #8b5cf6)",
        "gradient-secondary": "linear-gradient(to right, #3b82f6, #6366f1)",
        "gradient-border": "linear-gradient(to bottom, #6366f1, #3b82f6)",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem"
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        heading: ['Raleway', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
