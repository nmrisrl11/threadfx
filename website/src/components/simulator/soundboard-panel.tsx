import { AnimatedContent } from "@/components/ui/animated-content";
import { cn } from "@/lib/utils";
import type { SoundPackId } from "@data/presets";
import { SOUND_PACK_LIST } from "@data/presets";
import { MusicIcon } from "lucide-react";

interface SoundboardPanelProps {
	selectedPack: SoundPackId;
	onSelectPack: (packId: SoundPackId) => void;
	pressedKeyIndex?: number | null;
}

export function SoundboardPanel({
	selectedPack,
	onSelectPack,
	pressedKeyIndex,
}: SoundboardPanelProps) {
	return (
		<div className="w-full space-y-2.5">
			{/* Sound Deck Header Strip - Animated on scroll */}
			<AnimatedContent
				distance={0}
				scale={0.85}
				blur={6}
				duration={0.9}
				ease="power3.out"
				stagger={0.08}
				threshold={0.1}
				once={false}
				className="flex items-center justify-between px-1"
			>
				<div className="text-muted-foreground flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase">
					<MusicIcon aria-hidden="true" className="text-muted-foreground size-3.5" />
					<span>Soundboard Keybed</span>
				</div>
				<div className="text-muted-foreground flex items-center gap-1.5 font-mono text-[10px]">
					<span>Tap keys</span>
					<kbd className="border-border bg-muted text-muted-foreground rounded border px-1 py-0.5 font-mono text-[9px]">
						1–8
					</kbd>
					<span>or click pads</span>
				</div>
			</AnimatedContent>

			{/* 8-Key Mechanical Keycap Strip - Staggered via AnimatedContent */}
			<AnimatedContent
				distance={0}
				scale={0.85}
				blur={6}
				duration={0.9}
				ease="power3.out"
				stagger={0.04}
				threshold={0.1}
				once={false}
				delay={0.15}
				className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8"
			>
				{SOUND_PACK_LIST.map((pack, index) => {
					const isSelected = selectedPack === pack.id;
					const isPhysicallyPressed = pressedKeyIndex === index;

					return (
						<button
							key={pack.id}
							type="button"
							onClick={() => onSelectPack(pack.id)}
							aria-label={`Audition ${pack.name} sound profile (Key ${index + 1})`}
							aria-pressed={isSelected}
							className={cn(
								// Constant 1px border geometry and color-only transition to eliminate layout shift
								"group focus-visible:ring-ring relative flex cursor-pointer flex-col justify-between rounded-xl border p-2.5 text-left transition-colors duration-150 select-none focus-visible:ring-2 focus-visible:outline-none",
								// Surface & border tones
								isSelected
									? "border-foreground/30 bg-accent text-foreground shadow-xs"
									: "border-border bg-card text-muted-foreground hover:border-foreground/20 hover:bg-accent/50 hover:text-foreground",
								// Tactile mouse-down feedback
								"active:bg-accent/80",
								// Visual flash when pressed via keyboard shortcut
								isPhysicallyPressed && "border-foreground/40 bg-accent text-foreground",
							)}
						>
							{/* Keycap Top: Key number badge & acoustic frequency tag */}
							<div className="flex w-full items-center justify-between">
								<kbd
									className={cn(
										"rounded border px-1.5 py-0.5 font-mono text-[9px] transition-colors duration-150",
										isSelected
											? "border-foreground/30 bg-foreground/10 text-foreground font-bold"
											: "border-border bg-muted/60 text-muted-foreground group-hover:text-foreground",
									)}
								>
									{index + 1}
								</kbd>
								<span className="text-muted-foreground font-mono text-[9px]">
									{pack.frequency ? `${pack.frequency}Hz` : "FX"}
								</span>
							</div>

							{/* Keycap Bottom: Profile Name & Permanent Indicator Slot */}
							<div className="mt-3 flex items-center justify-between gap-1">
								<span
									className={cn(
										"truncate text-xs font-semibold tracking-tight transition-colors duration-150",
										isSelected
											? "text-foreground"
											: "text-muted-foreground group-hover:text-foreground",
									)}
								>
									{pack.name}
								</span>
								{/* Permanent indicator slot to eliminate flexbox layout shift */}
								<span
									aria-hidden="true"
									className={cn(
										"size-1.5 shrink-0 rounded-full transition-opacity duration-150",
										isSelected ? "bg-foreground opacity-100 shadow-xs" : "opacity-0",
									)}
								/>
							</div>
						</button>
					);
				})}
			</AnimatedContent>
		</div>
	);
}
