/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
          foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)",
        },
        background: {
          DEFAULT: "rgb(var(--color-background) / <alpha-value>)",
          foreground: "rgb(var(--color-background-foreground) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "rgb(var(--color-foreground) / <alpha-value>)",
          muted: "rgb(var(--color-foreground-muted) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--color-destructive) / <alpha-value>)",
          foreground: "rgb(var(--color-destructive-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--color-success) / <alpha-value>)",
          foreground: "rgb(var(--color-success-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--color-warning) / <alpha-value>)",
          foreground: "rgb(var(--color-warning-foreground) / <alpha-value>)",
        },
        info: {
          DEFAULT: "rgb(var(--color-info) / <alpha-value>)",
          foreground: "rgb(var(--color-info-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card-rgb) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground-rgb) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover-rgb) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground-rgb) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground-rgb) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--border-rgb) / <alpha-value>)",
          foreground: "rgb(var(--border-foreground-rgb) / <alpha-value>)",
        },
        input: {
          DEFAULT: "rgb(var(--input-rgb) / <alpha-value>)",
          foreground: "rgb(var(--input-foreground-rgb) / <alpha-value>)",
        },
        ring: "rgb(var(--ring-rgb) / <alpha-value>)",
        radius: "var(--radius)",
      },
    },
  },
  plugins: [
    ({ addBase }) => {
      addBase({
        ":root": {
          "--color-primary": "0 0 0",
          "--color-secondary": "45 45 45",
          "--color-background": "255 255 255",
          "--color-primary-foreground": "255 255 255",
          "--color-foreground": "0 0 0",
          "--color-destructive": "239 68 68",
          "--color-success": "34 197 94",
          "--color-warning": "234 179 8",
          "--color-info": "59 130 246",
          "--color-muted": "115 115 115",
        },
      });
    },
  ],
};
