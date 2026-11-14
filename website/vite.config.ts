import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { htmlPlugin } from "./vite-plugins.ts";

// https://vite.dev/config/
export default defineConfig({
	plugins: [htmlPlugin(), react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
			"@data": path.resolve(import.meta.dirname, "../data"),
		},
	},
});
