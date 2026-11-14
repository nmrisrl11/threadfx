import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initTheme } from "@/hooks/use-settings";
import App from "./App.tsx";
import "./style.css";

// Initialize theme synchronously before rendering to prevent FOUC
initTheme();

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
