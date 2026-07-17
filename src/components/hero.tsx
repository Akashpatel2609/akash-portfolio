"use client";

import { ArrowDownRight, Download, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const iconMap = {
  "View Work": ArrowDownRight,
  "Download Resume": Download,
  "Contact Me": Mail
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);



  return (
    <section ref={containerRef} id="top" className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-background">
      {/* Massive Typography Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-5 flex items-center justify-center">
        <h1 className="text-[20vw] font-display font-bold leading-none tracking-tighter whitespace-nowrap text-foreground select-none">
          ENGINEER
        </h1>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-center">
        <motion.div style={{ opacity, scale }} className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[70vh]">
          
          {/* Left / Top Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-2 bg-accent"></span>
                  </span>
                  Open to roles
                </span>
                <span className="text-sm font-medium text-muted uppercase tracking-widest">
                  Toronto / Analytics Systems
                </span>
              </div>

              {/* Avant-Garde Giant Header */}
              <h1 className="font-display text-6xl sm:text-8xl lg:text-[7rem] font-bold leading-[0.9] tracking-tighter text-foreground mb-6">
                AKASH
                <br />
                <span className="text-muted italic font-serif tracking-normal pr-4">Patel.</span>
              </h1>

              <div className="max-w-xl">
                <h2 className="text-xl sm:text-3xl font-display font-medium leading-tight tracking-tight text-foreground mb-4">
                  Turning fragmented data into <span className="bg-accent text-white px-2 italic">decision systems.</span>
                </h2>
                
                <p className="text-base sm:text-lg leading-relaxed text-muted font-sans font-medium">
                  {profile.hero.subheadline}
                </p>
              </div>

              {/* Brutalist Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                {profile.hero.actions.map((action, i) => {
                  const Icon = iconMap[action.label as keyof typeof iconMap];

                  return (
                    <motion.a
                      key={action.label}
                      href={action.href}
                      target={action.href.startsWith("http") ? "_blank" : undefined}
                      rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                      className={cn(
                        "group relative flex min-h-14 items-center justify-between gap-4 overflow-hidden px-8 text-sm font-bold uppercase tracking-widest transition-all duration-500",
                        action.variant === "primary"
                          ? "bg-foreground text-background hover:scale-105"
                          : "border border-border bg-card text-foreground hover:bg-border"
                      )}
                    >
                      <span className="relative z-10">{action.label}</span>
                      <Icon size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right / Bottom Spatial Images & Metrics */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            <motion.div 
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative z-10 w-full max-w-[24rem] mx-auto lg:mr-0 aspect-[3/4] overflow-hidden bg-card border border-border shadow-2xl p-4"
            >
              <div className="relative w-full h-full overflow-hidden bg-muted">
                <Image
                  src={profile.hero.profileImage}
                  alt={profile.hero.profileImageAlt}
                  fill
                  priority
                  className="object-cover transition-all duration-700"
                />
              </div>
            </motion.div>

            {/* Overlapping Metric Cards */}
            <motion.div 
              style={{ y: y2 }}
              className="absolute -bottom-10 -left-4 sm:left-10 lg:-left-20 z-20 grid gap-3"
            >
              {profile.impactMetrics.slice(0, 2).map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-background border border-border p-5 shadow-xl backdrop-blur-md"
                >
                  <p className="font-display text-3xl font-bold tracking-tighter text-foreground">
                    {metric.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">{metric.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="h-16 w-px bg-gradient-to-b from-foreground to-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground" style={{ writingMode: 'vertical-rl' }}>
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
