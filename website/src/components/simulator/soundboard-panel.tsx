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
				<div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
					<MusicIcon className="size-3.5 text-zinc-400" />
					<span>Soundboard Keybed</span>
				</div>
				<div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
					<span>Tap keys</span>
					<kbd className="rounded border border-white/10 bg-white/5 px-1 py-0.5 font-mono text-[9px] text-zinc-400">
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
							className={cn(
								// Constant 1px border geometry and color-only transition to eliminate layout shift
								"group relative flex cursor-pointer flex-col justify-between rounded-xl border p-2.5 text-left transition-colors duration-150 outline-none select-none",
								// Surface & border tones
								isSelected
									? "border-white/30 bg-[#17171d] text-white shadow-xs"
									: "border-white/[0.07] bg-[#101014] text-zinc-300 hover:border-white/20 hover:bg-[#141419] hover:text-white",
								// Tactile mouse-down feedback without scale or translation shift
								"active:bg-[#1c1c23]",
								// Visual flash when pressed via keyboard shortcut
								isPhysicallyPressed && "border-white/40 bg-[#22222a] text-white",
							)}
						>
							{/* Keycap Top: Key number badge & acoustic frequency tag */}
							<div className="flex w-full items-center justify-between">
								<kbd
									className={cn(
										"rounded border px-1.5 py-0.5 font-mono text-[9px] transition-colors duration-150",
										isSelected
											? "border-white/30 bg-white/15 font-bold text-white"
											: "border-white/10 bg-white/5 text-zinc-400 group-hover:text-zinc-200",
									)}
								>
									{index + 1}
								</kbd>
								<span className="font-mono text-[9px] text-zinc-500">
									{pack.frequency ? `${pack.frequency}Hz` : "FX"}
								</span>
							</div>

							{/* Keycap Bottom: Profile Name & Permanent Indicator Slot */}
							<div className="mt-3 flex items-center justify-between gap-1">
								<span
									className={cn(
										"truncate text-xs font-semibold tracking-tight transition-colors duration-150",
										isSelected ? "text-white" : "text-zinc-300 group-hover:text-white",
									)}
								>
									{pack.name}
								</span>
								{/* Permanent indicator slot to eliminate flexbox layout shift */}
								<span
									className={cn(
										"size-1.5 shrink-0 rounded-full transition-opacity duration-150",
										isSelected
											? "bg-white opacity-100 shadow-[0_0_6px_rgba(255,255,255,0.6)]"
											: "opacity-0",
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
