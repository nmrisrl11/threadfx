import { HeartIcon } from "lucide-react";
import { useLikesCounter } from "@/hooks/use-settings";

export function MetricStrip() {
	const count = useLikesCounter();

	return (
		<div className="border-border bg-surface-subtle flex items-center justify-between rounded-xl border px-3 py-2 text-xs transition-colors">
			<div className="text-muted-foreground flex items-center gap-2">
				<HeartIcon className="text-muted-foreground h-3.5 w-3.5" />
				<span className="text-[11px] font-medium">Likes enhanced</span>
			</div>
			<span className="text-foreground font-mono text-xs font-semibold">{count}</span>
		</div>
	);
}
