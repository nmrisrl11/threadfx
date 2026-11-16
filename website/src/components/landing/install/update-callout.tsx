import { Card } from "@/components/ui/card";
import { RefreshCwIcon, ShieldCheckIcon } from "lucide-react";

export function UpdateCallout() {
	return (
		<Card className="flex flex-col gap-4 border-white/8 bg-[#111114] p-5 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex items-start gap-3.5">
				<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00F5FF]/10 text-[#00F5FF] ring-1 ring-[#00F5FF]/20">
					<RefreshCwIcon className="h-4 w-4" />
				</div>
				<div>
					<h4 className="text-foreground text-sm font-bold">Seamless Updates (10 Seconds)</h4>
					<p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
						When an update is released, extract the new archive over your folder and click the
						reload icon on <code className="text-foreground/90 font-mono">chrome://extensions</code>
						.
					</p>
				</div>
			</div>

			<div className="text-muted-foreground flex shrink-0 items-center gap-1.5 rounded-lg border border-white/8 bg-black/40 px-3 py-1.5 font-mono text-[10px]">
				<ShieldCheckIcon className="h-3.5 w-3.5 text-emerald-400" />
				<span>Zero Data Loss</span>
			</div>
		</Card>
	);
}
