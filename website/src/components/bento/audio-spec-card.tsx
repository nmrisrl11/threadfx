import { Card } from "@/components/ui/card";
import { ZapIcon } from "lucide-react";

export function AudioSpecCard() {
	return (
		<Card className="flex flex-col justify-between border-white/8 bg-[#111114] p-6 transition-[border-color,background-color] duration-150 hover:border-white/16 md:col-span-7">
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF2E93]/10 text-[#FF2E93] ring-1 ring-[#FF2E93]/20">
						<ZapIcon className="h-4 w-4" />
					</div>
					<div className="text-muted-foreground inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-2.5 py-0.5 font-mono text-[10px]">
						<span className="h-1.5 w-1.5 rounded-full bg-[#FF2E93]" />
						<span>&lt; 15ms Latency</span>
					</div>
				</div>

				<div>
					<h3 className="text-foreground text-base font-bold">Procedural Web Audio Synthesis</h3>
					<p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
						Zero loose MP3s or network fetches. Every acoustic earcon is synthesized mathematically
						in-memory via ZzFX and the browser native Web Audio API upon interaction.
					</p>
				</div>
			</div>

			{/* Audio Synthesis Spec Display */}
			<div className="mt-6 rounded-xl border border-white/8 bg-black/50 p-3.5 font-mono text-[11px]">
				<div className="text-muted-foreground/80 flex items-center justify-between">
					<span>// Procedural parameter array</span>
					<span className="text-[#00F5FF]">WebAudio API</span>
				</div>
				<div className="text-foreground/90 mt-2 truncate text-xs">
					<span className="text-[#FF2E93]">zzfx</span>
					<span className="text-muted-foreground">(</span>
					<span className="text-amber-400">0.5</span>
					<span className="text-muted-foreground">, </span>
					<span className="text-emerald-400">0</span>
					<span className="text-muted-foreground">, </span>
					<span className="text-cyan-400">420</span>
					<span className="text-muted-foreground">, </span>
					<span className="text-indigo-400">0.04</span>
					<span className="text-muted-foreground">, </span>
					<span className="text-amber-400">0.15</span>
					<span className="text-muted-foreground">...)</span>
				</div>
			</div>
		</Card>
	);
}
