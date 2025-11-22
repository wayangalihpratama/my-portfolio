/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  // Remove darkMode config entirely for v4 - it uses CSS selector by default
  theme: {
    extend: {},
  },
  plugins: [],
};
