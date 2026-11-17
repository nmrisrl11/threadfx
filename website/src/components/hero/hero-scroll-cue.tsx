export function HeroScrollCue() {
	return (
		<div className="hero-scroll-cue flex shrink-0 flex-col items-center pt-8 pb-4">
			<a
				href="#simulator"
				aria-label="Scroll to interactive simulator"
				className="group text-muted-foreground hover:text-foreground flex flex-col items-center gap-2 transition-colors duration-200 select-none"
			>
				<span className="text-muted-foreground group-hover:text-foreground font-mono text-[11px] tracking-wider uppercase transition-colors">
					Try the Simulator
				</span>
				<div className="border-border flex h-7 w-4.5 items-start justify-center rounded-full border p-1">
					<span className="bg-foreground/60 h-1.5 w-1.5 animate-bounce rounded-full" />
				</div>
			</a>
		</div>
	);
}
