import { type ThemeMode, useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

const THEME_OPTIONS: Array<{
	id: ThemeMode;
	label: string;
	icon: typeof SunIcon;
}> = [
	{ id: "light", label: "Light theme", icon: SunIcon },
	{ id: "dark", label: "Dark theme", icon: MoonIcon },
	{ id: "system", label: "System preference", icon: MonitorIcon },
];

interface ThemeToggleProps {
	className?: string;
	size?: "sm" | "default";
}

export function ThemeToggle({ className, size = "default" }: ThemeToggleProps) {
	const [currentTheme, setTheme] = useTheme();

	const isSmall = size === "sm";

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		const currentIndex = THEME_OPTIONS.findIndex((opt) => opt.id === currentTheme);
		if (currentIndex === -1) return;

		let nextIndex = currentIndex;
		if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			e.preventDefault();
			nextIndex = (currentIndex + 1) % THEME_OPTIONS.length;
		} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			e.preventDefault();
			nextIndex = (currentIndex - 1 + THEME_OPTIONS.length) % THEME_OPTIONS.length;
		} else {
			return;
		}

		setTheme(THEME_OPTIONS[nextIndex].id);
	};

	return (
		<div
			role="radiogroup"
			aria-label="Color theme"
			onKeyDown={handleKeyDown}
			className={cn(
				"border-border bg-surface-subtle inline-flex items-center rounded-full border p-0.5 select-none",
				className,
			)}
		>
			{THEME_OPTIONS.map(({ id, label, icon: Icon }) => {
				const isSelected = currentTheme === id;
				return (
					<button
						key={id}
						type="button"
						role="radio"
						tabIndex={isSelected ? 0 : -1}
						aria-checked={isSelected}
						title={label}
						onClick={() => setTheme(id)}
						className={cn(
							"focus-visible:ring-ring relative flex cursor-pointer items-center justify-center rounded-full transition-all duration-150 select-none focus-visible:ring-2 focus-visible:outline-none active:scale-95",
							isSmall ? "size-6" : "size-7",
							isSelected
								? "bg-card text-foreground shadow-xs"
								: "text-muted-foreground hover:text-foreground",
						)}
					>
						<Icon aria-hidden="true" className={isSmall ? "size-3" : "size-3.5"} />
						<span className="sr-only">{label}</span>
					</button>
				);
			})}
		</div>
	);
}
