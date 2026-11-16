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
		<footer className="text-foreground border-t border-white/8 bg-[#080808] pt-16 pb-8 transition-colors sm:pt-20 lg:pt-24">
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				{/* Top Section: Brand Info on Left, 2-Column Product Navigation on Right */}
				<div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-16">
					{/* Brand Column */}
					<div className="flex max-w-sm flex-col gap-4">
						<span className="text-xl font-extrabold tracking-tight text-white">
							{APP_INFO.name}
						</span>

						<p className="text-sm leading-relaxed text-zinc-400">
							Tactile micro-interactions, procedural Web Audio synthesis, and responsive particle
							physics for social feeds and modern web platforms.
						</p>

						<div className="mt-2 flex flex-col gap-1 text-xs">
							<span className="font-mono text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
								Created by
							</span>
							<a
								href={APP_INFO.author.url}
								target="_blank"
								rel="noreferrer"
								className="group inline-flex items-center gap-1 font-medium text-zinc-300 transition-colors hover:text-white"
							>
								<span>
									{APP_INFO.author.name} ({APP_INFO.author.handle})
								</span>
								<ArrowUpRightIcon className="size-3 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
							</a>
						</div>
					</div>

					{/* Navigation Grid (Product & Open Source) */}
					<div className="grid grid-cols-2 gap-10 sm:gap-16 lg:gap-20">
						{FOOTER_SECTIONS.map((section) => (
							<div key={section.title} className="flex flex-col gap-3">
								<h3 className="font-mono text-[11px] font-semibold tracking-wider text-zinc-100 uppercase">
									{section.title}
								</h3>
								<ul className="flex flex-col gap-2">
									{section.links.map((link) => (
										<li key={link.label}>
											<a
												href={link.href}
												{...(link.isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
												className="group inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-white"
											>
												<span>{link.label}</span>
												{link.isExternal && (
													<ArrowUpRightIcon className="size-3 text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
												)}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				{/* Middle Row: Metadata, Transparency & Back to Top */}
				<div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-zinc-400">
					<div className="flex flex-wrap items-center gap-2">
						<span>{APP_INFO.name} © 2026</span>
						<span className="text-white/20">•</span>
						<span>100% Free &amp; Open Source ({APP_INFO.license})</span>
					</div>

					<div className="flex items-center gap-3 text-zinc-400">
						<span>100% private • Runs locally on your device</span>
						<span className="text-white/20">•</span>
						<button
							type="button"
							onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
							className="group inline-flex cursor-pointer items-center gap-1 text-zinc-400 transition-colors hover:text-white"
							title="Scroll to top"
						>
							<span>Back to top</span>
							<ArrowUpIcon className="size-3 text-zinc-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-white" />
						</button>
					</div>
				</div>

				{/* Bottom Heroic Wordmark (Inspired by footer31, with clean letter clearance) */}
				<div className="mt-14 w-full overflow-hidden pt-4 pb-2 select-none sm:mt-18 lg:mt-20">
					<svg
						viewBox="0 0 1200 170"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="h-auto w-full text-white/[0.07] transition-colors duration-700 hover:text-white/[0.13]"
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
