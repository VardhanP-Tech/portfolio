import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" lets the build work on GitHub Pages under /vishnu-portfolio/
export default defineConfig({ base: "./", plugins: [react()] });
