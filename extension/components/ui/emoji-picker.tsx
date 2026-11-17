import { cn } from "@/lib/utils";
import {
	type EmojiPickerListCategoryHeaderProps,
	type EmojiPickerListEmojiProps,
	type EmojiPickerListRowProps,
	EmojiPicker as EmojiPickerPrimitive,
} from "frimousse";
import { LoaderIcon, SearchIcon } from "lucide-react";
import type { ComponentProps } from "react";

function EmojiPicker({ className, ...props }: ComponentProps<typeof EmojiPickerPrimitive.Root>) {
	return (
		<EmojiPickerPrimitive.Root
			className={cn(
				"bg-popover text-popover-foreground isolate flex h-full w-full flex-col overflow-hidden rounded-xl",
				className,
			)}
			data-slot="emoji-picker"
			{...props}
		/>
	);
}

function EmojiPickerSearch({
	className,
	...props
}: ComponentProps<typeof EmojiPickerPrimitive.Search>) {
	return (
		<div
			className={cn("border-border flex h-9 items-center gap-2 border-b px-3", className)}
			data-slot="emoji-picker-search-wrapper"
		>
			<SearchIcon className="size-3.5 shrink-0 opacity-50" />
			<EmojiPickerPrimitive.Search
				className="placeholder:text-muted-foreground flex h-9 w-full rounded-md bg-transparent py-2 text-xs outline-none disabled:cursor-not-allowed disabled:opacity-50"
				data-slot="emoji-picker-search"
				{...props}
			/>
		</div>
	);
}

function EmojiPickerRow({ children, ...props }: EmojiPickerListRowProps) {
	return (
		<div {...props} className="scroll-my-1 px-1" data-slot="emoji-picker-row">
			{children}
		</div>
	);
}

function EmojiPickerEmoji({ emoji, className, ...props }: EmojiPickerListEmojiProps) {
	return (
		<button
			type="button"
			{...props}
			className={cn(
				"hover:bg-accent data-active:bg-accent flex size-7 cursor-pointer items-center justify-center rounded-md text-base transition-colors",
				className,
			)}
			data-slot="emoji-picker-emoji"
		>
			{emoji.emoji}
		</button>
	);
}

function EmojiPickerCategoryHeader({ category, ...props }: EmojiPickerListCategoryHeaderProps) {
	return (
		<div
			{...props}
			className="bg-popover text-muted-foreground px-3 pt-3 pb-1.5 text-[11px] leading-none font-medium"
			data-slot="emoji-picker-category-header"
		>
			{category.label}
		</div>
	);
}

function EmojiPickerContent({
	className,
	...props
}: ComponentProps<typeof EmojiPickerPrimitive.Viewport>) {
	return (
		<EmojiPickerPrimitive.Viewport
			className={cn("relative flex-1 outline-none", className)}
			data-slot="emoji-picker-viewport"
			{...props}
		>
			<EmojiPickerPrimitive.Loading
				className="text-muted-foreground absolute inset-0 flex items-center justify-center"
				data-slot="emoji-picker-loading"
			>
				<LoaderIcon className="size-4 animate-spin" />
			</EmojiPickerPrimitive.Loading>
			<EmojiPickerPrimitive.Empty
				className="text-muted-foreground absolute inset-0 flex items-center justify-center text-xs"
				data-slot="emoji-picker-empty"
			>
				No emoji found.
			</EmojiPickerPrimitive.Empty>
			<EmojiPickerPrimitive.List
				className="pb-1 select-none"
				components={{
					Row: EmojiPickerRow,
					Emoji: EmojiPickerEmoji,
					CategoryHeader: EmojiPickerCategoryHeader,
				}}
				data-slot="emoji-picker-list"
			/>
		</EmojiPickerPrimitive.Viewport>
	);
}

function EmojiPickerFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			className={cn("border-border flex w-full min-w-0 items-center gap-1 border-t p-2", className)}
			data-slot="emoji-picker-footer"
			{...props}
		>
			<EmojiPickerPrimitive.ActiveEmoji>
				{({ emoji }) =>
					emoji ? (
						<>
							<div className="flex size-6 flex-none items-center justify-center text-base">
								{emoji.emoji}
							</div>
							<span className="text-secondary-foreground truncate font-mono text-[11px]">
								{emoji.label}
							</span>
						</>
					) : (
						<span className="text-muted-foreground ml-1 flex h-6 items-center truncate text-[11px]">
							Select an emoji...
						</span>
					)
				}
			</EmojiPickerPrimitive.ActiveEmoji>
		</div>
	);
}

export { EmojiPicker, EmojiPickerSearch, EmojiPickerContent, EmojiPickerFooter };
