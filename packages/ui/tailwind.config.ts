import type { Config } from "tailwindcss";
import sharedConfig from "@winrlabs/tailwind-config";

const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "wr-ui-",
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
        border: "hsl(var(--wr-ui-border))",
        input: "hsl(var(--wr-ui-input))",
        ring: "hsl(var(--wr-ui-ring))",
        background: "hsl(var(--wr-ui-background))",
        foreground: "hsl(var(--wr-ui-foreground))",
        primary: {
          DEFAULT: "hsl(var(--wr-ui-primary))",
          foreground: "hsl(var(--wr-ui-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--wr-ui-secondary))",
          foreground: "hsl(var(--wr-ui-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--wr-ui-destructive))",
          foreground: "hsl(var(--wr-ui-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--wr-ui-muted))",
          foreground: "hsl(var(--wr-ui-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--wr-ui-accent))",
          foreground: "hsl(var(--wr-ui-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--wr-ui-popover))",
          foreground: "hsl(var(--wr-ui-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--wr-ui-card))",
          foreground: "hsl(var(--wr-ui-card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--wr-ui-radius)",
        md: "calc(var(--wr-ui-radius) - 2px)",
        sm: "calc(var(--wr-ui-radius) - 4px)",
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
