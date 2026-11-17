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
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules/gsap")) {
						return "vendor-gsap";
					}
					if (id.includes("node_modules/canvas-confetti") || id.includes("node_modules/radix-ui")) {
						return "vendor-ui";
					}
					if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
						return "vendor-react";
					}
				},
			},
		},
	},
});
