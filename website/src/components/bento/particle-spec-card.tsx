import { Card } from "@/components/ui/card";
import { SparklesIcon } from "lucide-react";

export function ParticleSpecCard() {
	return (
		<Card className="flex flex-col justify-between border-white/8 bg-[#111114] p-6 transition-[border-color,background-color] duration-150 hover:border-white/16 md:col-span-5">
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00F5FF]/10 text-[#00F5FF] ring-1 ring-[#00F5FF]/20">
						<SparklesIcon className="h-4 w-4" />
					</div>
					<div className="text-muted-foreground inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-2.5 py-0.5 font-mono text-[10px]">
						<span className="h-1.5 w-1.5 rounded-full bg-[#00F5FF]" />
						<span>GPU 2D Canvas</span>
					</div>
				</div>

				<div>
					<h3 className="text-foreground text-base font-bold">Physics-Driven Particle Bursts</h3>
					<p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
						Hardware-accelerated confetti erupting directly from the tapped element with
						configurable spread, velocity, and custom emoji glyphs.
					</p>
				</div>
			</div>

			{/* Visual Particle Dynamics Graphic */}
			<div className="text-muted-foreground mt-6 flex items-center justify-between rounded-xl border border-white/8 bg-black/50 px-4 py-3 font-mono text-[11px]">
				<div className="flex items-center gap-2">
					<span className="h-2 w-2 rounded-full bg-[#FF2E93]" />
					<span>30°–90° Spread</span>
				</div>
				<span className="text-white/20">•</span>
				<div className="flex items-center gap-2">
					<span className="h-2 w-2 rounded-full bg-[#00F5FF]" />
					<span>60 FPS Overlay</span>
				</div>
			</div>
		</Card>
	);
}
