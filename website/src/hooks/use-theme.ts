import { useCallback, useSyncExternalStore } from "react";

export type ThemeMode = "system" | "dark" | "light";

const THEME_STORAGE_KEY = "threadfx_theme";
const DEFAULT_THEME: ThemeMode = "dark";

let currentTheme: ThemeMode = DEFAULT_THEME;
const listeners = new Set<() => void>();

function notify() {
	listeners.forEach((listener) => listener());
}

/**
 * Checks if the user's OS preference is dark mode.
 */
function getSystemIsDark(): boolean {
	if (typeof window === "undefined" || !window.matchMedia) return true;
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Resolves whether the UI should render dark based on mode and OS preference.
 */
export function resolveIsDark(theme: ThemeMode): boolean {
	if (theme === "dark") return true;
	if (theme === "light") return false;
	return getSystemIsDark();
}

/**
 * Applies the given theme mode to the DOM.
 * Synchronizes <meta name="color-scheme">, document root classes, and data-theme.
 */
export function applyThemeToDOM(theme: ThemeMode) {
	if (typeof document === "undefined") return;

	const isDark = resolveIsDark(theme);

	// 1. Sync <meta name="color-scheme">
	const meta = document.querySelector('meta[name="color-scheme"]');
	if (meta) {
		meta.setAttribute("content", theme === "system" ? "light dark" : theme);
	}

	// 2. Sync documentElement classes and data-theme
	const root = document.documentElement;
	root.classList.toggle("dark", isDark);
	root.classList.toggle("light", !isDark);
	root.setAttribute("data-theme", isDark ? "dark" : "light");
}

/**
 * Synchronous initialization to prevent Flash of Un-themed Content (FOUC).
 */
export function initTheme() {
	let cachedTheme: ThemeMode = DEFAULT_THEME;
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
		if (stored === "light" || stored === "dark" || stored === "system") {
			cachedTheme = stored;
		}
	} catch {
		// Ignore localStorage read errors (e.g., privacy modes)
	}

	currentTheme = cachedTheme;
	applyThemeToDOM(cachedTheme);
}

/**
 * Updates active theme, writes to localStorage, and updates DOM.
 */
export function setTheme(theme: ThemeMode) {
	currentTheme = theme;
	try {
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	} catch {
		// Ignore storage write errors
	}
	applyThemeToDOM(theme);
	notify();
}

export function getTheme(): ThemeMode {
	return currentTheme;
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

// Listen to OS theme changes when theme is "system"
if (typeof window !== "undefined" && window.matchMedia) {
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	mediaQuery.addEventListener("change", () => {
		if (currentTheme === "system") {
			applyThemeToDOM("system");
			notify();
		}
	});

	// Synchronize theme across multiple browser tabs
	window.addEventListener("storage", (e) => {
		if (e.key === THEME_STORAGE_KEY && e.newValue) {
			const newTheme = e.newValue as ThemeMode;
			if (newTheme === "light" || newTheme === "dark" || newTheme === "system") {
				currentTheme = newTheme;
				applyThemeToDOM(newTheme);
				notify();
			}
		}
	});
}

/**
 * Reactive hook for reading and updating the active color theme.
 * Returns [theme, setTheme, isDark] tuple.
 */
export function useTheme(): [ThemeMode, (theme: ThemeMode) => void, boolean] {
	const theme = useSyncExternalStore(subscribe, getTheme, () => DEFAULT_THEME);
	const updateTheme = useCallback((newTheme: ThemeMode) => setTheme(newTheme), []);
	const isDark = resolveIsDark(theme);
	return [theme, updateTheme, isDark];
}
