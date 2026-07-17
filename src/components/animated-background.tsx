"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width: number;
    let height: number;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setSize();
    window.addEventListener("resize", setSize);

    // Subtle avant-garde noise grain
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = resolvedTheme === "dark";
      // Extremely subtle noise
      const opacity = isDark ? 0.03 : 0.04;
      const color = isDark ? 255 : 0;

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() > 0.5 ? color : 255 - color;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = (Math.random() * 255 * opacity);
      }

      ctx.putImageData(imageData, 0, 0);

      // Low framerate for that "film" aesthetic
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(render);
      }, 50); // ~20fps
    };

    render();

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay"
      style={{ opacity: 0.5 }}
    />
  );
}
