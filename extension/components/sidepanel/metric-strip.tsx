import { MilestonesPopover } from "@/components/sidepanel/milestones-popover";
import { ThemeToggle } from "@/components/sidepanel/theme-toggle";

export function MetricStrip() {
	return (
		<div className="border-border bg-surface-subtle flex items-center justify-between rounded-xl border px-3 py-1.5 text-xs transition-colors">
			{/* Realtime Engagement Metric & Interactive Gamified Achievements Popover */}
			<MilestonesPopover />

			{/* Ambient Appearance Preference Control */}
			<div className="flex items-center">
				<ThemeToggle />
			</div>
		</div>
	);
}
