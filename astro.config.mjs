import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://wayangalihpratama.github.io",
  base: "/my-portfolio", // Your repository name
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
