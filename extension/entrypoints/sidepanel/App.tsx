import { Volume2, Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SidepanelHeader } from "@/components/sidepanel/header";
import { MetricStrip } from "@/components/sidepanel/metric-strip";
import { AudioTab } from "@/components/sidepanel/audio-tab";
import { ParticlesTab } from "@/components/sidepanel/particles-tab";
import { SidepanelFooter } from "@/components/sidepanel/footer";

export default function App() {
	return (
		<div className="flex min-h-screen flex-col justify-between bg-[#09090b] p-3.5 text-[#fafafa] select-none">
			{/* [Header] - Directly consumes useMasterToggle() */}
			<SidepanelHeader />

			{/* Metric Strip - Directly consumes useLikesCounter() */}
			<div className="pt-1 pb-1.5">
				<MetricStrip />
			</div>

			{/* Tabs System - Mode controller outside the elevated chassis */}
			<Tabs defaultValue="audio" className="flex flex-1 flex-col gap-2">
				<TabsList>
					<TabsTrigger value="audio" className="flex items-center gap-1.5">
						<Volume2 className="h-3.5 w-3.5" />
						<span>Sound FX</span>
					</TabsTrigger>
					<TabsTrigger value="particles" className="flex items-center gap-1.5">
						<Sparkles className="h-3.5 w-3.5" />
						<span>Particles</span>
					</TabsTrigger>
				</TabsList>

				{/* Elevated Window Chassis (Antigravity Chatbox Container) */}
				<main className="flex-1 rounded-[20px] border border-white/[0.08] bg-[#131316] p-3.5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.08),inset_0_-1px_1px_0_rgba(0,0,0,0.4),0_8px_24px_-4px_rgba(0,0,0,0.5)]">
					<TabsContent value="audio">
						<AudioTab />
					</TabsContent>

					<TabsContent value="particles">
						<ParticlesTab />
					</TabsContent>
				</main>
			</Tabs>

			{/* [Footer] - Pure static presentation */}
			<SidepanelFooter />
		</div>
	);
}
