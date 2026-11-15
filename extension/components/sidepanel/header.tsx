import { Switch } from "@/components/ui/switch";
import { useMasterToggle } from "@/hooks/use-settings";
import { cn } from "@/lib/utils";
import { APP_INFO } from "@data/app";

export function SidepanelHeader() {
	const [enabled, toggleEnabled] = useMasterToggle();

	return (
		<header className="flex items-center justify-between px-0.5 pt-0.5 pb-2">
			{/* Brand Identity */}
			<div className="flex items-center gap-2.5">
				<img
					src="/icon/512.png"
					alt={APP_INFO.name}
					className="h-7 w-7 shrink-0 rounded-lg object-contain shadow-xs select-none"
					loading="eager"
					decoding="async"
				/>
				<div className="flex items-baseline gap-1.5">
					<span className="font-heading text-foreground text-sm font-bold tracking-tight">
						{APP_INFO.name}
					</span>
					<span className="text-muted-foreground/60 font-mono text-[9px] tracking-wide uppercase">
						v{APP_INFO.version}
					</span>
				</div>
			</div>

			{/* Master Power Module */}
			<div
				className={cn(
					"border-border bg-surface-subtle flex items-center gap-2 rounded-full border py-1 pr-1.5 pl-2.5 transition-colors",
					!enabled && "opacity-75",
				)}
			>
				<span className="relative flex h-2 w-2">
					<span
						className={cn(
							"absolute inline-flex h-full w-full rounded-full transition-opacity duration-150",
							enabled ? "animate-ping bg-emerald-400 opacity-75" : "opacity-0",
						)}
					/>
					<span
						className={cn(
							"relative inline-flex h-2 w-2 rounded-full transition-colors duration-200",
							enabled
								? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
								: "bg-muted-foreground/40",
						)}
					/>
				</span>
				<span className="text-foreground font-mono text-[11px] font-medium tracking-tight">
					{enabled ? "Active" : "Paused"}
				</span>
				<Switch checked={enabled} onCheckedChange={toggleEnabled} className="scale-90" />
			</div>
		</header>
	);
}
