import { memo, useCallback } from "react";
import { PlayIcon, CheckIcon, CircleDotIcon } from "lucide-react";
import { SOUND_PACK_LIST } from "@/lib/presets";
import type { SoundPack } from "@/lib/presets";

interface SoundPackCardProps {
	pack: SoundPack;
	isSelected: boolean;
	onSelect: (packId: SoundPack["id"]) => void;
	onPreview: (pack: SoundPack) => void;
}

const SoundPackCard = memo(function SoundPackCard({
	pack,
	isSelected,
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
			className={`group relative flex flex-col justify-between rounded-xl p-2.5 text-left transition-all duration-150 active:scale-[0.98] ${
				isSelected
					? "border-foreground/20 bg-surface-muted text-foreground border shadow-xs"
					: "border-border bg-surface-subtle text-muted-foreground hover:border-foreground/15 hover:bg-surface-muted hover:text-foreground border"
			}`}
		>
			<div className="mb-2 flex w-full items-center justify-between">
				<div className="text-muted-foreground group-hover:text-foreground flex items-center gap-1.5 transition-colors">
					<CircleDotIcon className="h-3.5 w-3.5" />
				</div>
				{isSelected ? (
					<span className="bg-foreground text-background flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
						<CheckIcon className="h-2.5 w-2.5 stroke-[3]" />
					</span>
				) : (
					<span className="text-muted-foreground group-hover:text-foreground transition-colors">
						<PlayIcon className="h-3 w-3 fill-current opacity-60" />
					</span>
				)}
			</div>
			<span className="text-foreground block text-xs font-semibold tracking-tight">
				{pack.name}
			</span>
			<span className="text-muted-foreground mt-0.5 line-clamp-1 text-[10px] leading-snug">
				{pack.description}
			</span>
		</button>
	);
});

interface SoundProfileGridProps {
	selectedPackId: SoundPack["id"];
	onSelectPack: (packId: SoundPack["id"]) => void;
	onPreviewPack: (pack: SoundPack) => void;
}

export function SoundProfileGrid({
	selectedPackId,
	onSelectPack,
	onPreviewPack,
}: SoundProfileGridProps) {
	return (
		<section className="space-y-2">
			<div className="flex items-center justify-between px-0.5">
				<span className="text-muted-foreground text-xs font-medium">Sound Profile</span>
				<span className="text-muted-foreground/80 text-[10px]">Tap to audition</span>
			</div>

			<div className="grid grid-cols-2 gap-2">
				{SOUND_PACK_LIST.map((pack) => (
					<SoundPackCard
						key={pack.id}
						pack={pack}
						isSelected={selectedPackId === pack.id}
						onSelect={onSelectPack}
						onPreview={onPreviewPack}
					/>
				))}
			</div>
		</section>
	);
}
