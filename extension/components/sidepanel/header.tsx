import { Switch } from "@/components/ui/switch";
import { useMasterToggle } from "@/hooks/use-settings";

export function SidepanelHeader() {
	const [enabled, toggleEnabled] = useMasterToggle();

	return (
		<header className="flex items-center justify-between px-1 pt-0.5 pb-2.5">
			<div className="flex items-center gap-2.5">
				<img
					src="/icon/32.png"
					alt="ThreadFX"
					className="h-6 w-6 shrink-0 rounded-md object-contain"
				/>
				<div className="flex items-center gap-1.5">
					<span className="font-heading text-sm font-semibold tracking-tight text-zinc-100">
						ThreadFX
					</span>
					<span className="rounded border border-white/[0.06] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
						v1.0.0
					</span>
				</div>
			</div>

			{/* Master Switch with Status Indicator */}
			<div className="flex items-center gap-2">
				<span className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-400">
					<span
						className={`h-1.5 w-1.5 rounded-full transition-colors ${
							enabled ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-zinc-600"
						}`}
					/>
					{enabled ? "Active" : "Paused"}
				</span>
				<Switch checked={enabled} onCheckedChange={toggleEnabled} />
			</div>
		</header>
	);
}
