'use client';

import { useEffect, useRef } from 'react';

interface SimpleParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  size?: number;
}

export function SimpleParticles({
  className = '',
  quantity = 50,
  color = '#ffffff',
  size = 2,
}: SimpleParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles with simple properties for slow random movement
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
      hue: number;
      driftX: number;
      driftY: number;
      time: number;
    }> = [];

    for (let i = 0; i < quantity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // Slower movement
        vy: (Math.random() - 0.5) * 0.3, // Slower movement
        alpha: Math.random() * 0.6 + 0.3,
        size: size + Math.random() * 1,
        hue: Math.random() * 40 - 20, // Color variation
        driftX: Math.random() * 0.02 - 0.01, // Very slow drift
        driftY: Math.random() * 0.02 - 0.01, // Very slow drift
        time: Math.random() * Math.PI * 2, // For sine wave movement
      });
    }

    // Helper function to convert hex to HSL
    const hexToHsl = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      
      return [h * 360, s * 100, l * 100];
    };

    const [baseH, baseS, baseL] = hexToHsl(color);

    // Optimized animation loop
    let frameCount = 0;
    const animate = () => {
      frameCount++;
      
      // Only update every 2 frames for better performance
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          // Simplified movement
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap around edges
          if (particle.x < -5) particle.x = canvas.width + 5;
          if (particle.x > canvas.width + 5) particle.x = -5;
          if (particle.y < -5) particle.y = canvas.height + 5;
          if (particle.y > canvas.height + 5) particle.y = -5;

          // Draw simple particle without complex calculations
          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [quantity, color, size]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}

export default SimpleParticles;
