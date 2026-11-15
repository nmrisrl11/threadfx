import { UpdateBanner } from "@/components/sidepanel/update-banner";
import { Switch } from "@/components/ui/switch";
import { useMasterToggle } from "@/hooks/use-settings";
import { cn } from "@/lib/utils";
import { APP_INFO } from "@data/app";
import { XIcon } from "lucide-react";
import { memo } from "react";

interface SidepanelHeaderProps {
	isThreadsActive?: boolean;
}

export const SidepanelHeader = memo(function SidepanelHeader({
	isThreadsActive = true,
}: SidepanelHeaderProps) {
	const [enabled, toggleEnabled] = useMasterToggle();

	const isLive = enabled && isThreadsActive;
	const isStandby = enabled && !isThreadsActive;
	const statusLabel = !enabled ? "Paused" : isThreadsActive ? "Active" : "Standby";

	return (
		<header className="space-y-1.5 px-0.5 pt-0.5 pb-2">
			{/* Primary Header Row */}
			<div className="flex items-center justify-between gap-2">
				{/* Brand Identity */}
				<div className="flex min-w-0 items-center gap-2.5">
					<img
						src="/icon/128.png"
						alt={APP_INFO.name}
						className="h-7 w-7 shrink-0 rounded-lg object-contain shadow-xs select-none"
						loading="eager"
						decoding="async"
					/>
					<div className="flex min-w-0 items-baseline gap-1.5">
						<span className="font-heading text-foreground truncate text-sm font-bold tracking-tight">
							{APP_INFO.name}
						</span>
						<span className="text-muted-foreground/50 shrink-0 font-mono text-[9px] tracking-wide uppercase">
							v{APP_INFO.version}
						</span>
					</div>
				</div>

				{/* Global Controls: Master Power Module & Close Button */}
				<div className="flex shrink-0 items-center gap-1.5">
					{/* Master Power Module */}
					<div
						className={cn(
							"border-border bg-surface-subtle flex items-center gap-2 rounded-full border py-1 pr-1.5 pl-2.5 transition-colors",
							!enabled && "opacity-75",
						)}
					>
						<span className="relative flex h-2 w-2">
							{isLive && (
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
							)}
							<span
								className={cn(
									"relative inline-flex h-2 w-2 rounded-full transition-colors duration-200",
									isLive && "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
									isStandby && "bg-amber-400/80 shadow-[0_0_6px_rgba(251,191,36,0.6)]",
									!enabled && "bg-muted-foreground/40",
								)}
							/>
						</span>
						<span className="text-foreground font-mono text-[11px] font-medium tracking-tight">
							{statusLabel}
						</span>
						<Switch checked={enabled} onCheckedChange={toggleEnabled} className="scale-90" />
					</div>

					{/* Close Side Panel Trigger */}
					<button
						type="button"
						onClick={() => window.close()}
						title="Close Side Panel (Esc / Alt+Shift+T)"
						className="border-border text-muted-foreground hover:border-foreground/30 hover:bg-surface-muted hover:text-foreground flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors duration-150 active:scale-[0.96]"
					>
						<XIcon className="h-3.5 w-3.5" />
					</button>
				</div>
			</div>

			{/* Non-Breaking Full-Width Update Banner */}
			<UpdateBanner />
		</header>
	);
});
