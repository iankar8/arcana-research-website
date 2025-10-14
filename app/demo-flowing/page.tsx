'use client';

import Hero from '@/components/Hero';
import FlowingWavesBackground from '@/components/FlowingWavesBackground';
import Link from 'next/link';

export default function DemoFlowing() {
  return (
    <main className="relative min-h-screen">
      <FlowingWavesBackground opacity={0.8} speed={1.5} darkMode={false} />
      
      {/* Navigation */}
      <div className="fixed top-8 left-8 z-50 space-y-2">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg border-2 border-gold p-4 shadow-xl">
          <div className="font-black text-sm text-text-strong mb-3">Flowing Waves</div>
          <div className="text-xs text-text-muted mb-3">
            Smooth, organic wave motion with shimmer particles - inspired by water and energy flow
          </div>
          <div className="space-y-2 text-sm">
            <div className="px-3 py-2 bg-gold text-white rounded font-semibold">
              ✓ Light Mode
            </div>
            <Link href="/demo-flowing-dark" className="block px-3 py-2 border border-text-strong/20 rounded hover:bg-gold/10 transition-colors">
              Dark Mode
            </Link>
          </div>
          <div className="mt-4 pt-3 border-t border-text-strong/10">
            <Link href="/background-demos" className="block text-xs text-text-muted hover:text-gold transition-colors mb-2">
              ← Geometric Variants
            </Link>
          </div>
          <Link 
            href="/" 
            className="block text-xs text-text-muted hover:text-gold transition-colors"
          >
            ← Full Site
          </Link>
        </div>
      </div>

      <div className="relative z-10">
        <Hero />
      </div>
    </main>
  );
}
