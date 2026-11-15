import { APP_INFO } from "@data/app";
import { CompassIcon, ExternalLinkIcon } from "lucide-react";
import { useCallback } from "react";

export function PlatformStandbyBanner() {
	const handleLaunchThreads = useCallback(() => {
		if (typeof chrome !== "undefined" && chrome.tabs?.create) {
			chrome.tabs.create({ url: "https://threads.com" });
		} else {
			window.open("https://threads.com", "_blank", "noreferrer");
		}
	}, []);

	return (
		<div className="border-border bg-surface-subtle flex flex-col gap-2 rounded-xl border p-2.5 text-xs transition-colors">
			<div className="flex items-start justify-between gap-2">
				<div className="flex items-center gap-2">
					<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-400">
						<CompassIcon className="h-3.5 w-3.5" />
					</div>
					<div>
						<span className="text-foreground block text-xs font-semibold tracking-tight">
							Standing By for Threads
						</span>
						<span className="text-muted-foreground block text-[10px] leading-tight">
							In-feed audio & particle FX activate automatically on threads.com
						</span>
					</div>
				</div>

				<button
					type="button"
					onClick={handleLaunchThreads}
					className="border-border text-foreground hover:border-foreground/40 hover:bg-surface-muted inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2 py-1 font-mono text-[10px] font-medium transition-colors"
				>
					<span>Open</span>
					<ExternalLinkIcon className="h-2.5 w-2.5" />
				</button>
			</div>

			<div className="border-border/60 text-muted-foreground/70 border-t pt-1.5 text-[10px]">
				You can still audition all {APP_INFO.name} sound profiles and tune particle physics below.
			</div>
		</div>
	);
}
