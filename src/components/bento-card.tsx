"use client";

import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
};

export function BentoCard({ children, className }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth movement
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { damping: 25, stiffness: 200 });

  // Motion values for radial glow
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowOpacity = useSpring(0, { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative positions from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);

    // Glow position in pixels
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    glowOpacity.set(0.6);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glowOpacity.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950/60 p-6 shadow-xl shadow-black/25 backdrop-blur-md transition-all duration-300",
        className
      )}
    >
      {/* 3D Glassmorphism border reflection */}
      <div 
        className="absolute inset-0 -z-10 rounded-[1.5rem] border border-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
        style={{ transform: "translateZ(10px)" }}
      />

      {/* Radial Hover Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px -z-10 rounded-[1.5rem]"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(400px circle at ${gx}px ${gy}px, rgba(124, 58, 237, 0.12), transparent 80%)`
          ),
          opacity: glowOpacity,
        }}
      />

      {/* Hover border glow light */}
      <motion.div
        className="pointer-events-none absolute -inset-px -z-5 rounded-[1.5rem]"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) => `radial-gradient(120px circle at ${gx}px ${gy}px, rgba(236, 72, 153, 0.25), transparent 60%)`
          ),
          opacity: glowOpacity,
        }}
      />

      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
