import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Zap, Sliders as SlidersIcon, Check, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { zzfx } from '@/lib/zzfx';
import { SOUND_PACKS } from '@/lib/presets';
import type { SoundPack } from '@/lib/presets';
import { getSettings, saveSettings, onSettingsChanged, DEFAULT_SETTINGS } from '@/lib/storage';
import type { ThreadFXSettings } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

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
      colors: ['#FF2E93', '#7928CA', '#00F5FF', '#FFFFFF'],
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-4 select-none">
      {/* Top Navigation / Brand */}
      <header className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF2E93] to-[#7928CA] flex items-center justify-center shadow-lg shadow-[#FF2E93]/20">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight bg-gradient-to-r from-[#FF2E93] via-[#7928CA] to-[#00F5FF] bg-clip-text text-transparent">
              ThreadFX
            </h1>
            <p className="text-[10px] text-muted-foreground font-mono">v1.0.0 • Manifest V3</p>
          </div>
        </div>

        {/* Master Power Toggle */}
        <Button
          variant={settings.enabled ? 'outline' : 'secondary'}
          size="sm"
          onClick={() => updateSetting('enabled', !settings.enabled)}
          className={`flex items-center gap-1.5 rounded-full text-xs font-medium transition-all ${
            settings.enabled
              ? 'border-primary/40 text-primary shadow-sm shadow-primary/20 bg-muted/60'
              : 'text-muted-foreground'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${settings.enabled ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
          {settings.enabled ? 'ACTIVE' : 'OFF'}
        </Button>
      </header>

      {/* Live Stats Bar */}
      <div className="grid grid-cols-2 gap-2 my-4">
        <Card className="p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Likes Juiced</span>
            <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
          </div>
          <span className="text-2xl font-bold font-mono mt-1 text-foreground">
            {settings.likesJuicedCount || 0}
          </span>
        </Card>

        <Card className="p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted-foreground text-xs">
            <span>Audio Engine</span>
            <SlidersIcon className="w-3.5 h-3.5 text-[#00F5FF]" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-sm font-bold font-mono text-[#00F5FF]">&lt;15ms</span>
            <span className="text-[10px] text-muted-foreground">ZzFX WebAudio</span>
          </div>
        </Card>
      </div>

      {/* Main Settings Sections */}
      <div className="flex-1 space-y-5">
        {/* Section 1: Sound Packs */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Active Sound Pack
            </label>
            <span className="text-[11px] text-muted-foreground">Click to test</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {Object.values(SOUND_PACKS).map((pack) => {
              const isSelected = settings.soundPack === pack.id;
              return (
                <div
                  key={pack.id}
                  onClick={() => {
                    updateSetting('soundPack', pack.id);
                    previewSound(pack);
                  }}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between relative group ${
                    isSelected
                      ? 'bg-muted border-primary shadow-md shadow-primary/10'
                      : 'bg-card border-border hover:border-accent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{pack.icon}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-foreground">{pack.name}</span>
                  <span className="text-[10px] text-muted-foreground line-clamp-1">{pack.description}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Volume Slider via shadcn/ui */}
        <Card className="p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.volume === 0 ? (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Volume2 className="w-4 h-4 text-primary" />
              )}
              <span className="text-xs font-medium text-foreground">Sound Volume</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {Math.round(settings.volume * 100)}%
            </span>
          </div>

          <Slider
            value={[settings.volume]}
            min={0}
            max={1}
            step={0.05}
            onValueChange={(vals: number[]) => updateSetting('volume', vals[0])}
            className="w-full"
          />
        </Card>

        {/* Section 3: Visual Confetti Toggle via shadcn/ui */}
        <Card className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-[#00F5FF]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-medium text-foreground block">Confetti on Like</span>
              <span className="text-[10px] text-muted-foreground block">Neon particle explosion</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={testConfetti}
              className="text-[10px] font-mono h-6 px-2"
            >
              Test
            </Button>
            <Switch
              checked={settings.confettiEnabled}
              onCheckedChange={(checked: boolean) => updateSetting('confettiEnabled', checked)}
            />
          </div>
        </Card>
      </div>

      {/* Footer Branding */}
      <footer className="pt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
        <a
          href="https://threads.com/@nmrisrl"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Built by <span className="text-foreground">@nmrisrl</span>
        </a>

        <a
          href="https://threadfx.nmrisrl.dev"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-[#00F5FF] hover:underline"
        >
          <span>Website</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </footer>
    </div>
  );
}
