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
          light: "#FAFAFA",
          dark: "#0E0F12",
        },
        text: {
          light: "#111111",
          muted: "#6F737A",
          dark: "#ECEDEE",
        },
        accent: {
          light: "#3D66FF",
          dark: "#6E8BFF",
        },
        brass: "#C8A96B",
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
