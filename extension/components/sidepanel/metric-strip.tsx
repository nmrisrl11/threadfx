import { ThemeToggle } from "@/components/sidepanel/theme-toggle";
import { useLikesCounter } from "@/hooks/use-settings";
import { HeartIcon } from "lucide-react";

export function MetricStrip() {
	const count = useLikesCounter();

	return (
		<div className="border-border bg-surface-subtle flex items-center justify-between rounded-xl border px-3 py-1.5 text-xs transition-colors">
			{/* Realtime Engagement Metric */}
			<div className="flex items-center gap-2">
				<HeartIcon className="text-muted-foreground h-3.5 w-3.5" />
				<div className="flex items-baseline gap-1.5">
					<span className="text-muted-foreground text-[11px] font-medium">Likes enhanced</span>
					<span className="text-foreground font-mono text-xs font-semibold">{count}</span>
				</div>
			</div>

			{/* Ambient Appearance Preference Control */}
			<div className="flex items-center">
				<ThemeToggle />
			</div>
		</div>
	);
}
