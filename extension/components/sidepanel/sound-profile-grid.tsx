import { memo, useCallback } from "react";
import { Play, Check, CircleDot } from "lucide-react";
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
					? "border border-white/20 bg-white/[0.07] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
					: "border border-white/[0.05] bg-white/[0.02] text-zinc-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
			}`}
		>
			<div className="mb-2 flex w-full items-center justify-between">
				<div className="flex items-center gap-1.5 text-zinc-400 transition-colors group-hover:text-zinc-200">
					<CircleDot className="h-3.5 w-3.5" />
				</div>
				{isSelected ? (
					<span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950">
						<Check className="h-2.5 w-2.5 stroke-[3]" />
					</span>
				) : (
					<span className="text-zinc-500 transition-colors group-hover:text-zinc-300">
						<Play className="h-3 w-3 fill-current opacity-60" />
					</span>
				)}
			</div>
			<span className="block text-xs font-semibold tracking-tight text-zinc-100">{pack.name}</span>
			<span className="mt-0.5 line-clamp-1 text-[10px] leading-snug text-zinc-400">
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
				<span className="text-xs font-medium text-zinc-400">Sound Profile</span>
				<span className="text-[10px] text-zinc-500">Tap to audition</span>
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
