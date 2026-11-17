import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "wxt";
import { APP_INFO } from "../data/app";

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
	modules: ["@wxt-dev/module-react"],
	zip: {
		artifactTemplate: "{{name}}-{{packageVersion}}.zip",
	},
	hooks: {
		"zip:done": (_wxt, zipFiles) => {
			for (const zipFile of zipFiles) {
				if (!zipFile.includes("-sources")) {
					const latestPath = path.resolve(path.dirname(zipFile), "threadfx-latest.zip");
					fs.copyFileSync(zipFile, latestPath);
				}
			}
		},
	},
	manifest: {
		name: APP_INFO.fullName,
		description: APP_INFO.shortDescription,
		homepage_url: APP_INFO.urls.production,
		permissions: ["sidePanel", "storage"],
		host_permissions: APP_INFO.platform.supportedUrls,
		web_accessible_resources: [
			{
				resources: ["badges/*.webp"],
				matches: APP_INFO.platform.supportedUrls,
			},
		],
		action: {
			default_title: `Toggle ${APP_INFO.name} Side Panel`,
			default_icon: {
				"16": "icon/16.png",
				"32": "icon/32.png",
				"48": "icon/48.png",
			},
		},
		commands: {
			"toggle-sidepanel": {
				suggested_key: {
					default: "Alt+Shift+T",
					mac: "Alt+Shift+T",
				},
				description: `Toggle ${APP_INFO.name} Side Panel`,
			},
		},
	},
	vite: () => ({
		plugins: [
			tailwindcss(),
			{
				name: "html-transform",
				transformIndexHtml(html: string) {
					return html.replace(/%APP_NAME%/g, APP_INFO.name);
				},
			},
		],
		resolve: {
			alias: {
				"@data": path.resolve(import.meta.dirname, "../data"),
			},
		},
	}),
});
