'use client';

import { useEffect, useRef } from 'react';

interface FlowingWavesBackgroundProps {
  opacity?: number;
  speed?: number;
  darkMode?: boolean;
}

export default function FlowingWavesBackground({ 
  opacity = 0.6,
  speed = 1,
  darkMode = false
}: FlowingWavesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Brand colors
    const colors = darkMode ? {
      wave1: 'rgba(193, 127, 74, 0.3)',      // Gold
      wave2: 'rgba(232, 205, 181, 0.25)',    // Gold Light
      wave3: 'rgba(168, 105, 31, 0.35)',     // Gold Dark
      background: '#0A0A0A'                   // Dark
    } : {
      wave1: 'rgba(193, 127, 74, 0.4)',      // Gold
      wave2: 'rgba(232, 205, 181, 0.3)',     // Gold Light
      wave3: 'rgba(168, 105, 31, 0.5)',      // Gold Dark
      background: '#FAFAF9'                   // Light
    };

    // Wave parameters
    class Wave {
      constructor(
        public y: number,
        public length: number,
        public amplitude: number,
        public frequency: number,
        public color: string,
        public speed: number,
        public canvasWidth: number,
        public canvasHeight: number
      ) {}

      phase = 0;

      update(time: number) {
        this.phase = time * this.speed * speed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();
        
        // Create flowing wave path
        ctx.moveTo(0, this.canvasHeight);
        
        for (let x = 0; x <= this.canvasWidth; x += 5) {
          const y = this.y + 
            Math.sin((x / this.length) * Math.PI * 2 + this.phase) * this.amplitude +
            Math.sin((x / (this.length * 1.5)) * Math.PI * 2 - this.phase * 0.7) * (this.amplitude * 0.5);
          
          if (x === 0) {
            ctx.lineTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Complete the shape
        ctx.lineTo(this.canvasWidth, this.canvasHeight);
        ctx.closePath();
        
        // Create gradient fill
        const gradient = ctx.createLinearGradient(0, this.y - this.amplitude, 0, this.y + this.amplitude);
        gradient.addColorStop(0, this.color.replace(/[\d.]+\)$/g, '0.1)'));
        gradient.addColorStop(0.5, this.color);
        gradient.addColorStop(1, this.color.replace(/[\d.]+\)$/g, '0.05)'));
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add shimmer stroke
        ctx.strokeStyle = this.color.replace(/[\d.]+\)$/g, '0.8)');
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
      }
    }

    // Create multiple waves
    const waves = [
      new Wave(canvas.height * 0.3, 400, 60, 0.01, colors.wave1, 0.005, canvas.width, canvas.height),
      new Wave(canvas.height * 0.5, 600, 80, 0.008, colors.wave2, -0.003, canvas.width, canvas.height),
      new Wave(canvas.height * 0.7, 500, 70, 0.012, colors.wave3, 0.004, canvas.width, canvas.height),
      new Wave(canvas.height * 0.45, 700, 90, 0.009, colors.wave1, -0.006, canvas.width, canvas.height),
      new Wave(canvas.height * 0.6, 550, 75, 0.011, colors.wave2, 0.007, canvas.width, canvas.height),
    ];

    // Particle system for extra shimmer
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      canvasWidth: number;
      canvasHeight: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5 * speed;
        this.speedY = (Math.random() - 0.5) * 0.3 * speed;
        this.opacity = Math.random() * 0.5;
        this.color = Math.random() > 0.5 ? colors.wave1 : colors.wave3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > this.canvasWidth) this.x = 0;
        if (this.x < 0) this.x = this.canvasWidth;
        if (this.y > this.canvasHeight) this.y = 0;
        if (this.y < 0) this.y = this.canvasHeight;

        // Pulsing opacity
        this.opacity = Math.sin(Date.now() * 0.001) * 0.3 + 0.3;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    let time = 0;
    const animate = () => {
      time += 0.01;

      // Clear with background color
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waves from back to front
      waves.forEach(wave => {
        wave.update(time);
        wave.draw(ctx);
      });

      // Draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ 
        opacity,
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
}
