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
        background: {
          light: "#FAFAF9",
          cream: "#F5F5F4",
          warm: "#EFEEEC",
          dark: "#0E0F12",
        },
        text: {
          strong: "#0A0A0A",
          muted: "#525252",
          soft: "#737373",
          light: "#0A0A0A",
          dark: "#ECEDEE",
        },
        gold: {
          DEFAULT: "#C17F4A",
          light: "#E8CDB5",
          dark: "#A8691F",
          subtle: "#F4E8DC",
        },
        accent: {
          DEFAULT: "#C17F4A",
          light: "#E8CDB5",
          subtle: "#F4E8DC",
          dark: "#6E8BFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-dm-serif)"],
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
