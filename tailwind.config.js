// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/**/*.{js,ts,html}",
    "./app/**/*.{js,ts,html}",
    "./app/**/**/*.{js,ts,html}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,jsx}",
    // "!./components/reso/Filters.js",
  ],
  theme: {
    extend: {
      width: {
        "1/8": "12.5%",
      },
      colors: {
        // "primary-green": "#217955",
        "primary-green": "#2b396e",
        "light-lime": "#e1f6b2",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
  important: true,
};

export default config;
