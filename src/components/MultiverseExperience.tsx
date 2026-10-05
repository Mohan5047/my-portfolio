import React, { useEffect, useRef, useState } from 'react';
import { useMultiverse } from '../context/MultiverseContext';

interface MultiverseExperienceProps {
  children: React.ReactNode;
}

export const MultiverseExperience: React.FC<MultiverseExperienceProps> = ({ children }) => {
  const { activeSection } = useMultiverse();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Interactive Particle Canvas Foundation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.5 + 0.25,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint multiverse constellation connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const xNorm = (e.clientX / window.innerWidth - 0.5) * 15;
    const yNorm = (e.clientY / window.innerHeight - 0.5) * 15;
    setMousePos({ x: xNorm, y: yNorm });
  };

  return (
    <div className="multiverse-universe-container" onMouseMove={handleMouseMove}>
      {/* Visual Layer Behind Content */}
      <div className="multiverse-visual-backdrop" aria-hidden="true">
        <canvas ref={canvasRef} className="multiverse-particles-canvas" />

        {/* Ambient Nebula Depth Flares with Parallax */}
        <div
          className="nebula-flare flare-primary"
          style={{
            transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)`,
          }}
        />
        <div
          className="nebula-flare flare-cyan"
          style={{
            transform: `translate3d(${-mousePos.x * 0.6}px, ${-mousePos.y * 0.6}px, 0)`,
          }}
        />

        {/* Active Node Telemetry Indicator in Background */}
        <div className="spatial-grid-overlay" />
      </div>

      {/* Foreground Content World */}
      <div className="multiverse-content-layer" data-active-node={activeSection}>
        {children}
      </div>
    </div>
  );
};
