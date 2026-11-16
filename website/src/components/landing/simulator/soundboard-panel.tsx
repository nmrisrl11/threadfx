import type { SoundPackId } from "@data/presets";
import { SOUND_PACK_LIST } from "@data/presets";
import { CheckIcon } from "lucide-react";

interface SoundboardPanelProps {
	selectedPack: SoundPackId;
	onSelectPack: (packId: SoundPackId) => void;
}

export function SoundboardPanel({ selectedPack, onSelectPack }: SoundboardPanelProps) {
	return (
		<div className="space-y-2.5">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground font-mono text-[11px] font-semibold tracking-wider uppercase">
					Sound Profile
				</span>
				<span className="text-muted-foreground/60 font-mono text-[10px]">Keyboard [1–8]</span>
			</div>

			<div className="grid grid-cols-2 gap-2">
				{SOUND_PACK_LIST.map((pack, index) => {
					const isSelected = selectedPack === pack.id;
					return (
						<button
							key={pack.id}
							type="button"
							onClick={() => onSelectPack(pack.id)}
							className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border p-2.5 text-left transition-[transform,background-color,border-color] duration-150 ease-[var(--ease-out)] select-none active:scale-[0.97] ${
								isSelected
									? "border-[#FF2E93] bg-[#161618] shadow-sm shadow-[#FF2E93]/15"
									: "border-white/8 bg-[#0D0D0F] hover:border-white/16 hover:bg-[#121214]"
							}`}
						>
							<div className="flex w-full items-center justify-between">
								<div className="flex items-center gap-1.5">
									<kbd className="text-muted-foreground rounded border border-white/10 bg-white/4 px-1 py-0.5 font-mono text-[9px]">
										{index + 1}
									</kbd>
									<span className="text-muted-foreground/60 font-mono text-[10px]">
										{pack.frequency}Hz
									</span>
								</div>
								{isSelected ? (
									<CheckIcon className="h-3 w-3 text-[#FF2E93]" />
								) : (
									<span className="h-1.5 w-1.5 rounded-full bg-white/10 group-hover:bg-white/20" />
								)}
							</div>
							<div className="text-foreground mt-2 text-xs font-semibold">{pack.name}</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
