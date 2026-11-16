import { APP_INFO } from "@data/app";

export function Footer() {
	return (
		<footer className="text-muted-foreground border-t border-white/8 bg-[#09090B] py-12 text-xs transition-colors">
			<div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
				<div className="flex flex-wrap items-center justify-center gap-2 text-center sm:justify-start">
					<span>{APP_INFO.name} © 2026</span>
					<span className="text-white/20">•</span>
					<a
						href={APP_INFO.urls.license}
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						Open Source ({APP_INFO.license})
					</a>
					<span className="text-white/20">•</span>
					<span>
						Crafted by{" "}
						<a
							href={APP_INFO.author.url}
							target="_blank"
							rel="noreferrer"
							className="text-foreground font-medium hover:underline"
						>
							{APP_INFO.author.name} ({APP_INFO.author.handle})
						</a>
					</span>
				</div>

				<div className="flex items-center gap-5">
					<a
						href={APP_INFO.urls.repository}
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						GitHub
					</a>
					<a
						href={APP_INFO.urls.threads}
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						Threads
					</a>
					<a
						href={APP_INFO.urls.license}
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						License
					</a>
					<a href={APP_INFO.urls.download} className="font-mono text-[#00F5FF] hover:underline">
						Download .zip
					</a>
				</div>
			</div>
		</footer>
	);
}
