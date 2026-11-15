import { useLikesCounter } from "@/hooks/use-settings";
import type { StorageTelemetry } from "@/lib/storage";
import { formatBytes } from "@/lib/storage";
import { HeartIcon, LayersIcon, ShieldCheckIcon, SlidersIcon } from "lucide-react";
import { memo } from "react";

interface StorageBreakdownCardProps {
	telemetry: StorageTelemetry | null;
	loading: boolean;
}

export const StorageBreakdownCard = memo(function StorageBreakdownCard({
	telemetry,
	loading,
}: StorageBreakdownCardProps) {
	const likesCount = useLikesCounter();
	const juicedCount = telemetry?.juicedPostsCount ?? 0;
	const juicedBytes = telemetry?.juicedPostsBytes ?? 0;
	const settingsBytes = telemetry?.settingsBytes ?? 0;

	return (
		<div className="border-border bg-card/60 space-y-3 rounded-xl border p-3.5 shadow-xs transition-colors">
			<div className="flex items-center gap-1.5">
				<LayersIcon className="text-muted-foreground h-3.5 w-3.5" />
				<h4 className="text-foreground text-xs font-semibold tracking-tight">Storage Breakdown</h4>
			</div>

			<div className="space-y-2">
				{/* 1. Smart Juicer Post Memory */}
				<div className="border-border/60 bg-surface-subtle flex items-center justify-between gap-2.5 rounded-lg border p-2.5 text-xs transition-colors">
					<div className="flex min-w-0 flex-1 items-center gap-2.5">
						<div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-md">
							<ShieldCheckIcon className="h-3.5 w-3.5" />
						</div>
						<div className="min-w-0 flex-1 space-y-0.5">
							<div className="text-foreground truncate text-[11px] leading-tight font-medium">
								Enhanced Posts Memory
							</div>
							<div className="text-muted-foreground truncate text-[10px] leading-tight">
								{loading ? "..." : `${juicedCount} / 1,000 unique posts remembered`}
							</div>
						</div>
					</div>

					<span className="text-foreground shrink-0 font-mono text-[11px] font-semibold">
						{loading ? "..." : formatBytes(juicedBytes)}
					</span>
				</div>

				{/* 2. Preferences, Audio & Particle Configurations */}
				<div className="border-border/60 bg-surface-subtle flex items-center justify-between gap-2.5 rounded-lg border p-2.5 text-xs transition-colors">
					<div className="flex min-w-0 flex-1 items-center gap-2.5">
						<div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-md">
							<SlidersIcon className="h-3.5 w-3.5" />
						</div>
						<div className="min-w-0 flex-1 space-y-0.5">
							<div className="text-foreground truncate text-[11px] leading-tight font-medium">
								Preferences & Presets
							</div>
							<div className="text-muted-foreground truncate text-[10px] leading-tight">
								Active sound pack, volume, pitch, palettes, and theme
							</div>
						</div>
					</div>

					<span className="text-foreground shrink-0 font-mono text-[11px] font-semibold">
						{loading ? "..." : formatBytes(settingsBytes)}
					</span>
				</div>

				{/* 3. Sensory Juicer Progression Odometer */}
				<div className="border-border/60 bg-surface-subtle flex items-center justify-between gap-2.5 rounded-lg border p-2.5 text-xs transition-colors">
					<div className="flex min-w-0 flex-1 items-center gap-2.5">
						<div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-md">
							<HeartIcon className="h-3.5 w-3.5" />
						</div>
						<div className="min-w-0 flex-1 space-y-0.5">
							<div className="text-foreground truncate text-[11px] leading-tight font-medium">
								Sensory Achievements
							</div>
							<div className="text-muted-foreground truncate text-[10px] leading-tight">
								Lifetime enhanced likes and unlocked milestone badges
							</div>
						</div>
					</div>

					<span className="text-foreground shrink-0 font-mono text-[11px] font-semibold">
						{likesCount} likes
					</span>
				</div>
			</div>
		</div>
	);
});
