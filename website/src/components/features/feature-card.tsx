import { cn } from "@/lib/utils";
import type { ComponentType, ReactNode } from "react";

export interface FeatureCardProps {
	label: string;
	icon: ComponentType<{ className?: string }>;
	title: string;
	description: string;
	visual: ReactNode;
	colSpan?: 1 | 2;
	className?: string;
}

/**
 * Reusable parametric feature card primitive adhering to DRY and SRP.
 * Standardizes card chassis, header typography, visual exhibit slot, and footer hierarchy.
 */
export function FeatureCard({
	label,
	icon: Icon,
	title,
	description,
	visual,
	colSpan = 1,
	className,
}: FeatureCardProps) {
	return (
		<div
			className={cn(
				"group flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#0e0e12]/75 p-5 backdrop-blur-md transition-[border-color,background-color] duration-150 hover:border-white/15 hover:bg-[#121217]/90",
				colSpan === 2 ? "lg:col-span-2" : "lg:col-span-1",
				className,
			)}
		>
			{/* Card Header Strip */}
			<div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
				<Icon className="size-3.5 text-zinc-400" />
				<span>{label}</span>
			</div>

			{/* Card Center Visual Exhibit */}
			<div className="my-6">{visual}</div>

			{/* Card Footer Copy */}
			<div className="space-y-1">
				<h3 className="text-base font-bold tracking-tight text-white">{title}</h3>
				<p className="text-xs leading-relaxed text-zinc-400 sm:text-[13px]">{description}</p>
			</div>
		</div>
	);
}
