import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { APP_INFO } from "@data/app";
import { ArrowUpIcon, ArrowUpRightIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

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

export const Footer = forwardRef<HTMLElement, ComponentPropsWithoutRef<"footer">>(function Footer(
	{ className, ...props },
	ref,
) {
	return (
		<footer
			ref={ref}
			className={cn(
				"bg-background text-foreground fixed right-0 bottom-0 left-0 z-0 min-h-[55vh] w-full overflow-hidden transition-colors select-text",
				className,
			)}
			{...props}
		>
			<div className="mx-auto flex h-full min-h-[55vh] max-w-6xl flex-col justify-between px-6 pt-10 pb-4 sm:px-8 sm:pt-12 sm:pb-6 lg:pt-14">
				{/* Top Section: Brand Info on Left, 2-Column Product Navigation on Right */}
				<div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-16">
					{/* Brand Column */}
					<div className="flex max-w-sm flex-col gap-4">
						<span className="text-foreground text-xl font-extrabold tracking-tight">
							{APP_INFO.name}
						</span>

						<p className="text-muted-foreground text-sm leading-relaxed">
							Tactile micro-interactions, procedural Web Audio synthesis, and responsive particle
							physics for social feeds and modern web platforms.
						</p>

						<div className="mt-1 flex flex-col gap-1 text-xs">
							<span className="text-muted-foreground font-mono text-[11px] font-semibold tracking-wider uppercase">
								Created by
							</span>
							<a
								href={APP_INFO.author.url}
								title={`${APP_INFO.author.name} on Threads (${APP_INFO.author.handle})`}
								target="_blank"
								rel="noreferrer noopener"
								className="group text-foreground/80 hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1 rounded-md px-1 py-0.5 font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
							>
								<span>
									{APP_INFO.author.name} ({APP_INFO.author.handle})
								</span>
								<ArrowUpRightIcon
									aria-hidden="true"
									className="text-muted-foreground group-hover:text-foreground size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
								/>
								<span className="sr-only"> (opens in new tab)</span>
							</a>
						</div>
					</div>

					{/* Navigation Grid (Product & Open Source) */}
					<div className="grid grid-cols-2 gap-10 sm:gap-16 lg:gap-20">
						{FOOTER_SECTIONS.map((section) => (
							<div key={section.title} className="flex flex-col gap-3">
								<h2 className="text-foreground font-mono text-[11px] font-semibold tracking-wider uppercase">
									{section.title}
								</h2>
								<ul className="flex flex-col gap-2">
									{section.links.map((link) => (
										<li key={link.label}>
											<a
												href={link.href}
												title={
													link.isExternal
														? `${link.label} (opens external link in new tab)`
														: `Navigate to ${link.label} section`
												}
												{...(link.isExternal
													? { target: "_blank", rel: "noreferrer noopener" }
													: {})}
												className="group text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
											>
												<span>{link.label}</span>
												{link.isExternal && (
													<>
														<ArrowUpRightIcon
															aria-hidden="true"
															className="text-muted-foreground group-hover:text-foreground size-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
														/>
														<span className="sr-only"> (opens in new tab)</span>
													</>
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
				<div className="border-border text-muted-foreground mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-xs sm:mt-14">
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
							className="group text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-0.5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
							title="Scroll to top"
							aria-label="Scroll to top of page"
						>
							<span>Back to top</span>
							<ArrowUpIcon
								aria-hidden="true"
								className="text-muted-foreground group-hover:text-foreground size-3 transition-transform duration-200 group-hover:-translate-y-0.5"
							/>
						</button>
					</div>
				</div>

				{/* Bottom Heroic Wordmark (Clean letter clearance, monochrome token) */}
				<div className="mt-8 w-full overflow-hidden pt-2 pb-1 select-none sm:mt-10 lg:mt-12">
					<svg
						viewBox="0 0 1200 170"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-foreground/[0.07] hover:text-foreground/13 h-auto w-full transition-colors duration-700"
						aria-hidden="true"
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
});
