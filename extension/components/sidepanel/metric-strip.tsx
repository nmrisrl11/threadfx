import { Heart } from "lucide-react";
import { useLikesCounter } from "@/hooks/use-settings";

export function MetricStrip() {
	const count = useLikesCounter();

	return (
		<div className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2 text-xs">
			<div className="flex items-center gap-2 text-zinc-400">
				<Heart className="h-3.5 w-3.5 text-zinc-400" />
				<span className="text-[11px] font-medium">Likes enhanced</span>
			</div>
			<span className="font-mono text-xs font-semibold text-zinc-200">{count}</span>
		</div>
	);
}
