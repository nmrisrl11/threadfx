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
				"group border-border bg-card/75 shadow-card hover:shadow-chassis hover:border-foreground/20 hover:bg-card/90 flex flex-col justify-between rounded-2xl border p-5 backdrop-blur-md transition-all duration-150",
				colSpan === 2 ? "lg:col-span-2" : "lg:col-span-1",
				className,
			)}
		>
			{/* Card Header Strip */}
			<div className="text-muted-foreground flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase">
				<Icon aria-hidden="true" className="text-muted-foreground size-3.5" />
				<span>{label}</span>
			</div>

			{/* Card Center Visual Exhibit */}
			<div className="my-6">{visual}</div>

			{/* Card Footer Copy */}
			<div className="space-y-1">
				<h3 className="text-foreground text-base font-bold tracking-tight">{title}</h3>
				<p className="text-muted-foreground text-xs leading-relaxed sm:text-[13px]">
					{description}
				</p>
			</div>
		</div>
	);
}
