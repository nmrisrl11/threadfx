import { cn } from "@/lib/utils";
import type { SoundCategory, SoundPackId } from "@data/presets";
import { DEFAULT_SOUND_PACK, SOUND_CATEGORIES } from "@data/presets";
import { RotateCcwIcon } from "lucide-react";
import { memo } from "react";

interface SoundProfileHeaderProps {
	selectedPackId: SoundPackId;
	activeCategory: "all" | SoundCategory;
	onSelectCategory: (category: "all" | SoundCategory) => void;
	onResetPack: () => void;
}

export const SoundProfileHeader = memo(function SoundProfileHeader({
	selectedPackId,
	activeCategory,
	onSelectCategory,
	onResetPack,
}: SoundProfileHeaderProps) {
	return (
		<div className="flex flex-wrap items-center justify-between gap-1.5 px-0.5">
			{/* Sound Profile Title & Contextual Reset */}
			<div className="flex items-center gap-1.5">
				<span className="text-muted-foreground text-xs font-medium">Sound Profile</span>
				{selectedPackId !== DEFAULT_SOUND_PACK && (
					<button
						type="button"
						onClick={onResetPack}
						title="Reset to default preset (Bubble Pop)"
						className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-0.5 font-mono text-[10px] transition-colors"
					>
						<RotateCcwIcon className="h-2.5 w-2.5" />
						<span>Reset</span>
					</button>
				)}
			</div>

			{/* Category Filter Pills */}
			<div className="flex items-center gap-1">
				{SOUND_CATEGORIES.map((cat) => {
					const isCatActive = activeCategory === cat.id;
					return (
						<button
							key={cat.id}
							type="button"
							onClick={() => onSelectCategory(cat.id)}
							className={cn(
								"cursor-pointer rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors duration-150 select-none",
								isCatActive
									? "bg-foreground text-background"
									: "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
							)}
						>
							{cat.label}
						</button>
					);
				})}
			</div>
		</div>
	);
});
