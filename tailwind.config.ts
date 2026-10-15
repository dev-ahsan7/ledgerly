import type { Config } from "tailwindcss";

// Every color, font, radius and shadow points at a CSS variable defined in
// app/globals.css. Swap the design system there; nothing here needs to change.
const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "810px",
      lg: "1100px",
      xl: "1440px",
    },
    extend: {
      colors: {
        bg: token("bg"),
        surface: token("surface"),
        "surface-2": token("surface-2"),
        ink: token("ink"),
        muted: token("muted"),
        line: token("line"),
        accent: token("accent"),
        "accent-ink": token("accent-ink"),
        inverse: token("inverse"),
        "inverse-ink": token("inverse-ink"),
        "inverse-muted": token("inverse-muted"),
        stamp: token("stamp"),
        "pot-1": token("pot-1"),
        "pot-2": token("pot-2"),
        "pot-3": token("pot-3"),
        success: token("success"),
        danger: token("danger"),
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      fontWeight: {
        heading: "var(--heading-weight)",
      },
      maxWidth: {
        content: "var(--content-max)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        float: "var(--shadow-float)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        progress: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration) linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
