import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Zap, Sliders, Check, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { zzfx } from '@/lib/zzfx';
import { SOUND_PACKS } from '@/lib/presets';
import type { SoundPack } from '@/lib/presets';
import { getSettings, saveSettings, onSettingsChanged, DEFAULT_SETTINGS } from '@/lib/storage';
import type { ThreadFXSettings } from '@/lib/storage';

export default function App() {
  const [settings, setSettings] = useState<ThreadFXSettings>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<'effects' | 'about'>('effects');

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
    <div className="flex flex-col min-h-screen bg-[#080808] text-[#F3F5F7] p-4 select-none">
      {/* Top Navigation / Brand */}
      <header className="flex items-center justify-between pb-4 border-b border-[#262626]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF2E93] to-[#7928CA] flex items-center justify-center shadow-lg shadow-[#FF2E93]/20">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight bg-gradient-to-r from-[#FF2E93] via-[#7928CA] to-[#00F5FF] bg-clip-text text-transparent">
              ThreadFX
            </h1>
            <p className="text-[10px] text-[#8E8E93] font-mono">v1.0.0 • Manifest V3</p>
          </div>
        </div>

        {/* Master Power Toggle */}
        <button
          onClick={() => updateSetting('enabled', !settings.enabled)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            settings.enabled
              ? 'bg-[#1C1C1C] border border-[#FF2E93]/40 text-[#FF2E93] shadow-sm shadow-[#FF2E93]/20'
              : 'bg-[#121212] border border-[#262626] text-[#8E8E93]'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${settings.enabled ? 'bg-[#FF2E93] animate-pulse' : 'bg-[#383838]'}`} />
          {settings.enabled ? 'ACTIVE' : 'OFF'}
        </button>
      </header>

      {/* Live Stats Bar */}
      <div className="grid grid-cols-2 gap-2 my-4">
        <div className="bg-[#121212] border border-[#262626] rounded-xl p-3 flex flex-col">
          <div className="flex items-center justify-between text-[#8E8E93] text-xs">
            <span>Likes Juiced</span>
            <Heart className="w-3.5 h-3.5 text-[#FF2E93] fill-[#FF2E93]" />
          </div>
          <span className="text-2xl font-bold font-mono mt-1 text-[#F3F5F7]">
            {settings.likesJuicedCount || 0}
          </span>
        </div>

        <div className="bg-[#121212] border border-[#262626] rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8E8E93] text-xs">
            <span>Audio Engine</span>
            <Sliders className="w-3.5 h-3.5 text-[#00F5FF]" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-sm font-bold font-mono text-[#00F5FF]">&lt;15ms</span>
            <span className="text-[10px] text-[#8E8E93]">ZzFX WebAudio</span>
          </div>
        </div>
      </div>

      {/* Main Settings Sections */}
      <div className="flex-1 space-y-5">
        {/* Section 1: Sound Packs */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
              Active Sound Pack
            </label>
            <span className="text-[11px] text-[#8E8E93]">Click card to test</span>
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
                      ? 'bg-[#181818] border-[#FF2E93] shadow-md shadow-[#FF2E93]/10'
                      : 'bg-[#121212] border-[#262626] hover:border-[#383838]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{pack.icon}</span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-[#FF2E93] flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-[#F3F5F7]">{pack.name}</span>
                  <span className="text-[10px] text-[#8E8E93] line-clamp-1">{pack.description}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Volume Slider */}
        <section className="bg-[#121212] border border-[#262626] rounded-xl p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {settings.volume === 0 ? (
                <VolumeX className="w-4 h-4 text-[#8E8E93]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#FF2E93]" />
              )}
              <span className="text-xs font-medium text-[#F3F5F7]">Sound Volume</span>
            </div>
            <span className="text-xs font-mono text-[#8E8E93]">
              {Math.round(settings.volume * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.volume}
            onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
            className="w-full accent-[#FF2E93] cursor-pointer h-1.5 bg-[#262626] rounded-lg"
          />
        </section>

        {/* Section 3: Visual Confetti Toggle */}
        <section className="bg-[#121212] border border-[#262626] rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1C1C1C] flex items-center justify-center text-[#00F5FF]">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-xs font-medium text-[#F3F5F7] block">Confetti on Like</span>
              <span className="text-[10px] text-[#8E8E93] block">Neon particle explosion</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={testConfetti}
              className="text-[10px] font-mono bg-[#1C1C1C] hover:bg-[#262626] text-[#8E8E93] hover:text-[#F3F5F7] px-2 py-1 rounded border border-[#262626]"
            >
              Test
            </button>
            <button
              onClick={() => updateSetting('confettiEnabled', !settings.confettiEnabled)}
              className={`w-10 h-6 rounded-full transition-colors p-0.5 relative ${
                settings.confettiEnabled ? 'bg-[#FF2E93]' : 'bg-[#262626]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.confettiEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </section>
      </div>

      {/* Footer Branding */}
      <footer className="pt-4 border-t border-[#262626] flex items-center justify-between text-[11px] text-[#8E8E93]">
        <a
          href="https://threads.com/@nmrisrl"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#F3F5F7] transition-colors"
        >
          Built by <span className="text-[#F3F5F7]">@nmrisrl</span>
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
