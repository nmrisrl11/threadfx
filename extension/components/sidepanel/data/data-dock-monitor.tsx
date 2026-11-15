import type { StorageTelemetry } from "@/lib/storage";
import { formatBytes } from "@/lib/storage";
import { RefreshCwIcon, ShieldCheckIcon } from "lucide-react";
import { memo } from "react";

interface DataDockMonitorProps {
	telemetry: StorageTelemetry | null;
	loading: boolean;
	onRefresh: () => void;
}

export const DataDockMonitor = memo(function DataDockMonitor({
	telemetry,
	loading,
	onRefresh,
}: DataDockMonitorProps) {
	const remainingBytes = telemetry?.remainingBytes ?? 10485760;

	return (
		<div className="@container/dock">
			<div className="border-border bg-card/80 flex items-center justify-between rounded-xl border px-3 py-2 text-xs shadow-xs backdrop-blur-xs transition-colors select-none">
				{/* Left: Hardware Status Indicator & Storage Label */}
				<div className="flex min-w-0 items-center gap-2">
					<div className="flex shrink-0 items-center gap-1.5">
						<span className="relative flex h-2 w-2">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
							<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
						</span>
						<span className="text-foreground truncate text-[11px] font-medium">
							On-Device Storage
						</span>
					</div>

					<div className="border-border/60 text-muted-foreground hidden shrink-0 items-center gap-1 border-l pl-2 font-mono text-[10px] @[300px]/dock:flex">
						<ShieldCheckIcon className="h-3 w-3 text-emerald-500" />
						<span>100% Private</span>
					</div>
				</div>

				{/* Right: Remaining Space Badge & Interactive Refresh */}
				<div className="flex shrink-0 items-center gap-2">
					<span className="text-muted-foreground hidden font-mono text-[10px] @[360px]/dock:inline">
						{loading ? "..." : `${formatBytes(remainingBytes)} free`}
					</span>

					<button
						type="button"
						onClick={onRefresh}
						disabled={loading}
						title="Sync storage telemetry"
						className="border-border/80 hover:bg-accent text-foreground flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 font-mono text-[10px] font-medium transition-colors duration-150 active:scale-[0.98] disabled:opacity-50"
					>
						<RefreshCwIcon className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
						<span>Sync</span>
					</button>
				</div>
			</div>
		</div>
	);
});
