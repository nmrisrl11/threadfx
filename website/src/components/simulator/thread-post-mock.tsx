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
				<span className="text-muted-foreground font-mono text-[11px] tracking-wider uppercase">
					Social Feed Preview
				</span>
				<div className="text-muted-foreground flex items-center gap-1.5 font-mono text-[10px]">
					<span className="size-1.5 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none" />
					<span>Interactive Stage</span>
				</div>
			</div>

			{/* Centerpiece Post Card */}
			<div className="border-border bg-card/90 shadow-chassis relative rounded-2xl border p-5.5 backdrop-blur-md transition-all sm:p-6.5">
				{/* Post Header with 3D Brand Emblem */}
				<div className="flex items-center gap-3">
					<div className="relative size-10 shrink-0 select-none">
						<picture>
							<source srcSet="/icons/512.webp" type="image/webp" />
							<img
								src="/icons/128.png"
								alt={`${APP_INFO.name} profile emblem`}
								title={`${APP_INFO.name} profile emblem`}
								width={40}
								height={40}
								className="size-full rounded-xl object-contain filter-(--drop-shadow-icon)"
							/>
						</picture>
					</div>
					<div>
						<div className="flex items-center gap-1.5">
							<span className="text-foreground text-sm font-bold tracking-tight">
								{APP_INFO.name}
							</span>
							<span className="text-muted-foreground text-xs">•</span>
							<span className="text-muted-foreground text-xs">Just now</span>
						</div>
						<span className="text-muted-foreground font-mono text-xs">@{APP_INFO.slug}</span>
					</div>
				</div>

				{/* Post Body: Engaging Human Copywriting */}
				<p className="text-foreground/90 mt-4 text-sm leading-relaxed sm:text-[15px]">
					Most social feeds feel flat and silent. We built {APP_INFO.name} to bring tactile physical
					clicks and celebratory bursts to every reaction. Tap the heart or repost to feel it!
				</p>

				{/* Action Bar */}
				<div className="border-border mt-5 flex items-center gap-6 border-t pt-3.5">
					{/* Like Heart Button with Tactile Spring Micro-Motion */}
					<button
						type="button"
						onClick={onLike}
						className="group focus-visible:ring-ring -m-1 flex cursor-pointer items-center gap-2 rounded-lg p-1 transition-transform duration-150 ease-(--ease-spring) select-none focus-visible:ring-2 focus-visible:outline-none active:scale-[0.88]"
						aria-label={isLiked ? "Unlike post" : "Like post"}
						aria-pressed={isLiked}
					>
						<HeartIcon
							aria-hidden="true"
							className={`size-5 transition-[color,fill,transform] duration-150 ${
								isLiked
									? "scale-110 fill-[#ff2e93] text-[#ff2e93]"
									: "text-muted-foreground group-hover:text-foreground"
							}`}
						/>
						<span
							className={`font-mono text-xs font-semibold transition-colors ${
								isLiked ? "text-[#ff2e93]" : "text-muted-foreground group-hover:text-foreground"
							}`}
						>
							{likeCount}
						</span>
					</button>

					{/* Reply Button */}
					<div className="text-muted-foreground flex items-center gap-1.5 text-xs select-none">
						<MessageCircleIcon aria-hidden="true" className="size-4" />
						<span className="font-mono">18</span>
					</div>

					{/* Repost Button */}
					<button
						type="button"
						onClick={onRepost}
						className="group text-muted-foreground focus-visible:ring-ring -m-1 flex cursor-pointer items-center gap-1.5 rounded-lg p-1 text-xs transition-colors duration-150 select-none hover:text-emerald-500 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.88]"
						aria-label="Repost post"
					>
						<RepeatIcon aria-hidden="true" className="size-4" />
						<span className="font-mono transition-colors duration-150">{repostCount}</span>
					</button>

					{/* Share Button */}
					<div className="text-muted-foreground flex items-center gap-1.5 text-xs select-none">
						<Share2Icon aria-hidden="true" className="size-4" />
						<span className="font-mono">12</span>
					</div>
				</div>

				{/* Micro-Affordance Prompt */}
				<div className="border-border/60 text-muted-foreground mt-4 border-t pt-2.5 text-center font-mono text-[10px] select-none">
					Tap the heart or repost to test your active sound &amp; particle settings
				</div>
			</div>
		</div>
	);
}
