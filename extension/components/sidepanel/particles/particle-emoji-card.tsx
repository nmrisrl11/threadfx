import {
	EmojiPicker,
	EmojiPickerContent,
	EmojiPickerFooter,
	EmojiPickerSearch,
} from "@/components/ui/emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { QUICK_EMOJIS } from "@data/particles";
import type { Emoji } from "frimousse";
import { SmilePlusIcon, SparklesIcon } from "lucide-react";
import { memo, useCallback, useState } from "react";

interface ParticleEmojiCardProps {
	selectedEmoji: string;
	onSelectEmoji: (emoji: string) => void;
	onPreviewEmoji: (emoji: string) => void;
}

export const ParticleEmojiCard = memo(function ParticleEmojiCard({
	selectedEmoji,
	onSelectEmoji,
	onPreviewEmoji,
}: ParticleEmojiCardProps) {
	const [popoverOpen, setPopoverOpen] = useState(false);

	const handleEmojiSelect = useCallback(
		(emoji: Emoji) => {
			onSelectEmoji(emoji.emoji);
			onPreviewEmoji(emoji.emoji);
			setPopoverOpen(false);
		},
		[onSelectEmoji, onPreviewEmoji],
	);

	const handleQuickSelect = useCallback(
		(emoji: string) => {
			onSelectEmoji(emoji);
			onPreviewEmoji(emoji);
		},
		[onSelectEmoji, onPreviewEmoji],
	);

	const handleAudition = useCallback(() => {
		onPreviewEmoji(selectedEmoji);
	}, [onPreviewEmoji, selectedEmoji]);

	return (
		<div className="border-border bg-surface-subtle @container/emoji-card rounded-xl border p-3 transition-colors">
			<div className="grid grid-cols-1 gap-3.5 @[520px]/emoji-card:grid-cols-2 @[520px]/emoji-card:items-center">
				{/* 1. Active Emoji Hero Tile (Order 1) */}
				<div className="order-1 flex items-center gap-3">
					<button
						type="button"
						onClick={handleAudition}
						aria-label={`Audition ${selectedEmoji} emoji reaction burst`}
						title="Click to audition burst"
						className="border-border bg-surface-muted hover:border-foreground/30 flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border text-2xl transition-colors duration-150 select-none focus-visible:outline-none"
					>
						{selectedEmoji}
					</button>

					<div className="flex min-w-0 flex-1 flex-col justify-center">
						<span className="text-foreground truncate text-xs font-semibold tracking-tight">
							Active Reaction Emoji
						</span>
						<span className="text-muted-foreground truncate text-[10px] leading-snug">
							Bursts outward on post likes
						</span>
						<span className="text-muted-foreground/60 mt-0.5 font-mono text-[9px]">
							Click badge to test burst
						</span>
					</div>
				</div>

				{/* 2. Quick Reactions Presets (Order 2 in compact, Right Column spanning 2 rows on wide) */}
				<div className="border-border/40 order-2 flex flex-col justify-between gap-2 border-t pt-3 @[520px]/emoji-card:row-span-2 @[520px]/emoji-card:border-t-0 @[520px]/emoji-card:border-l @[520px]/emoji-card:pt-0 @[520px]/emoji-card:pl-3.5">
					<div className="flex items-center justify-between px-0.5">
						<span className="text-muted-foreground/80 font-mono text-[10px]">Quick Reactions</span>
						<span className="text-muted-foreground/60 text-[9px]">Tap to activate</span>
					</div>

					<div className="grid grid-cols-4 gap-1.5">
						{QUICK_EMOJIS.map((emoji) => {
							const isSelected = selectedEmoji === emoji;
							return (
								<button
									key={emoji}
									type="button"
									onClick={() => handleQuickSelect(emoji)}
									aria-label={`Select ${emoji} reaction`}
									aria-pressed={isSelected}
									className={cn(
										"flex h-9 w-full cursor-pointer items-center justify-center rounded-lg border text-lg transition-colors duration-150 select-none focus-visible:outline-none",
										isSelected
											? "border-foreground/30 bg-surface-muted text-foreground"
											: "border-border bg-surface-subtle text-muted-foreground hover:border-foreground/20 hover:bg-surface-muted hover:text-foreground",
									)}
								>
									{emoji}
								</button>
							);
						})}
					</div>
				</div>

				{/* 3. Full Catalog Action Button (Order 3 in compact, Left Bottom on wide) */}
				<div className="order-3">
					<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
						<PopoverTrigger asChild>
							<button
								type="button"
								className="border-border bg-surface-muted hover:border-foreground/30 text-foreground flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-colors duration-150"
							>
								<SmilePlusIcon className="h-3.5 w-3.5 shrink-0" />
								<span className="truncate">Browse Full Emoji Catalog (3,000+)</span>
								<SparklesIcon className="text-muted-foreground/60 h-3 w-3 shrink-0" />
							</button>
						</PopoverTrigger>

						<PopoverContent
							align="center"
							sideOffset={8}
							className="border-border bg-popover z-50 w-72 overflow-hidden rounded-xl border p-0 shadow-xl"
						>
							<EmojiPicker
								onEmojiSelect={handleEmojiSelect}
								columns={8}
								className="h-80 w-full border-none shadow-none"
							>
								<EmojiPickerSearch placeholder="Search emoji..." />
								<EmojiPickerContent />
								<EmojiPickerFooter />
							</EmojiPicker>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	);
});
