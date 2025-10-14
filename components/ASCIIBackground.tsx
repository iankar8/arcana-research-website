'use client';

import { useEffect, useRef } from 'react';

interface ASCIIBackgroundProps {
  variant?: 'concentric' | 'radial' | 'grid' | 'waves' | 'circuit' | 'ocean';
  opacity?: number;
  speed?: number;
}

export default function ASCIIBackground({ 
  variant = 'concentric',
  opacity = 0.7,
  speed = 1
}: ASCIIBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = ['·', '•', '○', '◦', '∘', '⋅', '∙', '▪', '▫', '□', '■', '─', '│', '┼', '╬', '╳', '✕', '×', '+', '*'];
    const lines = ['─', '│', '┌', '┐', '└', '┘', '├', '┤', '┬', '┴', '┼'];
    
    let time = 0;

    const drawConcentric = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const charSize = 18;
      
      let output = '';
      
      // Full screen coverage with denser pattern
      for (let y = 0; y < height; y += charSize) {
        for (let x = 0; x < width; x += charSize) {
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          
          // Create concentric rings with animation
          const ring = Math.floor(distance / 40);
          const wave = Math.sin(distance * 0.025 - time * speed * 0.5);
          const rotationWave = Math.cos(angle * 3 + time * speed * 0.3);
          
          const combined = (wave + rotationWave) / 2;
          
          // More particles visible
          let char = ' ';
          if (Math.abs(combined) > 0.4) {
            const intensity = Math.floor((combined + 1) * 4);
            const charIndex = Math.min(Math.max(intensity, 0), chars.length - 1);
            char = chars[charIndex];
          } else if (distance % 80 < 10 && combined > 0) {
            char = '·';
          }
          
          if (char !== ' ') {
            const alpha = 0.4 + combined * 0.4;
            output += `<span style="position:absolute;left:${x}px;top:${y}px;font-size:${charSize}px;line-height:1;color:rgba(193,127,74,${Math.max(0.15, alpha)})">${char}</span>`;
          }
        }
      }
      
      container.innerHTML = output;
    };

    const drawRadial = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const charSize = 18;
      
      let output = '';
      const numLines = 64; // More radial lines for denser pattern
      const maxRadius = Math.max(width, height) * 0.7; // Extend to edges
      
      // Draw radiating lines
      for (let i = 0; i < numLines; i++) {
        const angle = (Math.PI * 2 / numLines) * i + time * speed * 0.15;
        const wave = Math.sin(time * speed * 0.8 + i * 0.15);
        
        for (let r = 0; r < maxRadius; r += charSize) {
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          
          if (x >= 0 && x < width && y >= 0 && y < height) {
            const distanceRatio = r / maxRadius;
            const pulse = Math.sin(distanceRatio * Math.PI * 3 + time * speed * 0.5);
            const combined = (wave + pulse) / 2;
            
            const intensity = Math.floor((combined + 1) * 4);
            const charIndex = Math.min(Math.max(intensity, 0), chars.length - 1);
            
            // More visible particles
            if (combined > -0.3) {
              const char = chars[charIndex];
              const alpha = 0.4 + combined * 0.4;
              output += `<span style="position:absolute;left:${x}px;top:${y}px;font-size:${charSize}px;line-height:1;color:rgba(193,127,74,${Math.max(0.15, alpha)})">${char}</span>`;
            }
          }
        }
      }
      
      container.innerHTML = output;
    };

    const drawGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const charSize = 25;
      
      let output = '';
      
      // Full screen grid with animated wave distortion
      for (let y = 0; y < height; y += charSize) {
        for (let x = 0; x < width; x += charSize) {
          const gridX = x / charSize;
          const gridY = y / charSize;
          const wave1 = Math.sin(gridX * 0.15 + time * speed * 0.4);
          const wave2 = Math.cos(gridY * 0.15 - time * speed * 0.4);
          const combined = (wave1 + wave2) / 2;
          
          let char = ' ';
          
          // Grid lines
          if (y % (charSize * 3) === 0) {
            char = lines[0]; // ─
          } else if (x % (charSize * 3) === 0) {
            char = lines[1]; // │
          } else if (x % (charSize * 3) === 0 && y % (charSize * 3) === 0) {
            char = lines[10]; // ┼
          }
          // Wave distortion particles - more visible
          else if (combined > 0.2) {
            const intensity = Math.floor((combined + 1) * 4);
            const charIndex = Math.min(Math.max(intensity, 0), chars.length - 1);
            char = chars[charIndex];
          }
          
          if (char !== ' ') {
            const alpha = 0.4 + combined * 0.4;
            output += `<span style="position:absolute;left:${x}px;top:${y}px;font-size:${charSize}px;line-height:1;color:rgba(193,127,74,${Math.max(0.2, alpha)})">${char}</span>`;
          }
        }
      }
      
      container.innerHTML = output;
    };

    const drawWaves = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const particleSize = 30;
      
      let output = '';
      
      // Simple dots only - no icons
      const particles = ['·', '·', '•', '•'];
      
      // Create flowing particle waves
      for (let y = 0; y < height; y += particleSize) {
        for (let x = 0; x < width; x += particleSize) {
          
          // Multiple overlapping wave frequencies for organic flow
          const wave1 = Math.sin((x * 0.004) + (time * speed * 0.6)) * 60;
          const wave2 = Math.cos((y * 0.003) - (time * speed * 0.5)) * 50;
          const wave3 = Math.sin(((x + y) * 0.002) + (time * speed * 0.7)) * 40;
          
          // Combine waves for complex motion
          const combinedWave = wave1 + wave2 + wave3;
          
          // Position with wave offset - no scroll movement
          const finalX = x + Math.cos((y * 0.004) + (time * speed * 0.4)) * 50;
          const finalY = y + combinedWave;
          
          // Check if in bounds
          if (finalX >= -50 && finalX < width + 50 && finalY >= -50 && finalY < height + 50) {
            
            // Wave intensity determines visibility
            const intensity = (Math.sin((x + y) * 0.005 + time * speed * 0.5) + 1) / 2;
            
            // Show particles based on wave intensity - creates flowing clusters
            if (intensity > 0.3) {
              // Particle size and opacity vary with intensity
              const particleIndex = Math.floor(intensity * particles.length);
              const particle = particles[Math.min(particleIndex, particles.length - 1)];
              
              const size = particleSize * (0.6 + intensity * 0.6);
              const alpha = 0.25 + intensity * 0.45;
              
              output += `<span style="position:absolute;left:${finalX}px;top:${finalY}px;font-size:${size}px;line-height:1;color:rgba(193,127,74,${alpha})">${particle}</span>`;
            }
          }
        }
      }
      
      container.innerHTML = output;
    };

    const drawCircuit = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const charSize = 30;
      
      let output = '';
      
      // Full screen circuit grid - edge to edge
      const paths = [
        // Horizontal paths spanning full width
        { x: 0, y: height * 0.15, horizontal: true, length: width, speed: 1 },
        { x: 0, y: height * 0.3, horizontal: true, length: width, speed: 0.9 },
        { x: 0, y: height * 0.45, horizontal: true, length: width, speed: 1.1 },
        { x: 0, y: height * 0.6, horizontal: true, length: width, speed: 0.95 },
        { x: 0, y: height * 0.75, horizontal: true, length: width, speed: 1.05 },
        { x: 0, y: height * 0.9, horizontal: true, length: width, speed: 1.02 },
        
        // Vertical paths spanning full height
        { x: width * 0.1, y: 0, horizontal: false, length: height, speed: 1.2 },
        { x: width * 0.25, y: 0, horizontal: false, length: height, speed: 0.85 },
        { x: width * 0.4, y: 0, horizontal: false, length: height, speed: 1.15 },
        { x: width * 0.55, y: 0, horizontal: false, length: height, speed: 0.9 },
        { x: width * 0.7, y: 0, horizontal: false, length: height, speed: 1.05 },
        { x: width * 0.85, y: 0, horizontal: false, length: height, speed: 1.1 },
      ];
      
      // Draw clean circuit paths - just simple lines, no nodes
      paths.forEach((path, pathIndex) => {
        if (path.horizontal) {
          for (let offset = 0; offset < path.length; offset += charSize) {
            const x = path.x + offset;
            const y = path.y;
            
            output += `<span style="position:absolute;left:${x}px;top:${y}px;font-size:${charSize}px;line-height:1;color:rgba(193,127,74,0.35)">─</span>`;
          }
        } else {
          for (let offset = 0; offset < path.length; offset += charSize) {
            const x = path.x;
            const y = path.y + offset;
            
            output += `<span style="position:absolute;left:${x}px;top:${y}px;font-size:${charSize}px;line-height:1;color:rgba(193,127,74,0.35)">│</span>`;
          }
        }
      });
      
      // Add single clean particles traveling along paths
      paths.forEach((path, pathIndex) => {
        const particlePhase = (time * speed * path.speed) % 1;
        
        if (path.horizontal) {
          const particleX = path.x + (path.length * particlePhase);
          const particleY = path.y;
          
          // Single glowing particle
          output += `<span style="position:absolute;left:${particleX}px;top:${particleY}px;font-size:${charSize}px;line-height:1;color:rgba(193,127,74,0.8);text-shadow:0 0 8px rgba(193,127,74,0.6)">●</span>`;
        } else {
          const particleX = path.x;
          const particleY = path.y + (path.length * particlePhase);
          
          // Single glowing particle
          output += `<span style="position:absolute;left:${particleX}px;top:${particleY}px;font-size:${charSize}px;line-height:1;color:rgba(193,127,74,0.8);text-shadow:0 0 8px rgba(193,127,74,0.6)">●</span>`;
        }
      });
      
      // Add intersection nodes where paths cross
      const intersections = [
        { x: width * 0.1, y: height * 0.15 },
        { x: width * 0.25, y: height * 0.3 },
        { x: width * 0.4, y: height * 0.45 },
        { x: width * 0.55, y: height * 0.6 },
        { x: width * 0.7, y: height * 0.75 },
        { x: width * 0.85, y: height * 0.9 },
        { x: width * 0.1, y: height * 0.6 },
        { x: width * 0.25, y: height * 0.75 },
        { x: width * 0.4, y: height * 0.9 },
        { x: width * 0.55, y: height * 0.15 },
        { x: width * 0.7, y: height * 0.3 },
        { x: width * 0.85, y: height * 0.45 },
        { x: width * 0.1, y: height * 0.45 },
        { x: width * 0.4, y: height * 0.3 },
        { x: width * 0.7, y: height * 0.6 },
      ];
      
      intersections.forEach((node, i) => {
        const nodePulse = Math.sin(time * speed * 0.3 + i * 1.2) * 0.3 + 0.6;
        
        // Simple clean node
        output += `<span style="position:absolute;left:${node.x}px;top:${node.y}px;font-size:${charSize * 1.2}px;line-height:1;color:rgba(193,127,74,${nodePulse});text-shadow:0 0 6px rgba(193,127,74,0.4)">○</span>`;
      });
      
      // Subtle background texture
      for (let y = 0; y < height; y += charSize * 5) {
        for (let x = 0; x < width; x += charSize * 5) {
          if (Math.random() > 0.75) {
            output += `<span style="position:absolute;left:${x}px;top:${y}px;font-size:${charSize * 0.6}px;line-height:1;color:rgba(193,127,74,0.12)">·</span>`;
          }
        }
      }
      
      container.innerHTML = output;
    };

    const drawOcean = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const charSize = 30;
      
      let output = '';
      
      // Large particle sizes for ocean effect
      const oceanChars = ['○', '◉', '●', '◯', '⬤', '◎', '⊙', '⊚'];
      
      // Create flowing ocean waves with horizontal movement
      for (let y = 0; y < height; y += charSize) {
        for (let x = 0; x < width; x += charSize) {
          // Large scale wave patterns
          const waveLayer1 = Math.sin((x * 0.003) + (time * speed * 0.2));
          const waveLayer2 = Math.cos((x * 0.004) - (time * speed * 0.15));
          const waveLayer3 = Math.sin((x * 0.002) + (time * speed * 0.25) + y * 0.001);
          
          // Vertical wave component
          const verticalWave = Math.sin((y * 0.005) + (time * speed * 0.1));
          
          // Combine waves
          const combined = (waveLayer1 + waveLayer2 + waveLayer3 + verticalWave) / 4;
          
          // Large horizontal drift
          const horizontalDrift = Math.sin((y * 0.002) + (time * speed * 0.3)) * charSize * 8;
          const verticalDrift = Math.cos((x * 0.002) + (time * speed * 0.2)) * charSize * 4;
          
          const finalX = x + horizontalDrift;
          const finalY = y + verticalDrift;
          
          // Only show particles where waves are strong
          if (finalX >= 0 && finalX < width && finalY >= 0 && finalY < height && combined > -0.1) {
            const intensity = Math.floor((combined + 1) * 4);
            const charIndex = Math.min(Math.max(intensity, 0), oceanChars.length - 1);
            const char = oceanChars[charIndex];
            
            // Size variation based on intensity
            const size = charSize * (0.8 + combined * 0.6);
            const alpha = 0.3 + combined * 0.5;
            
            output += `<span style="position:absolute;left:${finalX}px;top:${finalY}px;font-size:${size}px;line-height:1;color:rgba(193,127,74,${Math.max(0.15, alpha)});">${char}</span>`;
          }
        }
      }
      
      container.innerHTML = output;
    };

    const animate = () => {
      time += 0.008; // Slow drift with visible movement
      
      switch (variant) {
        case 'concentric':
          drawConcentric();
          break;
        case 'radial':
          drawRadial();
          break;
        case 'grid':
          drawGrid();
          break;
        case 'waves':
          drawWaves();
          break;
        case 'circuit':
          drawCircuit();
          break;
        case 'ocean':
          drawOcean();
          break;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [variant, speed]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none font-mono overflow-hidden"
      style={{ 
        opacity,
        zIndex: -10,
        backgroundColor: 'transparent',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 70%)',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 70%)'
      }}
      aria-hidden="true"
    />
  );
}
