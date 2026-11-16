import { HeartIcon, MessageCircleIcon, RepeatIcon, Share2Icon } from "lucide-react";
import React from "react";

interface ThreadPostMockProps {
	isLiked: boolean;
	likeCount: number;
	repostCount: number;
	onLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onRepost: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ThreadPostMock({
	isLiked,
	likeCount,
	repostCount,
	onLike,
	onRepost,
}: ThreadPostMockProps) {
	return (
		<div className="flex flex-col justify-center">
			<div className="mb-3 flex items-center justify-between">
				<span className="text-muted-foreground font-mono text-[11px] font-semibold tracking-wider uppercase">
					Live Social Feed Rig
				</span>
				<span className="text-muted-foreground/60 font-mono text-[10px]">Interactive Reaction</span>
			</div>

			<div className="relative rounded-2xl border border-white/8 bg-[#09090B] p-5 shadow-xl sm:p-6">
				{/* Post Header */}
				<div className="flex items-center gap-3">
					<div className="text-foreground flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#2A2A2E] to-[#18181A] text-sm font-bold ring-1 ring-white/10">
						N
					</div>
					<div>
						<div className="flex items-center gap-1.5">
							<span className="text-foreground text-sm font-bold">nmrisrl</span>
							<span className="text-muted-foreground text-xs">• 2h</span>
						</div>
						<span className="text-muted-foreground text-xs">Creator of ThreadFX</span>
					</div>
				</div>

				{/* Post Content */}
				<p className="mt-4 text-sm leading-relaxed text-[#EDEDED]">
					Testing tactile social interactions! Liking or reposting this thread triggers zero-latency
					procedural sound synthesis, particle dynamics, and responsive micro-motion. Try tapping
					the heart or repost below!
				</p>

				{/* Action Bar */}
				<div className="mt-5 flex items-center gap-6 border-t border-white/8 pt-3">
					{/* Like Heart Button */}
					<button
						type="button"
						onClick={onLike}
						className="group flex cursor-pointer items-center gap-2 transition-transform duration-150 ease-[var(--ease-out)] select-none active:scale-95"
						aria-label={isLiked ? "Unlike" : "Like"}
					>
						<HeartIcon
							className={`h-5 w-5 transition-all duration-150 ${
								isLiked
									? "scale-110 fill-[#FF2E93] text-[#FF2E93] drop-shadow-[0_0_12px_#FF2E93]"
									: "text-muted-foreground group-hover:text-foreground"
							}`}
						/>
						<span
							className={`font-mono text-xs font-semibold ${
								isLiked ? "text-[#FF2E93]" : "text-muted-foreground"
							}`}
						>
							{likeCount}
						</span>
					</button>

					{/* Reply Button */}
					<div className="text-muted-foreground flex items-center gap-1.5 text-xs">
						<MessageCircleIcon className="h-4 w-4" />
						<span className="font-mono">18</span>
					</div>

					{/* Repost Button */}
					<button
						type="button"
						onClick={onRepost}
						className="group text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 text-xs transition-colors select-none active:scale-95"
						aria-label="Repost"
					>
						<RepeatIcon className="h-4 w-4 transition-transform group-hover:rotate-45" />
						<span className="font-mono">{repostCount}</span>
					</button>

					{/* Share Button */}
					<div className="text-muted-foreground flex items-center gap-1.5 text-xs">
						<Share2Icon className="h-4 w-4" />
						<span className="font-mono">12</span>
					</div>
				</div>
			</div>
		</div>
	);
}
