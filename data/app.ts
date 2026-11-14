// Centralized ThreadFX App Metadata & Information
// Single source of truth across extension, landing page, and documentation.

export interface AppAuthor {
	name: string;
	handle: string;
	email: string;
	url: string;
	github: string;
}

export interface AppUrls {
	production: string;
	fallback: string;
	repository: string;
	issues: string;
	releases: string;
	download: string;
	license: string;
	threads: string;
}

export interface AppPlatform {
	name: string;
	domain: string;
	legacyDomain: string;
	supportedUrls: string[];
}

export interface AppInfo {
	name: string;
	shortName: string;
	fullName: string;
	slug: string;
	title: string;
	slogan: string;
	tagline: string;
	description: string;
	shortDescription: string;
	keywords: string;
	themeColor: string;
	backgroundColor: string;
	appUrl: string;
	version: string;
	versionTag: string;
	releaseDate: string;
	license: string;
	licenseUrl: string;
	author: AppAuthor;
	creator: string;
	publisher: string;
	twitterSite: string;
	twitterCreator: string;
	ogImageAlt: string;
	urls: AppUrls;
	platform: AppPlatform;
}

export const APP_INFO: AppInfo = {
	name: "ThreadFX",
	shortName: "ThreadFX",
	fullName: "ThreadFX for Threads",
	slug: "threadfx",
	title: "ThreadFX for Threads — Satisfying Audio & Visual Effects",
	slogan: "Tactile audio, visual bursts, and sensory feedback for Threads.",
	tagline: "Bring your Threads to life with tactile juice.",
	description:
		"Bring your Threads to life. Zero-latency procedural sound synthesis, visual particle bursts, and tactile feedback suite for Threads.",
	shortDescription:
		"Satisfying procedural audio, visual particle bursts, and interactive effects for Threads.",
	keywords:
		"threadfx, threads audio, threads sound effects, threads visual effects, particle bursts, custom likes, zzfx audio, chrome extension, side panel, manifest v3, open source",
	themeColor: "#080808",
	backgroundColor: "#080808",
	appUrl: "threadfx.nmrisrl.dev",
	version: "1.0.0",
	versionTag: "v1.0.0",
	releaseDate: "November 14, 2026",
	license: "MIT",
	licenseUrl: "https://github.com/nmrisrl11/threadfx/blob/main/LICENSE",
	author: {
		name: "Nomer Israel",
		handle: "@nmrisrl",
		email: "contact@nmrisrl.dev",
		url: "https://threads.com/@nmrisrl",
		github: "https://github.com/nmrisrl11",
	},
	creator: "Nomer Israel (@nmrisrl)",
	publisher: "ThreadFX",
	twitterSite: "@nmrisrl",
	twitterCreator: "@nmrisrl",
	ogImageAlt:
		"ThreadFX — Zero-latency procedural sound synthesis, visual particle bursts, and tactile feedback for Threads",
	urls: {
		production: "https://threadfx.nmrisrl.dev",
		fallback: "https://threadfx.vercel.app",
		repository: "https://github.com/nmrisrl11/threadfx",
		issues: "https://github.com/nmrisrl11/threadfx/issues",
		releases: "https://github.com/nmrisrl11/threadfx/releases",
		download: "/download",
		license: "https://github.com/nmrisrl11/threadfx/blob/main/LICENSE",
		threads: "https://threads.com/@nmrisrl",
	},
	platform: {
		name: "Threads",
		domain: "threads.com",
		legacyDomain: "threads.net",
		supportedUrls: [
			"https://*.threads.com/*",
			"https://threads.com/*",
			"https://*.threads.net/*",
			"https://threads.net/*",
		],
	},
};

export default APP_INFO;
