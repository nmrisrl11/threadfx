import { CheckIcon, RotateCcwIcon, Trash2Icon, WrenchIcon, XIcon } from "lucide-react";
import { memo, useEffect, useState } from "react";

interface DataActionsCardProps {
	onClearHistory: () => Promise<void>;
	onResetSettings: () => Promise<void>;
	onResetOdometer: () => Promise<void>;
}

export const DataActionsCard = memo(function DataActionsCard({
	onClearHistory,
	onResetSettings,
	onResetOdometer,
}: DataActionsCardProps) {
	const [confirmClearHistory, setConfirmClearHistory] = useState(false);
	const [historyClearedSuccess, setHistoryClearedSuccess] = useState(false);

	const [confirmResetSettings, setConfirmResetSettings] = useState(false);
	const [settingsResetSuccess, setSettingsResetSuccess] = useState(false);

	const [confirmResetOdometer, setConfirmResetOdometer] = useState(false);
	const [odometerResetSuccess, setOdometerResetSuccess] = useState(false);

	// Auto-cancel confirmation state after 4 seconds
	useEffect(() => {
		if (confirmClearHistory) {
			const timer = setTimeout(() => setConfirmClearHistory(false), 4000);
			return () => clearTimeout(timer);
		}
	}, [confirmClearHistory]);

	useEffect(() => {
		if (confirmResetSettings) {
			const timer = setTimeout(() => setConfirmResetSettings(false), 4000);
			return () => clearTimeout(timer);
		}
	}, [confirmResetSettings]);

	useEffect(() => {
		if (confirmResetOdometer) {
			const timer = setTimeout(() => setConfirmResetOdometer(false), 4000);
			return () => clearTimeout(timer);
		}
	}, [confirmResetOdometer]);

	const handleClearHistory = async () => {
		if (!confirmClearHistory) {
			setConfirmClearHistory(true);
			return;
		}
		setConfirmClearHistory(false);
		await onClearHistory();
		setHistoryClearedSuccess(true);
		setTimeout(() => setHistoryClearedSuccess(false), 2000);
	};

	const handleResetSettings = async () => {
		if (!confirmResetSettings) {
			setConfirmResetSettings(true);
			return;
		}
		setConfirmResetSettings(false);
		await onResetSettings();
		setSettingsResetSuccess(true);
		setTimeout(() => setSettingsResetSuccess(false), 2000);
	};

	const handleResetOdometer = async () => {
		if (!confirmResetOdometer) {
			setConfirmResetOdometer(true);
			return;
		}
		setConfirmResetOdometer(false);
		await onResetOdometer();
		setOdometerResetSuccess(true);
		setTimeout(() => setOdometerResetSuccess(false), 2000);
	};

	return (
		<div className="border-border bg-card/60 space-y-3 rounded-xl border p-3.5 shadow-xs transition-colors">
			<div className="flex items-center gap-1.5">
				<WrenchIcon className="text-muted-foreground h-3.5 w-3.5" />
				<h4 className="text-foreground text-xs font-semibold tracking-tight">Data Management</h4>
			</div>

			<div className="space-y-2">
				{/* Action 1: Clear Liked Posts History */}
				<div className="border-border/60 bg-surface-subtle flex items-center justify-between gap-3 rounded-lg border p-2.5 transition-colors">
					<div className="min-w-0 flex-1 space-y-0.5">
						<div className="text-foreground text-[11px] leading-tight font-medium">
							Clear Liked Posts History
						</div>
						<div className="text-muted-foreground text-[10px] leading-tight">
							Allows previously liked posts to be enhanced and celebrated again
						</div>
					</div>

					{/* Fixed-width action container: Eliminates Layout Shifts (CLS = 0.00) */}
					<div className="flex w-29.5 shrink-0 items-center justify-end gap-1.5">
						{historyClearedSuccess ? (
							<div className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] font-medium text-emerald-500 transition-colors duration-150">
								<CheckIcon className="h-3 w-3" />
								<span>Cleared!</span>
							</div>
						) : confirmClearHistory ? (
							<>
								<button
									type="button"
									onClick={() => setConfirmClearHistory(false)}
									title="Cancel"
									className="text-muted-foreground hover:text-foreground hover:bg-accent flex size-6 cursor-pointer items-center justify-center rounded-md transition-colors duration-150 active:scale-[0.96]"
								>
									<XIcon className="h-3 w-3" />
								</button>
								<button
									type="button"
									onClick={handleClearHistory}
									className="bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] font-medium shadow-xs transition-colors duration-150 active:scale-[0.98]"
								>
									<Trash2Icon className="h-3 w-3" />
									<span>Confirm?</span>
								</button>
							</>
						) : (
							<button
								type="button"
								onClick={handleClearHistory}
								className="border-border bg-card hover:bg-accent text-foreground inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 font-mono text-[10px] font-medium transition-colors duration-150 active:scale-[0.98]"
							>
								<Trash2Icon className="h-3 w-3" />
								<span>Clear History</span>
							</button>
						)}
					</div>
				</div>

				{/* Action 2: Reset Preferences to Defaults */}
				<div className="border-border/60 bg-surface-subtle flex items-center justify-between gap-3 rounded-lg border p-2.5 transition-colors">
					<div className="min-w-0 flex-1 space-y-0.5">
						<div className="text-foreground text-[11px] leading-tight font-medium">
							Reset Preferences
						</div>
						<div className="text-muted-foreground text-[10px] leading-tight">
							Reverts sound packs, volume, pitch, and particles to factory defaults
						</div>
					</div>

					{/* Fixed-width action container: Eliminates Layout Shifts (CLS = 0.00) */}
					<div className="flex w-29.5 shrink-0 items-center justify-end gap-1.5">
						{settingsResetSuccess ? (
							<div className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] font-medium text-emerald-500 transition-colors duration-150">
								<CheckIcon className="h-3 w-3" />
								<span>Reset!</span>
							</div>
						) : confirmResetSettings ? (
							<>
								<button
									type="button"
									onClick={() => setConfirmResetSettings(false)}
									title="Cancel"
									className="text-muted-foreground hover:text-foreground hover:bg-accent flex size-6 cursor-pointer items-center justify-center rounded-md transition-colors duration-150 active:scale-[0.96]"
								>
									<XIcon className="h-3 w-3" />
								</button>
								<button
									type="button"
									onClick={handleResetSettings}
									className="bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] font-medium shadow-xs transition-colors duration-150 active:scale-[0.98]"
								>
									<RotateCcwIcon className="h-3 w-3" />
									<span>Confirm?</span>
								</button>
							</>
						) : (
							<button
								type="button"
								onClick={handleResetSettings}
								className="border-border bg-card hover:bg-accent text-foreground inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 font-mono text-[10px] font-medium transition-colors duration-150 active:scale-[0.98]"
							>
								<RotateCcwIcon className="h-3 w-3" />
								<span>Reset Settings</span>
							</button>
						)}
					</div>
				</div>

				{/* Action 3: Reset Like Counter */}
				<div className="border-border/60 bg-surface-subtle flex items-center justify-between gap-3 rounded-lg border p-2.5 transition-colors">
					<div className="min-w-0 flex-1 space-y-0.5">
						<div className="text-foreground text-[11px] leading-tight font-medium">
							Reset Like Counter
						</div>
						<div className="text-muted-foreground text-[10px] leading-tight">
							Resets your lifetime enhanced likes tally back to zero
						</div>
					</div>

					{/* Fixed-width action container: Eliminates Layout Shifts (CLS = 0.00) */}
					<div className="flex w-29.5 shrink-0 items-center justify-end gap-1.5">
						{odometerResetSuccess ? (
							<div className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 font-mono text-[10px] font-medium text-emerald-500 transition-colors duration-150">
								<CheckIcon className="h-3 w-3" />
								<span>Reset!</span>
							</div>
						) : confirmResetOdometer ? (
							<>
								<button
									type="button"
									onClick={() => setConfirmResetOdometer(false)}
									title="Cancel"
									className="text-muted-foreground hover:text-foreground hover:bg-accent flex size-6 cursor-pointer items-center justify-center rounded-md transition-colors duration-150 active:scale-[0.96]"
								>
									<XIcon className="h-3 w-3" />
								</button>
								<button
									type="button"
									onClick={handleResetOdometer}
									className="bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] font-medium shadow-xs transition-colors duration-150 active:scale-[0.98]"
								>
									<RotateCcwIcon className="h-3 w-3" />
									<span>Confirm?</span>
								</button>
							</>
						) : (
							<button
								type="button"
								onClick={handleResetOdometer}
								className="border-border bg-card hover:bg-accent text-foreground inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 font-mono text-[10px] font-medium transition-colors duration-150 active:scale-[0.98]"
							>
								<RotateCcwIcon className="h-3 w-3" />
								<span>Reset Counter</span>
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});
