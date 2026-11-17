import { FeatureCard } from "@/components/features/feature-card";
import { AnimatedContent } from "@/components/ui/animated-content";
import { LayersIcon, LaptopIcon, ShieldCheckIcon, SparklesIcon, ZapIcon } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

interface FeatureItem {
	id: string;
	label: string;
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	colSpan: 1 | 2;
	visual: ReactNode;
}

const FEATURE_ITEMS: FeatureItem[] = [
	{
		id: "audio",
		label: "Sound Effects",
		icon: ZapIcon,
		colSpan: 2,
		title: "Instant, tactile clicks",
		description:
			"Pops, clicks, and chimes that play immediately as you tap, with zero lag and no downloads needed.",
		visual: (
			<div className="space-y-2">
				<div className="text-muted-foreground flex items-center justify-between font-mono text-[11px]">
					<span>Sound on tap</span>
					<span className="text-muted-foreground">Instant play</span>
				</div>
				<div
					aria-hidden="true"
					className="border-border bg-muted/40 flex h-12 items-end justify-between gap-1.5 rounded-lg border p-2"
				>
					{[30, 65, 95, 50, 80, 100, 75, 45, 85, 40, 60, 35, 70, 50, 90, 40].map((h, i) => (
						<span
							key={i}
							className="bg-foreground/25 group-hover:bg-foreground/45 w-full rounded-xs transition-all duration-200"
							style={{ height: `${h}%` }}
						/>
					))}
				</div>
			</div>
		),
	},
	{
		id: "particles",
		label: "Celebrations",
		icon: SparklesIcon,
		colSpan: 1,
		title: "Celebratory confetti bursts",
		description:
			"Every like and repost erupts into bright, celebratory sparks that float smoothly across your post.",
		visual: (
			<div aria-hidden="true" className="flex items-center justify-center">
				<div className="relative flex size-18 items-center justify-center">
					<span className="absolute size-3 rounded-full bg-rose-400/80 shadow-[0_0_12px_rgba(251,113,133,0.8)]" />
					<span className="bg-foreground absolute -top-1 -right-1 size-2 rounded-full shadow-xs" />
					<span className="absolute -bottom-1 -left-1 size-2 rounded-full bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
					<div className="border-border size-16 rounded-full border border-dashed" />
				</div>
			</div>
		),
	},
	{
		id: "sidepanel",
		label: "Side Panel",
		icon: LaptopIcon,
		colSpan: 1,
		title: "Always within reach",
		description:
			"Docks neatly beside your feed so you can test sounds or adjust volume anytime with a quick shortcut.",
		visual: (
			<div className="flex items-center justify-center">
				<div className="border-border bg-muted/40 flex w-full items-center justify-between rounded-lg border px-3.5 py-3 font-mono text-[11px]">
					<span className="text-muted-foreground">Keyboard shortcut</span>
					<div className="flex items-center gap-1">
						<kbd className="border-border bg-card text-foreground rounded border px-1.5 py-0.5 text-[10px] font-semibold shadow-xs">
							Alt
						</kbd>
						<span className="text-muted-foreground">+</span>
						<kbd className="border-border bg-card text-foreground rounded border px-1.5 py-0.5 text-[10px] font-semibold shadow-xs">
							Shift
						</kbd>
						<span className="text-muted-foreground">+</span>
						<kbd className="border-border bg-card text-foreground rounded border px-1.5 py-0.5 text-[10px] font-semibold shadow-xs">
							T
						</kbd>
					</div>
				</div>
			</div>
		),
	},
	{
		id: "privacy",
		label: "Your Privacy",
		icon: ShieldCheckIcon,
		colSpan: 2,
		title: "100% private to you",
		description:
			"Your likes, badges, and sound settings stay safely on your computer. Nothing is ever tracked or sent to a server.",
		visual: (
			<div className="space-y-2">
				<div className="text-muted-foreground flex items-center justify-between font-mono text-[11px]">
					<span>Never leaves your browser</span>
					<span className="font-semibold text-emerald-500">100% Private</span>
				</div>
				<div className="border-border bg-muted/40 flex h-12 items-center justify-between gap-3 rounded-lg border px-4 font-mono text-[11px]">
					<div className="text-foreground/90 flex items-center gap-2">
						<span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
						<span>On your device</span>
					</div>
					<div className="bg-border h-4 w-px" />
					<div className="text-muted-foreground">
						<span>No cookies</span>
					</div>
					<div className="bg-border h-4 w-px" />
					<div className="text-muted-foreground">
						<span>No tracking</span>
					</div>
					<div className="bg-border h-4 w-px" />
					<div className="text-muted-foreground">
						<span>Works offline</span>
					</div>
				</div>
			</div>
		),
	},
];

export function FeatureSection() {
	return (
		<section
			id="features"
			className="section-scroll-fade relative flex min-h-dvh w-full scroll-mt-24 flex-col items-center justify-center px-4 py-8 sm:scroll-mt-28 sm:px-6 sm:py-12"
		>
			<div className="my-auto w-full max-w-6xl">
				{/* Section Header (Symmetrical with SimulatorSection) */}
				<div className="mb-10 text-center">
					<div className="text-muted-foreground mb-2.5 flex items-center justify-center gap-1.5 font-mono text-[11px] tracking-wider uppercase">
						<LayersIcon aria-hidden="true" className="text-muted-foreground size-3.5" />
						<span>Core Architecture</span>
					</div>

					<h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-5xl">
						Feel every reaction.
					</h2>
					<p className="text-muted-foreground mx-auto mt-3 max-w-xl text-base leading-relaxed sm:text-lg">
						Satisfying clicks, celebratory confetti bursts, and simple controls — completely private
						on your device.
					</p>
				</div>

				{/* Staggered Feature Cards Grid (Symmetrical with Simulator Aesthetics) */}
				<AnimatedContent
					distance={0}
					scale={0.85}
					blur={6}
					duration={0.9}
					ease="power3.out"
					stagger={0.08}
					threshold={0.1}
					once={false}
					className="grid grid-cols-1 gap-4 lg:grid-cols-3"
				>
					{FEATURE_ITEMS.map((item) => (
						<FeatureCard
							key={item.id}
							label={item.label}
							icon={item.icon}
							title={item.title}
							description={item.description}
							visual={item.visual}
							colSpan={item.colSpan}
						/>
					))}
				</AnimatedContent>
			</div>
		</section>
	);
}
