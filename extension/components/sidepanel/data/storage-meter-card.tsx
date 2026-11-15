import type { StorageTelemetry } from "@/lib/storage";
import { formatBytes } from "@/lib/storage";
import { HardDriveIcon } from "lucide-react";
import { memo } from "react";

interface StorageMeterCardProps {
	telemetry: StorageTelemetry | null;
	loading: boolean;
}

export const StorageMeterCard = memo(function StorageMeterCard({
	telemetry,
	loading,
}: StorageMeterCardProps) {
	const usedBytes = telemetry?.totalBytesUsed ?? 0;
	const quotaBytes = telemetry?.quotaBytes ?? 10485760;
	const remainingBytes = telemetry?.remainingBytes ?? quotaBytes - usedBytes;
	const percentUsed = telemetry?.percentUsed ?? (usedBytes / quotaBytes) * 100;

	// Clamp display bar width to at least 2% so small usage is visually noticeable
	const visualBarWidth = Math.min(100, Math.max(usedBytes > 0 ? 1.5 : 0, percentUsed));

	return (
		<div className="border-border bg-card/60 rounded-xl border p-3.5 shadow-xs transition-colors">
			{/* Top Metric Header */}
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0 flex-1 space-y-0.5">
					<div className="flex items-center gap-1.5">
						<HardDriveIcon className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
						<span className="text-foreground text-xs font-semibold tracking-tight">
							Storage Capacity
						</span>
					</div>
					<p className="text-muted-foreground text-[11px] leading-tight">
						On-device memory used for your settings and history
					</p>
				</div>

				{/* Health Status Pill */}
				<div className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-emerald-500 dark:text-emerald-400">
					<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
					<span className="font-mono text-[10px] font-medium">Optimal</span>
				</div>
			</div>

			{/* Primary Numerical Readouts */}
			<div className="border-border/60 mt-3 grid grid-cols-2 gap-3 border-t pt-3">
				<div className="min-w-0">
					<span className="text-muted-foreground block truncate text-[10px] font-medium tracking-wider uppercase">
						Storage Used
					</span>
					<div className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
						<span className="text-foreground font-mono text-base font-bold">
							{loading ? "..." : formatBytes(usedBytes)}
						</span>
						<span className="text-muted-foreground shrink-0 font-mono text-[10px]">
							({percentUsed < 0.1 ? "< 0.1%" : `${percentUsed.toFixed(1)}%`})
						</span>
					</div>
				</div>

				<div className="min-w-0 text-right">
					<span className="text-muted-foreground block truncate text-[10px] font-medium tracking-wider uppercase">
						Available Space
					</span>
					<div className="mt-0.5 flex flex-wrap items-baseline justify-end gap-x-1.5 gap-y-0.5">
						<span className="text-foreground font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">
							{loading ? "..." : formatBytes(remainingBytes)}
						</span>
						<span className="text-muted-foreground shrink-0 font-mono text-[10px]">free</span>
					</div>
				</div>
			</div>

			{/* Progress Meter Bar */}
			<div className="mt-2.5">
				<div className="bg-muted relative h-2 w-full overflow-hidden rounded-full">
					<div
						className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
						style={{ width: `${visualBarWidth}%` }}
					/>
				</div>
				<div className="text-muted-foreground mt-1.5 flex items-center justify-between font-mono text-[10px]">
					<span>0 B</span>
					<span>5.0 MB</span>
					<span>{formatBytes(quotaBytes)} Total</span>
				</div>
			</div>
		</div>
	);
});
