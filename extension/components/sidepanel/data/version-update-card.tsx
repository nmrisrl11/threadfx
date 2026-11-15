import { useUpdateCheck } from "@/hooks/use-update-check";
import { cn } from "@/lib/utils";
import {
	ArrowDownToLineIcon,
	CheckCircle2Icon,
	InfoIcon,
	LaptopIcon,
	RefreshCwIcon,
	SparklesIcon,
} from "lucide-react";

export function VersionUpdateCard() {
	const {
		currentVersion,
		latestVersion,
		hasUpdate,
		downloadUrl,
		isChecking,
		lastCheckedAt,
		checkForUpdate,
	} = useUpdateCheck();

	const formattedLastCheck = lastCheckedAt
		? new Date(lastCheckedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
		: null;

	return (
		<div className="border-border bg-card space-y-3.5 rounded-2xl border p-4 shadow-xs">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2.5">
					<div className="border-border bg-surface-muted text-foreground flex h-8 w-8 items-center justify-center rounded-xl border">
						<LaptopIcon className="h-4 w-4" />
					</div>
					<div>
						<h3 className="text-foreground font-heading text-xs font-semibold tracking-tight">
							Version & Updates
						</h3>
						<p className="text-muted-foreground font-mono text-[10px]">
							{formattedLastCheck
								? `Checked today at ${formattedLastCheck}`
								: "Automatic 12h check"}
						</p>
					</div>
				</div>

				<button
					type="button"
					onClick={() => checkForUpdate()}
					disabled={isChecking}
					className="border-border bg-card hover:bg-accent text-foreground inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 font-mono text-[10px] font-medium transition-colors disabled:opacity-50"
				>
					<RefreshCwIcon className={cn("h-3 w-3", isChecking && "animate-spin text-emerald-400")} />
					<span>{isChecking ? "Checking..." : "Check Now"}</span>
				</button>
			</div>

			{/* Status Row */}
			<div className="border-border bg-surface-subtle flex items-center justify-between rounded-xl border px-3 py-2.5">
				<div className="space-y-0.5">
					<span className="text-muted-foreground block font-mono text-[10px] uppercase">
						Active Build
					</span>
					<span className="text-foreground font-mono text-xs font-semibold">v{currentVersion}</span>
				</div>

				{hasUpdate ? (
					<div className="border-accent-neon/30 bg-accent-neon/10 text-accent-neon flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium">
						<SparklesIcon className="h-3 w-3 animate-pulse" />
						<span>Update Available: v{latestVersion}</span>
					</div>
				) : (
					<div className="border-border bg-surface-muted text-muted-foreground flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px]">
						<CheckCircle2Icon className="h-3 w-3 text-emerald-400" />
						<span>Up to Date</span>
					</div>
				)}
			</div>

			{/* Update Available Action Box */}
			{hasUpdate && (
				<div className="border-accent-neon/20 bg-accent-neon/5 space-y-3 rounded-xl border p-3">
					<div className="flex items-center justify-between">
						<div>
							<h4 className="text-foreground font-heading text-xs font-bold">
								ThreadFX v{latestVersion} is Ready
							</h4>
							<p className="text-muted-foreground text-[11px] leading-relaxed">
								New sensory features and optimizations available.
							</p>
						</div>

						<a
							href={downloadUrl}
							target="_blank"
							rel="noreferrer"
							className="bg-brand-gradient flex h-8 items-center gap-1.5 rounded-lg px-3 font-mono text-[11px] font-semibold text-white shadow-xs transition-opacity hover:opacity-90"
						>
							<ArrowDownToLineIcon className="h-3.5 w-3.5" />
							<span>Download .zip</span>
						</a>
					</div>

					{/* 3-Step Overwrite Guide */}
					<div className="border-border bg-card/60 space-y-1.5 rounded-lg border p-2.5 text-[11px]">
						<span className="text-foreground block font-mono text-[10px] font-semibold uppercase">
							How to Apply (10 Seconds):
						</span>
						<ol className="text-muted-foreground list-inside list-decimal space-y-0.5">
							<li>Download the latest release archive.</li>
							<li>Extract and overwrite files in your existing folder.</li>
							<li>
								Click the reload icon (
								<RefreshCwIcon className="inline h-2.5 w-2.5 align-baseline" />) on
								chrome://extensions.
							</li>
						</ol>
					</div>
				</div>
			)}

			{/* Reassurance Footer */}
			<div className="text-muted-foreground flex items-start gap-2 pt-0.5">
				<InfoIcon className="h-3.5 w-3.5 shrink-0 translate-y-0.5 text-zinc-400" />
				<p className="text-[10px] leading-relaxed">
					Your lifetime odometer, unlocked 3D badges, and audio preferences are persisted safely in
					Chrome local storage and remain intact when updating.
				</p>
			</div>
		</div>
	);
}
