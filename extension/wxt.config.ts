import path from "path";
import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
	modules: ["@wxt-dev/module-react"],
	manifest: {
		name: "ThreadFX for Threads",
		description:
			"Satisfying procedural audio, visual confetti bursts, and interactive effects for Threads.",
		author: "Nomer Israel",
		homepage_url: "https://threadfx.nmrisrl.dev",
		permissions: ["sidePanel", "storage"],
		host_permissions: [
			"https://*.threads.com/*",
			"https://threads.com/*",
			"https://*.threads.net/*",
			"https://threads.net/*",
		],
		action: {
			default_title: "Open ThreadFX Side Panel",
		},
	},
	vite: () => ({
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@data": path.resolve(import.meta.dirname, "../data"),
			},
		},
	}),
});
