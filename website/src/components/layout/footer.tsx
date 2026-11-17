import { ThemeToggle } from "@/components/layout/theme-toggle";
import { APP_INFO } from "@data/app";
import { ArrowUpIcon, ArrowUpRightIcon } from "lucide-react";

interface FooterLink {
	label: string;
	href: string;
	isExternal?: boolean;
}

interface FooterSection {
	title: string;
	links: FooterLink[];
}

const FOOTER_SECTIONS: FooterSection[] = [
	{
		title: "Navigation",
		links: [
			{ label: "Simulator", href: "#simulator" },
			{ label: "Features", href: "#features" },
			{ label: "Milestones", href: "#milestones" },
			{ label: "Installation", href: "#install-guide" },
			{ label: "Download", href: "#download" },
		],
	},
	{
		title: "Project",
		links: [
			{ label: "GitHub Repository", href: APP_INFO.urls.repository, isExternal: true },
			{ label: "Releases & Updates", href: APP_INFO.urls.releases, isExternal: true },
			{ label: "Issue Tracker", href: APP_INFO.urls.issues, isExternal: true },
			{ label: "MIT License", href: APP_INFO.urls.license, isExternal: true },
		],
	},
];

export function Footer() {
	return (
		<footer className="border-border bg-background text-foreground border-t pt-16 pb-8 transition-colors sm:pt-20 lg:pt-24">
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				{/* Top Section: Brand Info on Left, 2-Column Product Navigation on Right */}
				<div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-16">
					{/* Brand Column */}
					<div className="flex max-w-sm flex-col gap-4">
						<span className="text-foreground text-xl font-extrabold tracking-tight">
							{APP_INFO.name}
						</span>

						<p className="text-muted-foreground text-sm leading-relaxed">
							Tactile micro-interactions, procedural Web Audio synthesis, and responsive particle
							physics for social feeds and modern web platforms.
						</p>

						<div className="mt-2 flex flex-col gap-1 text-xs">
							<span className="text-muted-foreground font-mono text-[11px] font-semibold tracking-wider uppercase">
								Created by
							</span>
							<a
								href={APP_INFO.author.url}
								target="_blank"
								rel="noreferrer"
								className="group text-foreground/80 hover:text-foreground inline-flex items-center gap-1 font-medium transition-colors"
							>
								<span>
									{APP_INFO.author.name} ({APP_INFO.author.handle})
								</span>
								<ArrowUpRightIcon className="text-muted-foreground group-hover:text-foreground size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</a>
						</div>
					</div>

					{/* Navigation Grid (Product & Open Source) */}
					<div className="grid grid-cols-2 gap-10 sm:gap-16 lg:gap-20">
						{FOOTER_SECTIONS.map((section) => (
							<div key={section.title} className="flex flex-col gap-3">
								<h3 className="text-foreground font-mono text-[11px] font-semibold tracking-wider uppercase">
									{section.title}
								</h3>
								<ul className="flex flex-col gap-2">
									{section.links.map((link) => (
										<li key={link.label}>
											<a
												href={link.href}
												{...(link.isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
												className="group text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
											>
												<span>{link.label}</span>
												{link.isExternal && (
													<ArrowUpRightIcon className="text-muted-foreground group-hover:text-foreground size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
												)}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				{/* Middle Row: Metadata, Transparency, Theme Toggle & Back to Top */}
				<div className="border-border text-muted-foreground mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8 text-xs">
					<div className="flex flex-wrap items-center gap-2">
						<span>{APP_INFO.name} © 2026</span>
						<span className="text-border">•</span>
						<span>100% Free &amp; Open Source ({APP_INFO.license})</span>
					</div>

					<div className="flex items-center gap-4">
						<span className="hidden sm:inline">100% private • Runs locally on your device</span>
						<span className="text-border hidden sm:inline">•</span>

						{/* Footer Theme Toggle */}
						<ThemeToggle size="sm" />

						<button
							type="button"
							onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
							className="group text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-1 transition-colors"
							title="Scroll to top"
						>
							<span>Back to top</span>
							<ArrowUpIcon className="text-muted-foreground group-hover:text-foreground size-3 transition-transform duration-200 group-hover:-translate-y-0.5" />
						</button>
					</div>
				</div>

				{/* Bottom Heroic Wordmark (Clean letter clearance, monochrome token) */}
				<div className="mt-14 w-full overflow-hidden pt-4 pb-2 select-none sm:mt-18 lg:mt-20">
					<svg
						viewBox="0 0 1200 170"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-foreground/[0.07] hover:text-foreground/[0.13] h-auto w-full transition-colors duration-700"
						aria-label={APP_INFO.name}
					>
						<text
							x="50%"
							y="78%"
							textAnchor="middle"
							className="fill-current font-extrabold uppercase"
							style={{
								fontSize: "156px",
								fontWeight: 900,
								letterSpacing: "0.035em",
								fontFamily:
									"'Plus Jakarta Sans Variable', 'Inter Variable', -apple-system, sans-serif",
							}}
						>
							THREADFX
						</text>
					</svg>
				</div>
			</div>
		</footer>
	);
}
