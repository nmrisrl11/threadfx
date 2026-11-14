import { ExternalLink } from "lucide-react";
import { APP_INFO } from "@data/app";

interface SidepanelFooterProps {
	authorHandle?: string;
	threadsUrl?: string;
	repoUrl?: string;
	websiteUrl?: string;
	version?: string;
}

export function SidepanelFooter({
	authorHandle = APP_INFO.author.handle,
	threadsUrl = APP_INFO.author.url,
	repoUrl = APP_INFO.urls.repository,
	websiteUrl = APP_INFO.urls.production,
	version = APP_INFO.versionTag,
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
					{APP_INFO.license}
				</a>
				<span>•</span>
				<span className="font-mono text-zinc-500">{version}</span>
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
