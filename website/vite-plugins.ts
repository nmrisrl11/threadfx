import type { Plugin, ResolvedConfig } from "vite";
import { APP_INFO } from "../data/app.ts";

export const htmlPlugin = (): Plugin => {
	let isDev = false;
	return {
		name: "html-transform",
		configResolved(config: ResolvedConfig) {
			isDev = config.mode === "development";
		},
		transformIndexHtml(html: string) {
			const reactScanScript = isDev
				? '<script crossorigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js"></script>'
				: "";

			return html
				.replace(/%APP_TITLE%/g, APP_INFO.title)
				.replace(/%APP_DESCRIPTION%/g, APP_INFO.description)
				.replace(/%APP_SHORT_DESCRIPTION%/g, APP_INFO.shortDescription)
				.replace(/%APP_KEYWORDS%/g, APP_INFO.keywords)
				.replace(/%APP_THEME_COLOR%/g, APP_INFO.themeColor)
				.replace(/%APP_NAME%/g, APP_INFO.name)
				.replace(/%APP_FULL_NAME%/g, APP_INFO.fullName)
				.replace(/%APP_AUTHOR%/g, `${APP_INFO.author.name} (${APP_INFO.author.handle})`)
				.replace(/%APP_CREATOR%/g, APP_INFO.creator)
				.replace(/%APP_PUBLISHER%/g, APP_INFO.publisher)
				.replace(/%APP_URL%/g, APP_INFO.appUrl)
				.replace(/%APP_VERSION%/g, APP_INFO.version)
				.replace(/%APP_OG_IMAGE_ALT%/g, APP_INFO.ogImageAlt)
				.replace(/%TWITTER_SITE%/g, APP_INFO.twitterSite)
				.replace(/%TWITTER_CREATOR%/g, APP_INFO.twitterCreator)
				.replace(/%AUTHOR_NAME%/g, APP_INFO.author.name)
				.replace(/%AUTHOR_URL%/g, APP_INFO.author.url)
				.replace(/%LICENSE_URL%/g, APP_INFO.licenseUrl)
				.replace(/%REACT_SCAN%/g, reactScanScript);
		},
	};
};
