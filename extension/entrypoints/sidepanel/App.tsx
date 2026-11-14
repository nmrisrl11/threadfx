import React, { useEffect, useState } from "react";
import {
	Volume2,
	VolumeX,
	Sparkles,
	Heart,
	Sliders as SlidersIcon,
	Check,
	ExternalLink,
} from "lucide-react";
import confetti from "canvas-confetti";
import { zzfx } from "@/lib/zzfx";
import { SOUND_PACKS } from "@/lib/presets";
import type { SoundPack } from "@/lib/presets";
import { getSettings, saveSettings, onSettingsChanged, DEFAULT_SETTINGS } from "@/lib/storage";
import type { ThreadFXSettings } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

export default function App() {
	const [settings, setSettings] = useState<ThreadFXSettings>(DEFAULT_SETTINGS);

	useEffect(() => {
		getSettings().then(setSettings);
		const cleanup = onSettingsChanged((updated) => {
			setSettings(updated);
		});
		return cleanup;
	}, []);

	const updateSetting = <K extends keyof ThreadFXSettings>(key: K, value: ThreadFXSettings[K]) => {
		const updated = { ...settings, [key]: value };
		setSettings(updated);
		saveSettings({ [key]: value });
	};

	const previewSound = (pack: SoundPack) => {
		if (!settings.enabled) return;
		zzfx(settings.volume, ...pack.params);
	};

	const testConfetti = () => {
		confetti({
			particleCount: 40,
			spread: 60,
			origin: { y: 0.8 },
			colors: ["#FF2E93", "#7928CA", "#00F5FF", "#FFFFFF"],
		});
	};

	return (
		<div className="bg-background text-foreground flex min-h-screen flex-col p-4 select-none">
			{/* Top Navigation / Brand */}
			<header className="border-border flex items-center justify-between border-b pb-4">
				<div className="flex items-center gap-2.5">
					<img
						src="/icon/48.png"
						alt="ThreadFX"
						className="h-8 w-8 rounded-lg object-contain shadow-lg shadow-[#FF2E93]/20"
					/>
					<div>
						<h1 className="bg-gradient-to-r from-[#FF2E93] via-[#7928CA] to-[#00F5FF] bg-clip-text text-base font-bold tracking-tight text-transparent">
							ThreadFX
						</h1>
						<p className="text-muted-foreground font-mono text-[10px]">v1.0.0 • Manifest V3</p>
					</div>
				</div>

				{/* Master Power Toggle */}
				<Button
					variant={settings.enabled ? "outline" : "secondary"}
					size="sm"
					onClick={() => updateSetting("enabled", !settings.enabled)}
					className={`flex items-center gap-1.5 rounded-full text-xs font-medium transition-all ${
						settings.enabled
							? "border-primary/40 text-primary shadow-primary/20 bg-muted/60 shadow-sm"
							: "text-muted-foreground"
					}`}
				>
					<span
						className={`h-2 w-2 rounded-full ${settings.enabled ? "bg-primary animate-pulse" : "bg-muted-foreground"}`}
					/>
					{settings.enabled ? "ACTIVE" : "OFF"}
				</Button>
			</header>

			{/* Live Stats Bar */}
			<div className="my-4 grid grid-cols-2 gap-2">
				<Card className="flex flex-col justify-between p-3">
					<div className="text-muted-foreground flex items-center justify-between text-xs">
						<span>Likes Juiced</span>
						<Heart className="text-primary fill-primary h-3.5 w-3.5" />
					</div>
					<span className="text-foreground mt-1 font-mono text-2xl font-bold">
						{settings.likesJuicedCount || 0}
					</span>
				</Card>

				<Card className="flex flex-col justify-between p-3">
					<div className="text-muted-foreground flex items-center justify-between text-xs">
						<span>Audio Engine</span>
						<SlidersIcon className="h-3.5 w-3.5 text-[#00F5FF]" />
					</div>
					<div className="mt-1 flex items-baseline gap-1">
						<span className="font-mono text-sm font-bold text-[#00F5FF]">&lt;15ms</span>
						<span className="text-muted-foreground text-[10px]">ZzFX WebAudio</span>
					</div>
				</Card>
			</div>

			{/* Main Settings Sections */}
			<div className="flex-1 space-y-5">
				{/* Section 1: Sound Packs */}
				<section className="space-y-2.5">
					<div className="flex items-center justify-between">
						<label className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
							Active Sound Pack
						</label>
						<span className="text-muted-foreground text-[11px]">Click to test</span>
					</div>

					<div className="grid grid-cols-2 gap-2">
						{Object.values(SOUND_PACKS).map((pack) => {
							const isSelected = settings.soundPack === pack.id;
							return (
								<div
									key={pack.id}
									onClick={() => {
										updateSetting("soundPack", pack.id);
										previewSound(pack);
									}}
									className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border p-3 text-left transition-all ${
										isSelected
											? "bg-muted border-primary shadow-primary/10 shadow-md"
											: "bg-card border-border hover:border-accent"
									}`}
								>
									<div className="mb-1.5 flex items-center justify-between">
										<span className="text-xl">{pack.icon}</span>
										{isSelected && (
											<span className="bg-primary flex h-4 w-4 items-center justify-center rounded-full">
												<Check className="h-2.5 w-2.5 text-white" />
											</span>
										)}
									</div>
									<span className="text-foreground text-xs font-bold">{pack.name}</span>
									<span className="text-muted-foreground line-clamp-1 text-[10px]">
										{pack.description}
									</span>
								</div>
							);
						})}
					</div>
				</section>

				{/* Section 2: Volume Slider via shadcn/ui */}
				<Card className="space-y-3 p-3.5">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							{settings.volume === 0 ? (
								<VolumeX className="text-muted-foreground h-4 w-4" />
							) : (
								<Volume2 className="text-primary h-4 w-4" />
							)}
							<span className="text-foreground text-xs font-medium">Sound Volume</span>
						</div>
						<span className="text-muted-foreground font-mono text-xs">
							{Math.round(settings.volume * 100)}%
						</span>
					</div>

					<Slider
						value={[settings.volume]}
						min={0}
						max={1}
						step={0.05}
						onValueChange={(vals: number[]) => updateSetting("volume", vals[0])}
						className="w-full"
					/>
				</Card>

				{/* Section 3: Visual Effects & Particle Burst Toggle */}
				<Card className="flex items-center justify-between p-3.5">
					<div className="flex items-center gap-2.5">
						<div className="bg-muted flex h-7 w-7 items-center justify-center rounded-lg text-[#00F5FF]">
							<Sparkles className="h-3.5 w-3.5" />
						</div>
						<div>
							<span className="text-foreground block text-xs font-medium">Visual Effects</span>
							<span className="text-muted-foreground block text-[10px]">
								Particle &amp; emoji bursts on like
							</span>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={testConfetti}
							className="h-6 px-2 font-mono text-[10px]"
						>
							Test
						</Button>
						<Switch
							checked={settings.confettiEnabled}
							onCheckedChange={(checked: boolean) => updateSetting("confettiEnabled", checked)}
						/>
					</div>
				</Card>
			</div>

			{/* Footer Branding */}
			<footer className="border-border text-muted-foreground flex items-center justify-between border-t pt-4 text-[11px]">
				<div className="flex items-center gap-1.5">
					<a
						href="https://threads.com/@nmrisrl"
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						Built by <span className="text-foreground font-medium">@nmrisrl</span>
					</a>
					<span>•</span>
					<a
						href="https://github.com/nmrisrl11/threadfx"
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						MIT
					</a>
				</div>

				<a
					href="https://threadfx.nmrisrl.dev"
					target="_blank"
					rel="noreferrer"
					className="flex items-center gap-1 text-[#00F5FF] hover:underline"
				>
					<span>Website</span>
					<ExternalLink className="h-3 w-3" />
				</a>
			</footer>
		</div>
	);
}
