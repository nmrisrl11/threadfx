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
		<footer className="text-muted-foreground/80 flex items-center justify-between px-1 pt-2.5 pb-0.5 text-[11px]">
			<div className="flex items-center gap-1.5">
				<a
					href={threadsUrl}
					target="_blank"
					rel="noreferrer"
					className="hover:text-foreground transition-colors"
				>
					Built by <span className="text-muted-foreground font-medium">{authorHandle}</span>
				</a>
				<span>•</span>
				<a
					href={repoUrl}
					target="_blank"
					rel="noreferrer"
					className="hover:text-foreground transition-colors"
				>
					{APP_INFO.license}
				</a>
				<span>•</span>
				<span className="text-muted-foreground/80 font-mono">{version}</span>
			</div>

			<a
				href={websiteUrl}
				target="_blank"
				rel="noreferrer"
				className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
			>
				<span>Website</span>
				<ExternalLink className="h-3 w-3" />
			</a>
		</footer>
	);
}
