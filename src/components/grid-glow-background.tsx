"use client";

import React, { useRef, useEffect } from "react";

interface GridGlowBackgroundProps {
  backgroundColor?: string;
  gridColor?: string;
  gridSize?: number;
  glowColors?: string[];
  glowCount?: number;
}

export function GridGlowBackground({
  backgroundColor = "#030303",
  gridColor = "rgba(124, 58, 237, 0.04)",
  gridSize = 48,
  glowColors = ["rgba(124, 58, 237, 0.12)", "rgba(99, 102, 241, 0.12)", "rgba(236, 72, 153, 0.08)"],
  glowCount = 8,
}: GridGlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const activeCanvas = canvas;
    const activeCtx = ctx;

    let glows: Glow[] = [];
    let frameId: number;

    class Glow {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      radius: number;
      speed: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.floor(Math.random() * (activeCanvas.width / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (activeCanvas.height / gridSize)) * gridSize;
        this.targetX = this.x;
        this.targetY = this.y;
        this.radius = Math.random() * 180 + 100;
        this.speed = Math.random() * 0.008 + 0.004;
        this.color = glowColors[Math.floor(Math.random() * glowColors.length)];
        this.alpha = 0;
        this.setNewTarget();
      }

      setNewTarget() {
        this.targetX = Math.floor(Math.random() * (activeCanvas.width / gridSize)) * gridSize;
        this.targetY = Math.floor(Math.random() * (activeCanvas.height / gridSize)) * gridSize;
      }

      update() {
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;

        if (Math.abs(this.targetX - this.x) < 1 && Math.abs(this.targetY - this.y) < 1) {
          this.setNewTarget();
        }
        if (this.alpha < 1) this.alpha += 0.005;
      }

      draw() {
        activeCtx.globalAlpha = this.alpha;
        const grad = activeCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, "transparent");
        activeCtx.fillStyle = grad;
        activeCtx.beginPath();
        activeCtx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        activeCtx.fill();
        activeCtx.globalAlpha = 1;
      }
    }


    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      glows = Array.from({ length: glowCount }, () => new Glow());
    };

    const drawGrid = () => {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw dark background base
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      drawGrid();
      
      // Draw blobs
      glows.forEach((g) => {
        if (!prefersReducedMotion) {
          g.update();
        } else {
          g.alpha = 0.4; // Render statically visible
        }
        g.draw();
      });
      
      if (!prefersReducedMotion) {
        frameId = requestAnimationFrame(animate);
      }
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (frameId) cancelAnimationFrame(frameId);
    };

  }, [gridColor, gridSize, glowColors, glowCount, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full"
    />
  );
}
