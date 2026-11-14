import { ExternalLink } from "lucide-react";

interface SidepanelFooterProps {
	authorHandle?: string;
	threadsUrl?: string;
	repoUrl?: string;
	websiteUrl?: string;
}

export function SidepanelFooter({
	authorHandle = "@nmrisrl",
	threadsUrl = "https://threads.com/@nmrisrl",
	repoUrl = "https://github.com/nmrisrl11/threadfx",
	websiteUrl = "https://threadfx.nmrisrl.dev",
}: SidepanelFooterProps) {
	return (
		<footer className="flex items-center justify-between px-1 pt-2.5 pb-0.5 text-[11px] text-zinc-500">
			<div className="flex items-center gap-1.5">
				<a
					href={threadsUrl}
					target="_blank"
					rel="noreferrer"
					className="transition-colors hover:text-zinc-300"
				>
					Built by <span className="font-medium text-zinc-400">{authorHandle}</span>
				</a>
				<span>•</span>
				<a
					href={repoUrl}
					target="_blank"
					rel="noreferrer"
					className="transition-colors hover:text-zinc-300"
				>
					MIT
				</a>
			</div>

			<a
				href={websiteUrl}
				target="_blank"
				rel="noreferrer"
				className="flex items-center gap-1 text-zinc-400 transition-colors hover:text-zinc-200"
			>
				<span>Website</span>
				<ExternalLink className="h-3 w-3" />
			</a>
		</footer>
	);
}
