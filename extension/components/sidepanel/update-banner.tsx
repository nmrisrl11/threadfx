import { useUpdateCheck } from "@/hooks/use-update-check";
import { APP_INFO } from "@data/app";
import { ArrowUpCircleIcon, ArrowUpRightIcon, XIcon } from "lucide-react";
import { memo, useState } from "react";

export const UpdateBanner = memo(function UpdateBanner() {
	const { hasUpdate, latestVersion, downloadUrl } = useUpdateCheck();
	const [dismissed, setDismissed] = useState(false);

	if (!hasUpdate || dismissed) return null;

	const safeDownloadUrl = downloadUrl.startsWith("http")
		? downloadUrl
		: `${APP_INFO.urls.production}/download`;

	return (
		<div className="border-border bg-card/60 flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] shadow-xs transition-colors">
			<div className="flex min-w-0 items-center gap-1.5">
				<ArrowUpCircleIcon className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
				<span className="text-muted-foreground truncate text-[10px]">
					Update <span className="text-foreground font-mono font-medium">v{latestVersion}</span> is
					ready
				</span>
			</div>

			<div className="flex shrink-0 items-center gap-1.5">
				<a
					href={safeDownloadUrl}
					target="_blank"
					rel="noreferrer"
					className="border-border bg-card hover:bg-accent text-foreground inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium shadow-xs transition-colors duration-150 active:scale-[0.98]"
				>
					<span>Download</span>
					<ArrowUpRightIcon className="text-muted-foreground h-2.5 w-2.5" />
				</a>
				<button
					type="button"
					onClick={() => setDismissed(true)}
					title="Dismiss update notice"
					className="text-muted-foreground hover:text-foreground flex h-5 w-5 cursor-pointer items-center justify-center rounded-md transition-colors"
				>
					<XIcon className="h-3 w-3" />
				</button>
			</div>
		</div>
	);
});
