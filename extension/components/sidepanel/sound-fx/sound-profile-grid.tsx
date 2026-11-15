import { cn } from "@/lib/utils";
import type { SoundCategory, SoundPack, SoundPackId } from "@data/presets";
import { SOUND_PACK_LIST } from "@data/presets";
import { CheckIcon, PlayIcon } from "lucide-react";
import { memo, useCallback, useMemo } from "react";

interface SoundPackCardProps {
	pack: SoundPack;
	isSelected: boolean;
	hotkeyIndex?: number;
	onSelect: (packId: SoundPackId) => void;
	onPreview: (pack: SoundPack) => void;
}

const SoundPackCard = memo(function SoundPackCard({
	pack,
	isSelected,
	hotkeyIndex,
	onSelect,
	onPreview,
}: SoundPackCardProps) {
	const handleClick = useCallback(() => {
		onSelect(pack.id);
		onPreview(pack);
	}, [onSelect, onPreview, pack]);

	return (
		<button
			type="button"
			onClick={handleClick}
			className={cn(
				"group focus-visible:ring-ring relative flex cursor-pointer flex-col justify-between rounded-xl border p-2.5 text-left transition-colors duration-150 focus-visible:ring-1 focus-visible:outline-none",
				isSelected
					? "border-foreground/30 bg-surface-muted text-foreground"
					: "border-border bg-surface-subtle text-muted-foreground hover:border-foreground/20 hover:bg-surface-muted hover:text-foreground",
			)}
		>
			<div className="mb-2 flex w-full items-center justify-between">
				<div className="flex items-center gap-1.5">
					<span className="text-muted-foreground/60 font-mono text-[10px] tracking-tight">
						{pack.frequency}Hz
					</span>
					{hotkeyIndex !== undefined && (
						<kbd className="border-border/60 bg-surface-subtle text-muted-foreground/50 rounded border px-1 py-0.5 font-mono text-[9px] leading-none">
							{hotkeyIndex}
						</kbd>
					)}
				</div>
				<div className="flex h-4 w-4 shrink-0 items-center justify-center">
					{isSelected ? (
						<span className="bg-foreground text-background flex h-4 w-4 items-center justify-center rounded-full">
							<CheckIcon className="h-2.5 w-2.5 stroke-[3]" />
						</span>
					) : (
						<PlayIcon className="text-muted-foreground group-hover:text-foreground h-3 w-3 fill-current opacity-60 transition-colors group-hover:opacity-100" />
					)}
				</div>
			</div>
			<div>
				<span className="text-foreground block text-xs font-semibold tracking-tight">
					{pack.name}
				</span>
				<span className="text-muted-foreground mt-0.5 line-clamp-1 text-[10px] leading-snug">
					{pack.description}
				</span>
			</div>
		</button>
	);
});

interface SoundProfileGridProps {
	selectedPackId: SoundPackId;
	activeCategory: "all" | SoundCategory;
	onSelectPack: (packId: SoundPackId) => void;
	onPreviewPack: (pack: SoundPack) => void;
}

export const SoundProfileGrid = memo(function SoundProfileGrid({
	selectedPackId,
	activeCategory,
	onSelectPack,
	onPreviewPack,
}: SoundProfileGridProps) {
	const filteredPacks = useMemo(() => {
		if (activeCategory === "all") return SOUND_PACK_LIST;
		return SOUND_PACK_LIST.filter((pack) => pack.category === activeCategory);
	}, [activeCategory]);

	return (
		<div className="@container/grid">
			<div className="grid grid-cols-2 gap-2 @[440px]/grid:grid-cols-3 @[640px]/grid:grid-cols-4">
				{filteredPacks.map((pack) => {
					const packIndex = SOUND_PACK_LIST.findIndex((p) => p.id === pack.id);
					const hotkeyIndex = packIndex >= 0 && packIndex < 8 ? packIndex + 1 : undefined;
					return (
						<SoundPackCard
							key={pack.id}
							pack={pack}
							isSelected={selectedPackId === pack.id}
							hotkeyIndex={hotkeyIndex}
							onSelect={onSelectPack}
							onPreview={onPreviewPack}
						/>
					);
				})}
			</div>
		</div>
	);
});
