import { APP_INFO } from "@data/app";
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
		<div className="w-full max-w-lg select-none">
			{/* Live Stage Label */}
			<div className="mb-2.5 flex items-center justify-between px-1">
				<span className="font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
					Social Feed Preview
				</span>
				<div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
					<span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
					<span>Interactive Stage</span>
				</div>
			</div>

			{/* Centerpiece Post Card */}
			<div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0d]/90 p-5.5 backdrop-blur-md transition-all sm:p-6.5">
				{/* Post Header with 3D Brand Emblem */}
				<div className="flex items-center gap-3">
					<div className="relative size-10 shrink-0 select-none">
						<picture>
							<source srcSet="/icons/512.webp" type="image/webp" />
							<img
								src="/icons/128.png"
								alt={APP_INFO.name}
								width={40}
								height={40}
								className="size-full rounded-xl object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
							/>
						</picture>
					</div>
					<div>
						<div className="flex items-center gap-1.5">
							<span className="text-sm font-bold tracking-tight text-white">{APP_INFO.name}</span>
							<span className="text-xs text-zinc-500">•</span>
							<span className="text-xs text-zinc-500">Just now</span>
						</div>
						<span className="font-mono text-xs text-zinc-500">@{APP_INFO.slug}</span>
					</div>
				</div>

				{/* Post Body: Engaging Human Copywriting */}
				<p className="mt-4 text-sm leading-relaxed text-zinc-200 sm:text-[15px]">
					Most social feeds feel flat and silent. We built {APP_INFO.name} to bring tactile physical
					clicks and celebratory bursts to every reaction. Tap the heart or repost to feel it!
				</p>

				{/* Action Bar */}
				<div className="mt-5 flex items-center gap-6 border-t border-white/[0.08] pt-3.5">
					{/* Like Heart Button with Tactile Spring Micro-Motion */}
					<button
						type="button"
						onClick={onLike}
						className="group flex cursor-pointer items-center gap-2 transition-transform duration-150 ease-[var(--ease-spring)] outline-none select-none active:scale-[0.88]"
						aria-label={isLiked ? "Unlike post" : "Like post"}
					>
						<HeartIcon
							className={`size-5 transition-[color,fill,transform] duration-150 ${
								isLiked
									? "scale-110 fill-[#ff2e93] text-[#ff2e93]"
									: "text-zinc-400 group-hover:text-white"
							}`}
						/>
						<span
							className={`font-mono text-xs font-semibold transition-colors ${
								isLiked ? "text-[#ff2e93]" : "text-zinc-400 group-hover:text-white"
							}`}
						>
							{likeCount}
						</span>
					</button>

					{/* Reply Button */}
					<div className="flex items-center gap-1.5 text-xs text-zinc-500 select-none">
						<MessageCircleIcon className="size-4" />
						<span className="font-mono">18</span>
					</div>

					{/* Repost Button */}
					<button
						type="button"
						onClick={onRepost}
						className="group flex cursor-pointer items-center gap-1.5 text-xs text-zinc-400 transition-colors duration-150 outline-none select-none hover:text-emerald-400 active:scale-[0.88]"
						aria-label="Repost post"
					>
						<RepeatIcon className="size-4" />
						<span className="font-mono transition-colors duration-150">{repostCount}</span>
					</button>

					{/* Share Button */}
					<div className="flex items-center gap-1.5 text-xs text-zinc-500 select-none">
						<Share2Icon className="size-4" />
						<span className="font-mono">12</span>
					</div>
				</div>

				{/* Micro-Affordance Prompt */}
				<div className="mt-4 border-t border-white/[0.04] pt-2.5 text-center font-mono text-[10px] text-zinc-500 select-none">
					Tap the heart or repost to test your active sound & particle settings
				</div>
			</div>
		</div>
	);
}
