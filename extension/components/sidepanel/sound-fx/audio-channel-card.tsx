import { Slider } from "@/components/ui/slider";
import { RotateCcwIcon } from "lucide-react";
import type { ReactNode } from "react";
import { memo } from "react";

interface AudioChannelCardProps {
	/** Icon element rendered on the left of the header */
	icon: ReactNode;
	/** Label text for this channel */
	label: string;
	/** Formatted value text (e.g. "50%" or "1.00x") */
	valueText: string;
	/** Controlled value array for the slider */
	value: number[];
	min: number;
	max: number;
	step: number;
	onValueChange: (vals: number[]) => void;
	/** Three boundary tick labels [min, center, max] */
	ticks: [string, string, string];
	/** Whether value deviates from default, triggering the reset button */
	isModified?: boolean;
	onReset?: () => void;
	resetTooltip?: string;
}

export const AudioChannelCard = memo(function AudioChannelCard({
	icon,
	label,
	valueText,
	value,
	min,
	max,
	step,
	onValueChange,
	ticks,
	isModified = false,
	onReset,
	resetTooltip = "Reset to default",
}: AudioChannelCardProps) {
	return (
		<div className="border-border bg-surface-subtle hover:border-foreground/20 flex flex-col justify-between gap-2.5 rounded-xl border p-3 transition-colors">
			{/* Channel Header: Icon, Label, Reset Button & Readout */}
			<div className="flex items-center justify-between text-xs">
				<div className="text-foreground flex items-center gap-2">
					{icon}
					<span className="text-xs font-medium">{label}</span>
				</div>
				<div className="flex items-center gap-1.5">
					{isModified && onReset && (
						<button
							type="button"
							onClick={onReset}
							title={resetTooltip}
							className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-0.5 font-mono text-[10px] transition-colors"
						>
							<RotateCcwIcon className="h-2.5 w-2.5" />
							<span>Reset</span>
						</button>
					)}
					<span className="text-muted-foreground font-mono text-[11px]">{valueText}</span>
				</div>
			</div>

			{/* Slider Control */}
			<Slider
				value={value}
				min={min}
				max={max}
				step={step}
				onValueChange={onValueChange}
				className="w-full py-1"
			/>

			{/* Three-Point Reference Scale */}
			<div className="text-muted-foreground/60 flex items-center justify-between font-mono text-[9px] tracking-tight">
				<span>{ticks[0]}</span>
				<span>{ticks[1]}</span>
				<span>{ticks[2]}</span>
			</div>
		</div>
	);
});
