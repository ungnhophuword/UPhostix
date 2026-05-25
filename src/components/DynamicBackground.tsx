import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  fadeSpeed: number;
  growSpeed: number;
  originalAlpha: number;
}

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [scrollY, setScrollY] = useState(0);

  // Monitor screen scrolling for parallax offset
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 60; // Optimized, low overhead particle count

    // Set precise canvas dimensions matching viewport
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      initParticles(width, height);
    };

    // Instantiate premium constellation particles
    const initParticles = (width: number, height: number) => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.5 + 0.8;
        const originalAlpha = Math.random() * 0.45 + 0.15;

        particles.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35 - 0.15, // Drift slightly upwards
          size: size,
          alpha: originalAlpha,
          fadeSpeed: Math.random() * 0.005 + 0.002,
          growSpeed: Math.random() * 0.05,
          originalAlpha: originalAlpha
        });
      }
    };

    // Particle updater & drawer loop
    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clean drawing stage, maintaining a dark Slate-950 backdrop
      ctx.clearRect(0, 0, width, height);

      // Track scroll parallax offset shift factor
      const parallaxFactor = scrollY * 0.15;

      // Step & Draw particles
      particles.forEach((p) => {
        // Apply vertical & horizontal velocity
        p.x += p.vx;
        p.y += p.vy;

        // Apply mouse magnetic deflection if active
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          // Apply scroll parallax calculation to mouse matching coordinates
          const dy = (mouseRef.current.y) - (p.y - parallaxFactor);
          const distance = Math.hypot(dx, dy);

          if (distance < 160) {
            const force = (160 - distance) / 160;
            const angle = Math.atan2(dy, dx);
            // Deflect gently away from cursor
            p.x -= Math.cos(angle) * force * 1.2;
            p.y -= Math.sin(angle) * force * 1.2;
          }
        }

        // Apply subtle parallax offset only when rendering on screen, keeping bases clean
        const renderY = (p.y - parallaxFactor + height) % height;
        const renderX = (p.x + width) % width;

        // Soft pulse alpha sparkle effect
        p.alpha += p.fadeSpeed;
        if (p.alpha > 0.65 || p.alpha < 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`; // Light blue glow color
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#0284c7';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for line draws
      });

      // Draw constellation digital mesh connector lines between proximate nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const rY1 = (p1.y - parallaxFactor + height) % height;
        const rX1 = (p1.x + width) % width;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const rY2 = (p2.y - parallaxFactor + height) % height;
          const rX2 = (p2.x + width) % width;

          const dx = rX1 - rX2;
          const dy = rY1 - rY2;
          const distance = Math.hypot(dx, dy);

          // Connect only close nodes
          if (distance < 110) {
            const alpha = (110 - distance) / 110 * 0.12;
            ctx.beginPath();
            ctx.moveTo(rX1, rY1);
            ctx.lineTo(rX2, rY2);
            // Blue/Turquoise network line matching AI startup aesthetic
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Tracking mouse actions mapping with coordinate scale adjustment
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;

      // Update CSS variables for fluid cursor aura tracking without React state redraw lag
      const target = canvasRef.current?.parentElement;
      if (target) {
        target.style.setProperty('--mouse-x', `${e.clientX}px`);
        target.style.setProperty('--mouse-y', `${e.clientY}px`);
        target.style.setProperty('--mouse-active-opacity', '0.22');
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;

      const target = canvasRef.current?.parentElement;
      if (target) {
        target.style.setProperty('--mouse-active-opacity', '0');
      }
    };

    // Track touch interactions for mobile screens mapping
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    // Prepare elements listening
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Bootstrap initial environment
    resizeCanvas();
    animate();

    // Clean up timers & subscriptions
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollY]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-slate-950">
      {/* 🔮 LAYER 1: Ambient moving radial gradient blurs (Blue/Aqua/Indigo Theme) */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[150px] animate-pulse pointer-events-none"
        style={{
          transform: `translate3d(0, ${Math.sin(scrollY * 0.001) * 35}px, 0)`,
          willChange: 'transform',
          animationDuration: '12s'
        }}
      />
      <div 
        className="absolute bottom-[20%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-sky-500/10 blur-[130px] pointer-events-none"
        style={{
          transform: `translate3d(0, ${Math.cos(scrollY * 0.001) * 45}px, 0)`,
          willChange: 'transform'
        }}
      />
      <div 
        className="absolute top-[40%] right-[25%] w-[35vw] h-[35vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none"
        style={{
          transform: `translate3d(${Math.sin(scrollY * 0.0015) * 50}px, ${Math.cos(scrollY * 0.001) * 30}px, 0)`,
          willChange: 'transform'
        }}
      />
      <div 
        className="absolute bottom-[-10%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-indigo-600/8 blur-[160px] pointer-events-none"
        style={{
          transform: `translate3d(0, ${Math.sin(scrollY * 0.001) * -30}px, 0)`,
          willChange: 'transform'
        }}
      />

      {/* 💡 LAYER 1.5: Interactive Cursor Aura (CSS-driven radial glow spotlight for optimal performance) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out"
        style={{
          opacity: 'var(--mouse-active-opacity, 0)',
          background: 'radial-gradient(500px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(14, 165, 233, 0.15) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 100%)',
          willChange: 'background'
        }}
      />

      {/* 🚀 LAYER 2: Ultra-fine futuristic digital grid with subtle glow */}
      <div 
        className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(99,102,241,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.15)_1px,transparent_1px)] bg-[size:40px_40px]"
        style={{
          transform: `translate3d(0, ${scrollY * -0.05}px, 0)`,
          willChange: 'transform'
        }}
      />

      {/* 💎 LAYER 3: Interactive laser sweep glow bar (simulating security scanner/AI compute wave) */}
      <div 
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent blur-[2px] animate-[laser-sweep_10s_infinite_linear] pointer-events-none"
        style={{
          willChange: 'transform, opacity'
        }}
      />

      {/* 🌌 LAYER 4: Light technological canvas particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 block pointer-events-none" 
      />

      {/* Inject laser sweep animations programmatically */}
      <style>{`
        @keyframes laser-sweep {
          0% {
            top: -5%;
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            top: 105%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
