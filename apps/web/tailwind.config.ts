import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1f2933",
        paper: "#f7f3ea",
        moss: "#49624c",
        clay: "#b56b45",
        mist: "#dce4df"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 24px 60px rgba(31, 41, 51, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
