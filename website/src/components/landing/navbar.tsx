import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { APP_INFO } from "@data/app";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";

export function Navbar() {
	return (
		<header className="bg-background/80 sticky top-0 z-50 border-b border-white/8 backdrop-blur-md transition-colors">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
				{/* Brand Mark */}
				<a
					href="#"
					className="group flex items-center gap-3 transition-transform active:scale-[0.98]"
				>
					<img
						src="/icons/128.png"
						alt={APP_INFO.name}
						width="32"
						height="32"
						className="h-8 w-8 rounded-lg object-contain shadow-sm shadow-[#FF2E93]/20 transition-transform select-none group-hover:scale-105"
						loading="eager"
						decoding="async"
					/>
					<div className="flex items-center gap-2">
						<span className="text-foreground text-base font-bold tracking-tight">
							{APP_INFO.name}
						</span>
						<Badge variant="cyber" className="hidden sm:inline-flex">
							{APP_INFO.versionTag}
						</Badge>
					</div>
				</a>

				{/* Navigation Links */}
				<nav className="hidden items-center gap-6 md:flex">
					<a
						href="#simulator"
						className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
					>
						Simulator
					</a>
					<a
						href="#features"
						className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
					>
						Architecture
					</a>
					<a
						href="#milestones"
						className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
					>
						Juicer Ranks
					</a>
					<a
						href="#install-guide"
						className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
					>
						Install
					</a>
				</nav>

				{/* Action Area */}
				<div className="flex items-center gap-3">
					<a
						href={APP_INFO.urls.repository}
						target="_blank"
						rel="noreferrer"
						className="text-muted-foreground hover:text-foreground hidden items-center gap-1.5 text-xs transition-colors sm:flex"
					>
						<span>GitHub</span>
						<ExternalLinkIcon className="h-3 w-3" />
					</a>

					<Button asChild size="sm" variant="gradient">
						<a href={APP_INFO.urls.download}>
							<DownloadIcon className="h-3.5 w-3.5" />
							<span>Download</span>
							<kbd className="hidden rounded bg-black/20 px-1 py-0.5 font-mono text-[9px] font-normal sm:inline-block">
								.zip
							</kbd>
						</a>
					</Button>
				</div>
			</div>
		</header>
	);
}
