'use client';

import Hero from '@/components/Hero';
import FlowingWavesBackground from '@/components/FlowingWavesBackground';
import Link from 'next/link';

export default function DemoFlowingDark() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A]">
      <FlowingWavesBackground opacity={0.9} speed={1.5} darkMode={true} />
      
      {/* Navigation */}
      <div className="fixed top-8 left-8 z-50 space-y-2">
        <div className="bg-black/90 backdrop-blur-sm rounded-lg border-2 border-gold p-4 shadow-xl">
          <div className="font-black text-sm text-gold mb-3">Flowing Waves</div>
          <div className="text-xs text-gold-light mb-3">
            Smooth, organic wave motion with shimmer particles - inspired by water and energy flow
          </div>
          <div className="space-y-2 text-sm">
            <Link href="/demo-flowing" className="block px-3 py-2 border border-gold/20 rounded hover:bg-gold/10 transition-colors text-gold-light">
              Light Mode
            </Link>
            <div className="px-3 py-2 bg-gold text-black rounded font-semibold">
              ✓ Dark Mode
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-gold/20">
            <Link href="/background-demos" className="block text-xs text-gold-light hover:text-gold transition-colors mb-2">
              ← Geometric Variants
            </Link>
          </div>
          <Link 
            href="/" 
            className="block text-xs text-gold-light hover:text-gold transition-colors"
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
