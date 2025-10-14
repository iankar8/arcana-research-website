'use client';

import Link from 'next/link';

export default function BackgroundDemos() {
  const demos = [
    {
      href: '/demo-ocean',
      title: '🌊 Ocean Waves (NEW)',
      description: 'Large flowing particles with horizontal drift - organic ocean wave motion',
      color: 'from-gold/35 to-gold-light/35',
      featured: true
    },
    {
      href: '/demo-circuit',
      title: 'Circuit Board',
      description: 'ASCII chip design with pulsing nodes and connection paths - microprocessor aesthetic',
      color: 'from-gold/30 to-gold-dark/30'
    },
    {
      href: '/demo-concentric',
      title: 'Concentric Waves',
      description: 'ASCII wireframe with pulsing concentric circles - terminal radar aesthetic',
      color: 'from-gold/20 to-gold-light/20'
    },
    {
      href: '/demo-radial',
      title: 'Radial Burst',
      description: 'ASCII art with radiating lines from center - geometric sunburst pattern',
      color: 'from-gold-dark/20 to-gold/20'
    },
    {
      href: '/demo-particles',
      title: 'Flowing Waves',
      description: 'ASCII characters creating organic wave patterns - fluid motion aesthetic',
      color: 'from-text-strong/10 to-text-muted/10'
    },
    {
      href: '/demo-grid',
      title: 'Architectural Grid',
      description: 'ASCII line art with animated grid distortions - blueprint wireframe style',
      color: 'from-gold-light/20 to-gold-subtle/20'
    }
  ];

  return (
    <main className="min-h-screen bg-background-light flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-text-strong mb-4">
            ASCII Art Backgrounds
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Animated ASCII wireframe patterns in your brand colors. Click any card to see it with the Hero section.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="group relative overflow-hidden rounded-2xl border-2 border-text-strong/10 hover:border-gold transition-all hover:shadow-2xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${demo.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative p-8">
                <h2 className="text-2xl font-black text-text-strong mb-3 group-hover:text-gold transition-colors">
                  {demo.title}
                </h2>
                <p className="text-text-muted leading-relaxed">
                  {demo.description}
                </p>
                <div className="mt-6 inline-flex items-center text-sm font-semibold text-gold group-hover:translate-x-2 transition-transform">
                  View Demo →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/"
            className="inline-block px-8 py-4 bg-text-strong text-background-light rounded-lg font-semibold hover:bg-text-strong/90 transition-colors"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
