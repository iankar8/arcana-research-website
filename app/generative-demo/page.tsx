'use client';

import { useState } from 'react';
import GenerativeBackground from '@/components/GenerativeBackground';

type Variant = 'concentric' | 'radial' | 'particles' | 'grid';

export default function GenerativeDemo() {
  const [variant, setVariant] = useState<Variant>('concentric');
  const [opacity, setOpacity] = useState(0.4);
  const [speed, setSpeed] = useState(1);

  const variants: { name: Variant; label: string; description: string }[] = [
    { 
      name: 'concentric', 
      label: 'Concentric Circles',
      description: 'Pulsing concentric circles with radiating lines - inspired by radar/sonar aesthetics'
    },
    { 
      name: 'radial', 
      label: 'Radial Burst',
      description: 'Dynamic radiating lines with wave motion - energy and movement focused'
    },
    { 
      name: 'particles', 
      label: 'Particle Orbits',
      description: 'Particles orbiting on concentric paths with cross-grid - data visualization feel'
    },
    { 
      name: 'grid', 
      label: 'Architectural Grid',
      description: 'Segmented grid with wave distortions - structured yet organic'
    },
  ];

  return (
    <div className="relative min-h-screen bg-background-light">
      <GenerativeBackground variant={variant} opacity={opacity} speed={speed} />
      
      {/* Controls Panel */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-black/10 p-8 max-w-2xl w-full shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black tracking-tight text-text-strong mb-2">
              Generative Background Gallery
            </h1>
            <p className="text-text-muted">
              Choose your preferred variant for Arcana Advisors
            </p>
          </div>

          {/* Variant Selector */}
          <div className="space-y-3 mb-8">
            <label className="block text-sm font-semibold text-text-strong mb-2">
              Background Variant
            </label>
            {variants.map((v) => (
              <button
                key={v.name}
                onClick={() => setVariant(v.name)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  variant === v.name
                    ? 'border-gold bg-gold/10 shadow-md'
                    : 'border-black/10 hover:border-gold-light hover:bg-gold/5'
                }`}
              >
                <div className="font-semibold text-text-strong mb-1">{v.label}</div>
                <div className="text-sm text-text-muted">{v.description}</div>
              </button>
            ))}
          </div>

          {/* Opacity Control */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-strong mb-2">
              Opacity: {opacity.toFixed(2)}
            </label>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-text-soft mt-1">
              <span>Subtle</span>
              <span>Prominent</span>
            </div>
          </div>

          {/* Speed Control */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-text-strong mb-2">
              Animation Speed: {speed.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.2"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-xs text-text-soft mt-1">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>

          {/* Implementation Code */}
          <div className="bg-text-strong/5 rounded-lg p-4 border border-black/10">
            <div className="text-xs font-mono text-text-muted mb-2">
              Current Configuration:
            </div>
            <code className="block text-sm font-mono text-text-strong">
              {`<GenerativeBackground`}<br/>
              {`  variant="${variant}"`}<br/>
              {`  opacity={${opacity.toFixed(2)}}`}<br/>
              {`  speed={${speed.toFixed(1)}}`}<br/>
              {`/>`}
            </code>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                localStorage.setItem('bg-variant', variant);
                localStorage.setItem('bg-opacity', opacity.toString());
                localStorage.setItem('bg-speed', speed.toString());
                window.location.href = '/';
              }}
              className="flex-1 px-6 py-3 bg-text-strong text-background-light rounded-lg font-semibold text-center hover:bg-text-strong/90 transition-colors"
            >
              Apply to Homepage
            </button>
            <button
              onClick={() => {
                setOpacity(0.4);
                setSpeed(1);
              }}
              className="px-6 py-3 border-2 border-text-strong rounded-lg font-semibold hover:bg-text-strong/5 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Sample Content for Context */}
      <div className="fixed bottom-0 left-0 right-0 z-0 pointer-events-none">
        <div className="max-w-7xl mx-auto px-8 pb-12">
          <h2 className="text-6xl font-black tracking-tight text-text-strong/20 mb-4">
            Sample Content
          </h2>
          <p className="text-xl text-text-muted/30 max-w-2xl">
            This demonstrates how the background will look behind your actual content.
            The animation is subtle enough to not distract from reading.
          </p>
        </div>
      </div>
    </div>
  );
}
