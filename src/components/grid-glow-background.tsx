"use client";

import React, { useRef, useEffect } from "react";

interface GridGlowBackgroundProps {
  backgroundColor?: string;
  gridColor?: string;
  gridSize?: number;
  glowColors?: string[];
  particleCount?: number;
}

export function GridGlowBackground({
  backgroundColor = "transparent", // Handled by globals.css gradient
  gridColor = "rgba(0, 217, 255, 0.05)",
  gridSize = 48,
  glowColors = ["#00D9FF", "#A78BFA", "#A7F3D0"],
  particleCount = 100, // 80-120 range as requested
}: GridGlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let frameId: number;
    let scrollY = 0;
    
    // Parallax mouse tracking setup
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coords from -1 to 1
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      targetAlpha: number;
      delay: number;
      createdAt: number;

      constructor(index: number) {
        this.baseX = Math.random() * (canvas?.width || window.innerWidth);
        this.baseY = Math.random() * (canvas?.height || window.innerHeight);
        this.x = this.baseX;
        this.y = this.baseY;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        this.color = glowColors[Math.floor(Math.random() * glowColors.length)];
        this.alpha = 0;
        this.targetAlpha = Math.random() * 0.6 + 0.2;
        this.delay = index * 100; // Staggered 100ms entrance
        this.createdAt = performance.now();
      }

      update(time: number, prefersReducedMotion: boolean) {
        if (!prefersReducedMotion) {
          this.baseX += this.vx;
          this.baseY += this.vy;

          // Bounce off edges
          if (this.baseX < 0 || this.baseX > canvas!.width) this.vx *= -1;
          if (this.baseY < 0 || this.baseY > canvas!.height) this.vy *= -1;
        }

        // Apply mouse parallax and scroll parallax
        const parallaxX = mouseRef.current.x * 8; // Max 8px offset
        const parallaxY = mouseRef.current.y * 8 - scrollY * 0.1;
        
        this.x = this.baseX + parallaxX;
        this.y = this.baseY + parallaxY;

        // Entrance fade
        if (time - this.createdAt > this.delay) {
          if (this.alpha < this.targetAlpha) {
            this.alpha += 0.02;
          }
        }
        
        // Wrap around vertically if scrolled way past
        if (this.y > canvas!.height + 50) this.baseY = -50 - parallaxY;
        if (this.y < -50) this.baseY = canvas!.height + 50 - parallaxY;
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx!.globalAlpha = this.alpha;
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx!.fill();
        
        // Subtle glow ring
        ctx!.globalAlpha = this.alpha * 0.3;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    const resize = () => {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      
      // Only recreate particles if they don't exist yet to maintain state
      if (particles.length === 0) {
        particles = Array.from({ length: particleCount }, (_, i) => new Particle(i));
      } else {
        // Redistribute them if canvas resized drastically
        particles.forEach(p => {
          if (p.baseX > canvas!.width) p.baseX = Math.random() * canvas!.width;
          if (p.baseY > canvas!.height) p.baseY = Math.random() * canvas!.height;
        });
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      
      // Calculate scroll offset for grid to move with scroll
      const yOffset = (scrollY * 0.05) % gridSize;

      for (let x = 0; x < canvas!.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas!.height);
        ctx.stroke();
      }
      for (let y = -gridSize; y < canvas!.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y - yOffset);
        ctx.lineTo(canvas!.width, y - yOffset);
        ctx.stroke();
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            // Line opacity based on distance
            const opacity = (1 - distance / 120) * 0.2 * particles[i].alpha * particles[j].alpha;
            if (opacity > 0) {
              ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      
      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas!.width, canvas!.height);
      }
      
      // Smooth mouse interpolation (lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      drawGrid();
      
      particles.forEach(p => p.update(time, prefersReducedMotion));
      
      if (!prefersReducedMotion) {
        drawConnections();
      }
      
      particles.forEach(p => p.draw());
      
      if (!prefersReducedMotion) {
        frameId = requestAnimationFrame(animate);
      } else {
        // Just draw once if reduced motion, or slowly update if absolutely needed
        // but static is better for accessibility.
        drawConnections();
      }
    };

    resize();
    frameId = requestAnimationFrame(animate);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };

  }, [gridColor, gridSize, glowColors, particleCount, backgroundColor]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 h-full w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
      />
    </div>
  );
}
