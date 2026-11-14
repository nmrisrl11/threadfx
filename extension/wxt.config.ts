import path from "path";
import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";
import { APP_INFO } from "../data/app";

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
	modules: ["@wxt-dev/module-react"],
	manifest: {
		name: APP_INFO.fullName,
		description: APP_INFO.shortDescription,
		homepage_url: APP_INFO.urls.production,
		permissions: ["sidePanel", "storage"],
		host_permissions: APP_INFO.platform.supportedUrls,
		action: {
			default_title: `Open ${APP_INFO.name} Side Panel`,
			default_icon: {
				"16": "icon/16.png",
				"32": "icon/32.png",
				"48": "icon/48.png",
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
