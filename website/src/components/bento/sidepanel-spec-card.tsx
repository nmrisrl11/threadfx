import { Card } from "@/components/ui/card";
import { LaptopIcon } from "lucide-react";

export function SidepanelSpecCard() {
	return (
		<Card className="flex flex-col justify-between border-white/8 bg-[#111114] p-6 transition-[border-color,background-color] duration-150 hover:border-white/16 md:col-span-5">
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7928CA]/15 text-[#A855F7] ring-1 ring-[#7928CA]/30">
						<LaptopIcon className="h-4 w-4" />
					</div>
					<div className="text-muted-foreground inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-2.5 py-0.5 font-mono text-[10px]">
						<span>Chrome Side Panel API</span>
					</div>
				</div>

				<div>
					<h3 className="text-foreground text-base font-bold">Docked Native Side Panel</h3>
					<p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
						Lives docked to your browser viewport with zero DOM injection clutter. Audition sound
						profiles and adjust volume without obstructing social feeds.
					</p>
				</div>
			</div>

			{/* Dock Architecture Pill */}
			<div className="text-muted-foreground mt-6 flex items-center justify-between rounded-xl border border-white/8 bg-black/50 px-4 py-3 font-mono text-[11px]">
				<span className="text-foreground/80">chrome.sidePanel</span>
				<span className="text-[#00F5FF]">Isolated Context</span>
			</div>
		</Card>
	);
}
