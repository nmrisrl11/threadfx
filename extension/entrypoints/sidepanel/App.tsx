import { SidepanelFooter } from "@/components/sidepanel/footer";
import { SidepanelHeader } from "@/components/sidepanel/header";
import { MetricStrip } from "@/components/sidepanel/metric-strip";
import { ParticlesTab } from "@/components/sidepanel/particles/particles-tab";
import { PlatformStandbyBanner } from "@/components/sidepanel/platform-standby-banner";
import { SoundFxTab } from "@/components/sidepanel/sound-fx/sound-fx-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useActiveTabStatus } from "@/hooks/use-active-tab-status";
import { SparklesIcon, Volume2Icon } from "lucide-react";
import { useEffect } from "react";

export default function App() {
	const { isThreadsActive } = useActiveTabStatus();

	// Manage background connection port & Escape key for keyboard shortcuts
	useEffect(() => {
		let port: chrome.runtime.Port | null = null;
		if (typeof chrome !== "undefined" && chrome.runtime?.connect) {
			try {
				port = chrome.runtime.connect({ name: "threadfx-sidepanel" });
				port.onMessage.addListener((msg) => {
					if (msg?.type === "CLOSE_SIDEPANEL") {
						window.close();
					}
				});
			} catch {
				// Ignore connection error outside extension context
			}
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				window.close();
				return;
			}
			if (e.altKey && e.shiftKey && (e.key === "T" || e.key === "t" || e.code === "KeyT")) {
				e.preventDefault();
				window.close();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			port?.disconnect();
		};
	}, []);

	return (
		<div className="bg-background text-foreground flex h-screen max-h-screen flex-col justify-between overflow-hidden p-3.5 transition-colors duration-200 select-none">
			{/* [Header] - Master Toggle, Live Status & Close Action */}
			<div className="shrink-0">
				<SidepanelHeader isThreadsActive={isThreadsActive} />
			</div>

			{/* Metric Strip - Realtime Engagement & Juicer Rank */}
			<div className="shrink-0 pt-1 pb-1.5">
				<MetricStrip />
			</div>

			{/* Platform Standby Notification - Rendered when active tab is not Threads */}
			{!isThreadsActive && (
				<div className="shrink-0 pb-1.5">
					<PlatformStandbyBanner />
				</div>
			)}

			{/* Tabs System - Mode controller outside the elevated chassis */}
			<Tabs defaultValue="audio" className="flex min-h-0 flex-1 flex-col gap-2">
				<div className="shrink-0">
					<TabsList>
						<TabsTrigger value="audio" className="flex items-center gap-1.5">
							<Volume2Icon className="h-3.5 w-3.5" />
							<span>Sound FX</span>
						</TabsTrigger>
						<TabsTrigger value="particles" className="flex items-center gap-1.5">
							<SparklesIcon className="h-3.5 w-3.5" />
							<span>Particles</span>
						</TabsTrigger>
					</TabsList>
				</div>

				{/* Elevated Window Chassis (Interactive Soundboard & Particle Controls) */}
				<main className="bg-card shadow-chassis border-border flex min-h-0 flex-1 flex-col overflow-hidden rounded-[20px] border p-3.5 transition-colors duration-200">
					<TabsContent
						value="audio"
						className="flex min-h-0 flex-1 flex-col outline-none data-[state=inactive]:hidden"
					>
						<SoundFxTab />
					</TabsContent>

					<TabsContent
						value="particles"
						className="flex min-h-0 flex-1 flex-col outline-none data-[state=inactive]:hidden"
					>
						<ParticlesTab />
					</TabsContent>
				</main>
			</Tabs>

			{/* [Footer] - Pure static presentation */}
			<div className="shrink-0 pt-1.5">
				<SidepanelFooter />
			</div>
		</div>
	);
}
