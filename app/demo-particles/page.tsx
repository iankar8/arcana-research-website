'use client';

import Hero from '@/components/Hero';
import ASCIIBackground from '@/components/ASCIIBackground';
import Link from 'next/link';

export default function DemoParticles() {
  return (
    <main className="relative min-h-screen">
      <ASCIIBackground variant="waves" opacity={0.5} speed={0.7} />
      
      {/* Navigation */}
      <div className="fixed top-8 left-8 z-50 space-y-2">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg border-2 border-gold p-4 shadow-xl">
          <div className="font-black text-sm text-text-strong mb-3">Background Variants:</div>
          <div className="space-y-2 text-sm">
            <Link href="/demo-concentric" className="block px-3 py-2 border border-text-strong/20 rounded hover:bg-gold/10 transition-colors">
              Concentric Circles
            </Link>
            <Link href="/demo-radial" className="block px-3 py-2 border border-text-strong/20 rounded hover:bg-gold/10 transition-colors">
              Radial Burst
            </Link>
            <div className="px-3 py-2 bg-gold text-white rounded font-semibold">
              ✓ Flowing Waves
            </div>
            <Link href="/demo-grid" className="block px-3 py-2 border border-text-strong/20 rounded hover:bg-gold/10 transition-colors">
              Architectural Grid
            </Link>
          </div>
          <Link 
            href="/" 
            className="block mt-4 pt-3 border-t border-text-strong/10 text-xs text-text-muted hover:text-gold transition-colors"
          >
            ← Back to Full Site
          </Link>
        </div>
      </div>

      <div className="relative z-10">
        <Hero />
      </div>
    </main>
  );
}
