import { SunIcon, MoonIcon, MonitorIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-settings";
import type { ThemeMode } from "@/lib/storage";

const THEME_OPTIONS: Array<{
	id: ThemeMode;
	label: string;
	icon: typeof SunIcon;
}> = [
	{ id: "light", label: "Light theme", icon: SunIcon },
	{ id: "dark", label: "Dark theme", icon: MoonIcon },
	{ id: "system", label: "System preference", icon: MonitorIcon },
];

export function ThemeToggle() {
	const [currentTheme, setTheme] = useTheme();

	return (
		<div
			role="radiogroup"
			aria-label="Color theme"
			className="border-border bg-surface-subtle inline-flex items-center rounded-lg border p-0.5"
		>
			{THEME_OPTIONS.map(({ id, label, icon: Icon }) => {
				const isSelected = currentTheme === id;
				return (
					<button
						key={id}
						type="button"
						role="radio"
						aria-checked={isSelected}
						title={label}
						onClick={() => setTheme(id)}
						className={`focus-visible:ring-ring relative flex size-6 cursor-pointer items-center justify-center rounded-md transition-all duration-150 focus-visible:ring-1 focus-visible:outline-none ${
							isSelected
								? "bg-card text-foreground shadow-xs"
								: "text-muted-foreground hover:text-foreground"
						}`}
					>
						<Icon className="size-3.5" />
						<span className="sr-only">{label}</span>
					</button>
				);
			})}
		</div>
	);
}
