import { DataActionsCard } from "@/components/sidepanel/data/data-actions-card";
import { DataDockMonitor } from "@/components/sidepanel/data/data-dock-monitor";
import { DataHeader } from "@/components/sidepanel/data/data-header";
import { StorageBreakdownCard } from "@/components/sidepanel/data/storage-breakdown-card";
import { StorageMeterCard } from "@/components/sidepanel/data/storage-meter-card";
import { VersionUpdateCard } from "@/components/sidepanel/data/version-update-card";
import { useStorageTelemetry } from "@/hooks/use-storage-telemetry";

export function DataTab() {
	const {
		telemetry,
		loading,
		refresh,
		clearJuicedHistory,
		resetSettingsToDefault,
		resetLikesCounter,
	} = useStorageTelemetry();

	return (
		<div className="flex min-h-0 flex-1 flex-col justify-between">
			{/* 1. Fixed Context Header: Title */}
			<div className="shrink-0 pb-2.5">
				<DataHeader />
			</div>

			{/* 2. Scrollable Body: Visual Storage Meter, Breakdown, Actions & Updates */}
			<div className="min-h-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto pr-1">
				<StorageMeterCard telemetry={telemetry} loading={loading} />
				<StorageBreakdownCard telemetry={telemetry} loading={loading} />
				<DataActionsCard
					onClearHistory={clearJuicedHistory}
					onResetSettings={resetSettingsToDefault}
					onResetOdometer={resetLikesCounter}
				/>
				<VersionUpdateCard />
			</div>

			{/* 3. Docked Storage Monitor: Always pinned at bottom */}
			<div className="shrink-0 pt-2.5">
				<DataDockMonitor telemetry={telemetry} loading={loading} onRefresh={refresh} />
			</div>
		</div>
	);
}
