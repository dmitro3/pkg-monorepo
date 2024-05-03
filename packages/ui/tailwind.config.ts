import type { Config } from "tailwindcss";
import sharedConfig from "@winrlabs/tailwind-config";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "wr-",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--wr-border))",
        input: "hsl(var(--wr-input))",
        ring: "hsl(var(--wr-ring))",
        background: "hsl(var(--wr-background))",
        foreground: "hsl(var(--wr-foreground))",
        primary: {
          DEFAULT: "hsl(var(--wr-primary))",
          foreground: "hsl(var(--wr-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--wr-secondary))",
          foreground: "hsl(var(--wr-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--wr-destructive))",
          foreground: "hsl(var(--wr-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--wr-muted))",
          foreground: "hsl(var(--wr-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--wr-accent))",
          foreground: "hsl(var(--wr-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--wr-popover))",
          foreground: "hsl(var(--wr-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--wr-card))",
          foreground: "hsl(var(--wr-card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--wr-radius)",
        md: "calc(var(--wr-radius) - 2px)",
        sm: "calc(var(--wr-radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  corePlugins: {
    // preflight: false,
  },
  presets: [sharedConfig],
} satisfies Config;

export default config;
