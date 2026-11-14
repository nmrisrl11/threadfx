import { Volume2Icon, SparklesIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SidepanelHeader } from "@/components/sidepanel/header";
import { MetricStrip } from "@/components/sidepanel/metric-strip";
import { AudioTab } from "@/components/sidepanel/audio-tab";
import { ParticlesTab } from "@/components/sidepanel/particles-tab";
import { SidepanelFooter } from "@/components/sidepanel/footer";

export default function App() {
	return (
		<div className="bg-background text-foreground flex min-h-screen flex-col justify-between p-3.5 transition-colors duration-200 select-none">
			{/* [Header] - Directly consumes useMasterToggle() and useTheme() */}
			<SidepanelHeader />

			{/* Metric Strip - Directly consumes useLikesCounter() */}
			<div className="pt-1 pb-1.5">
				<MetricStrip />
			</div>

			{/* Tabs System - Mode controller outside the elevated chassis */}
			<Tabs defaultValue="audio" className="flex flex-1 flex-col gap-2">
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

				{/* Elevated Window Chassis (Antigravity Chatbox Container) */}
				<main className="bg-card shadow-chassis border-border flex-1 rounded-[20px] border p-3.5 transition-colors duration-200">
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
