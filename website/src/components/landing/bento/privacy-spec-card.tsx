import { Card } from "@/components/ui/card";
import { ShieldCheckIcon } from "lucide-react";

export function PrivacySpecCard() {
	return (
		<Card className="flex flex-col justify-between border-white/8 bg-[#111114] p-6 transition-[border-color,background-color] duration-150 hover:border-white/16 md:col-span-7">
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
						<ShieldCheckIcon className="h-4 w-4" />
					</div>
					<div className="text-muted-foreground inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/4 px-2.5 py-0.5 font-mono text-[10px]">
						<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
						<span>Zero Tracking Telemetry</span>
					</div>
				</div>

				<div>
					<h3 className="text-foreground text-base font-bold">100% On-Device &amp; Private</h3>
					<p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
						Your interaction odometer and settings persist solely inside local storage. No analytics
						cookies, no tracking pixels, and no remote servers watching your activity.
					</p>
				</div>
			</div>

			{/* Local Storage Pill */}
			<div className="text-muted-foreground mt-6 flex items-center justify-between rounded-xl border border-white/8 bg-black/50 px-4 py-3 font-mono text-[11px]">
				<span className="text-foreground/80">chrome.storage.local</span>
				<span className="text-emerald-400">Strictly Isolated</span>
			</div>
		</Card>
	);
}
