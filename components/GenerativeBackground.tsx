'use client';

import { useEffect, useRef } from 'react';

interface GenerativeBackgroundProps {
  variant?: 'concentric' | 'radial' | 'particles' | 'grid';
  opacity?: number;
  speed?: number;
}

export default function GenerativeBackground({ 
  variant = 'concentric',
  opacity = 0.4,
  speed = 1
}: GenerativeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Animation variables
    let time = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Brand colors - dramatically increased for visibility
    const colors = {
      gold: 'rgba(193, 127, 74, 0.9)',
      goldLight: 'rgba(232, 205, 181, 0.8)',
      dark: 'rgba(10, 10, 10, 0.7)',
      background: '#FAFAF9'
    };

    const drawConcentric = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time = timestamp * 0.0001 * speed;

      // Concentric circles
      const maxRadius = Math.max(canvas.width, canvas.height) * 0.8;
      const numCircles = 12;
      
      for (let i = 0; i < numCircles; i++) {
        const radius = (maxRadius / numCircles) * (i + 1);
        const pulseOffset = Math.sin(time + i * 0.3) * 10;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + pulseOffset, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? colors.gold : colors.dark;
        ctx.lineWidth = i % 3 === 0 ? 8 : 5;
        ctx.globalAlpha = 1;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Radiating lines
      const numLines = 64;
      for (let i = 0; i < numLines; i++) {
        const angle = (Math.PI * 2 / numLines) * i + time * 0.5;
        const length = maxRadius * (0.6 + Math.sin(time * 2 + i * 0.1) * 0.2);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * length,
          centerY + Math.sin(angle) * length
        );
        ctx.strokeStyle = i % 4 === 0 ? colors.gold : colors.dark;
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.9;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    };

    const drawRadial = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time = timestamp * 0.0002 * speed;

      const maxRadius = Math.max(canvas.width, canvas.height);
      const numLines = 180;
      
      for (let i = 0; i < numLines; i++) {
        const angle = (Math.PI * 2 / numLines) * i + time;
        const offset = Math.sin(time * 3 + i * 0.05) * 50;
        const length = maxRadius * (0.5 + Math.sin(time + i * 0.1) * 0.3);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * (length + offset),
          centerY + Math.sin(angle) * (length + offset)
        );
        
        const intensity = (Math.sin(time * 2 + i * 0.1) + 1) / 2;
        ctx.strokeStyle = intensity > 0.5 ? colors.gold : colors.dark;
        ctx.lineWidth = intensity > 0.7 ? 8 : 5;
        ctx.globalAlpha = 0.8 + intensity * 0.2;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const drawParticles = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time = timestamp * 0.0001 * speed;

      // Concentric circle guides
      const maxRadius = Math.max(canvas.width, canvas.height) * 0.7;
      const numCircles = 8;
      
      for (let i = 0; i < numCircles; i++) {
        const radius = (maxRadius / numCircles) * (i + 1);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = colors.dark;
        ctx.lineWidth = 6;
        ctx.globalAlpha = 0.9;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Animated particles on circles
      const particlesPerCircle = 40;
      for (let i = 0; i < numCircles; i++) {
        const radius = (maxRadius / numCircles) * (i + 1);
        
        for (let j = 0; j < particlesPerCircle; j++) {
          const angle = (Math.PI * 2 / particlesPerCircle) * j + time * (i % 2 === 0 ? 0.5 : -0.5);
          const noise = Math.sin(time * 3 + i * 0.5 + j * 0.2) * 8;
          
          const x = centerX + Math.cos(angle) * (radius + noise);
          const y = centerY + Math.sin(angle) * (radius + noise);
          
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fillStyle = j % 3 === 0 ? colors.gold : colors.dark;
          ctx.globalAlpha = 0.9 + Math.sin(time * 2 + j * 0.1) * 0.1;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Cross lines
      const numLines = 24;
      for (let i = 0; i < numLines; i++) {
        const angle = (Math.PI * 2 / numLines) * i;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * maxRadius,
          centerY + Math.sin(angle) * maxRadius
        );
        ctx.strokeStyle = colors.dark;
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.7;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const drawGrid = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time = timestamp * 0.0001 * speed;

      // Central circle
      const maxRadius = Math.max(canvas.width, canvas.height) * 0.6;
      const numCircles = 10;
      
      for (let i = 0; i < numCircles; i++) {
        const radius = (maxRadius / numCircles) * (i + 1);
        const segments = 32;
        
        for (let j = 0; j < segments; j++) {
          const angle1 = (Math.PI * 2 / segments) * j;
          const angle2 = (Math.PI * 2 / segments) * (j + 1);
          
          const offset1 = Math.sin(time * 2 + i * 0.3 + j * 0.1) * 5;
          const offset2 = Math.sin(time * 2 + i * 0.3 + (j + 1) * 0.1) * 5;
          
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius + offset1, angle1, angle2);
          ctx.strokeStyle = (i + j) % 3 === 0 ? colors.gold : colors.dark;
          ctx.lineWidth = i % 2 === 0 ? 8 : 5;
          ctx.globalAlpha = 0.95;
          ctx.stroke();
        }
      }
      
      // Radial grid lines
      const numRadialLines = 48;
      for (let i = 0; i < numRadialLines; i++) {
        const angle = (Math.PI * 2 / numRadialLines) * i + time * 0.3;
        const wave = Math.sin(time * 2 + i * 0.2) * maxRadius * 0.1;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle) * (maxRadius + wave),
          centerY + Math.sin(angle) * (maxRadius + wave)
        );
        ctx.strokeStyle = colors.dark;
        ctx.lineWidth = 5;
        ctx.globalAlpha = 0.8;
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
    };

    const animate = (timestamp: number) => {
      switch (variant) {
        case 'concentric':
          drawConcentric(timestamp);
          break;
        case 'radial':
          drawRadial(timestamp);
          break;
        case 'particles':
          drawParticles(timestamp);
          break;
        case 'grid':
          drawGrid(timestamp);
          break;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [variant, speed]);

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
