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
	fullName: "ThreadFX — Tactile Social Effects Suite",
	slug: "threadfx",
	title: "ThreadFX — Tactile Effects & Interaction Suite for Social Feeds",
	slogan: "Tactile audio, visual particle bursts, and physical feedback for social threads.",
	tagline: "Turn silent scrolling into a rich tactile experience.",
	description:
		"ThreadFX brings your social feeds to life. Zero-latency procedural audio synthesis, visual particle bursts, and tactile micro-interactions for social threads — starting with Threads.",
	shortDescription:
		"Tactile micro-interactions, procedural audio synthesis, and visual particle bursts for social threads.",
	keywords:
		"threadfx, tactile feedback, social threads, procedural audio, sound effects, particle bursts, confetti physics, custom likes, zzfx, web audio api, chrome extension, side panel, manifest v3, open source, micro-interactions",
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
		"ThreadFX — Tactile micro-interactions, zero-latency procedural audio, and visual particle physics for social feeds",
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
