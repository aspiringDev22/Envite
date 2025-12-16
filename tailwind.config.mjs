// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#171717",
      },
    },
  },
  // plugins: [daisyui],
};
