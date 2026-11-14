import { Switch } from "@/components/ui/switch";
import { useMasterToggle } from "@/hooks/use-settings";
import { APP_INFO } from "@data/app";

export function SidepanelHeader() {
	const [enabled, toggleEnabled] = useMasterToggle();

	return (
		<header className="flex items-center justify-between px-1 pt-0.5 pb-2.5">
			<div className="flex items-center gap-2.5">
				<img
					src="/icon/512.png"
					alt={APP_INFO.name}
					className="h-7 max-h-7 w-7 max-w-7 shrink-0 object-contain select-none"
					loading="eager"
					decoding="async"
				/>
				<span className="font-heading text-sm font-semibold tracking-tight text-zinc-100">
					{APP_INFO.name}
				</span>
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
