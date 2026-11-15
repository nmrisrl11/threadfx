import { cn } from "@/lib/utils";
import type { BurstMode } from "@data/particles";
import { PaletteIcon, SmileIcon } from "lucide-react";
import { memo } from "react";

interface ParticleModeToggleProps {
	burstMode: BurstMode;
	onSelectMode: (mode: BurstMode) => void;
}

export const ParticleModeToggle = memo(function ParticleModeToggle({
	burstMode,
	onSelectMode,
}: ParticleModeToggleProps) {
	return (
		<div className="border-border bg-surface-subtle grid grid-cols-2 rounded-xl border p-1 transition-colors select-none">
			<button
				type="button"
				onClick={() => onSelectMode("palette")}
				className={cn(
					"inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-none",
					burstMode === "palette"
						? "border-border bg-card text-foreground shadow-xs"
						: "text-muted-foreground hover:text-foreground border-transparent",
				)}
			>
				<PaletteIcon className="h-3.5 w-3.5 shrink-0" />
				<span className="truncate">Color Palettes</span>
			</button>

			<button
				type="button"
				onClick={() => onSelectMode("emoji")}
				className={cn(
					"inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-none",
					burstMode === "emoji"
						? "border-border bg-card text-foreground shadow-xs"
						: "text-muted-foreground hover:text-foreground border-transparent",
				)}
			>
				<SmileIcon className="h-3.5 w-3.5 shrink-0" />
				<span className="truncate">Emoji Reactions</span>
			</button>
		</div>
	);
});
