import { useUpdateCheck } from "@/hooks/use-update-check";
import { cn } from "@/lib/utils";
import { APP_INFO } from "@data/app";
import {
	ArrowDownToLineIcon,
	ArrowUpCircleIcon,
	CheckIcon,
	InfoIcon,
	RefreshCwIcon,
} from "lucide-react";
import { memo } from "react";

export const VersionUpdateCard = memo(function VersionUpdateCard() {
	const {
		currentVersion,
		latestVersion,
		hasUpdate,
		downloadUrl,
		isChecking,
		lastCheckedAt,
		checkForUpdate,
	} = useUpdateCheck();

	const safeDownloadUrl = downloadUrl.startsWith("http")
		? downloadUrl
		: `${APP_INFO.urls.production}/download`;

	const formattedLastCheck = lastCheckedAt
		? new Date(lastCheckedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
		: null;

	return (
		<div className="border-border bg-card/60 space-y-3 rounded-xl border p-3.5 shadow-xs transition-colors">
			{/* Header with Title and Check Action */}
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0 flex-1 space-y-0.5">
					<div className="flex items-center gap-1.5">
						<ArrowUpCircleIcon className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
						<h4 className="text-foreground text-xs font-semibold tracking-tight">App Updates</h4>
					</div>
					<p className="text-muted-foreground truncate text-[11px] leading-tight">
						{formattedLastCheck
							? `Checked today at ${formattedLastCheck}`
							: "Checks automatically in background"}
					</p>
				</div>

				<button
					type="button"
					onClick={() => checkForUpdate()}
					disabled={isChecking}
					className="border-border bg-card hover:bg-accent text-foreground inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md border px-2 py-1 font-mono text-[10px] font-medium shadow-xs transition-colors duration-150 active:scale-[0.98] disabled:opacity-50"
				>
					<RefreshCwIcon
						className={cn("h-3 w-3", isChecking && "text-muted-foreground animate-spin")}
					/>
					<span>{isChecking ? "Checking..." : "Check Now"}</span>
				</button>
			</div>

			{/* Status Row */}
			<div className="border-border/60 bg-surface-subtle flex items-center justify-between gap-3 rounded-lg border p-2.5 transition-colors">
				<div className="min-w-0 space-y-0.5">
					<span className="text-muted-foreground block text-[10px] font-medium tracking-wider uppercase">
						Current Version
					</span>
					<span className="text-foreground font-mono text-xs font-semibold">v{currentVersion}</span>
				</div>

				{hasUpdate ? (
					<div className="border-border bg-card text-foreground flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium shadow-xs">
						<ArrowUpCircleIcon className="text-muted-foreground h-3 w-3 shrink-0" />
						<span>v{latestVersion} Available</span>
					</div>
				) : (
					<div className="border-border bg-card text-muted-foreground flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-medium shadow-xs">
						<CheckIcon className="h-3 w-3" />
						<span>Up to Date</span>
					</div>
				)}
			</div>

			{/* Update Available Action Box */}
			{hasUpdate && (
				<div className="border-border/60 bg-surface-subtle space-y-3 rounded-lg border p-3 transition-colors">
					<div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
						<div className="min-w-0 space-y-0.5">
							<h5 className="text-foreground text-xs font-semibold tracking-tight">
								Version {latestVersion} is Ready
							</h5>
							<p className="text-muted-foreground text-[11px] leading-relaxed">
								Includes new sound effects, visual features, and performance polish.
							</p>
						</div>

						<a
							href={safeDownloadUrl}
							target="_blank"
							rel="noreferrer"
							className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-7 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md px-3 font-mono text-[10px] font-medium shadow-xs transition-colors duration-150 active:scale-[0.98]"
						>
							<ArrowDownToLineIcon className="h-3.5 w-3.5" />
							<span>Download v{latestVersion}</span>
						</a>
					</div>

					{/* 3-Step Simple Update Guide */}
					<div className="border-border bg-card/60 space-y-1.5 rounded-md border p-2.5 text-[11px]">
						<span className="text-foreground block text-[10px] font-semibold tracking-wider uppercase">
							How to update in 3 quick steps:
						</span>
						<ol className="text-muted-foreground list-inside list-decimal space-y-1 text-[10px]">
							<li>Download the new update package.</li>
							<li>Unzip and replace the files in your ThreadFX folder.</li>
							<li>
								Open{" "}
								<code className="text-foreground font-mono text-[10px]">chrome://extensions</code>{" "}
								and click the reload icon (
								<RefreshCwIcon className="inline h-2.5 w-2.5 align-baseline" />
								).
							</li>
						</ol>
					</div>
				</div>
			)}

			{/* Reassurance Footer */}
			<div className="text-muted-foreground flex items-start gap-2 pt-0.5">
				<InfoIcon className="text-muted-foreground/70 h-3.5 w-3.5 shrink-0 translate-y-0.5" />
				<p className="text-[10px] leading-relaxed">
					Your lifetime likes, unlocked achievement medals, and sound settings stay safely on your
					device and will never be lost during updates.
				</p>
			</div>
		</div>
	);
});
