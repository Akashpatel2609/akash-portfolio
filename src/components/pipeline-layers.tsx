"use client";

import { Box, Settings2, TrendingUp } from "lucide-react";
import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

// Update icons and themes for Bronze, Silver, Gold
const layerConfig = [
  {
    icon: Box,
    themeClass: "text-[#94a3b8] group-hover/layer:text-white",
    borderHover: "hover:border-[#94a3b8]/30",
    bgHover: "group-hover/layer:bg-[#94a3b8]/10",
    shadowHover: "group-hover/layer:shadow-[0_0_20px_rgba(148,163,184,0.15)]",
    pulseColor: "bg-[#94a3b8]"
  },
  {
    icon: Settings2,
    themeClass: "text-[#00D9FF] group-hover/layer:text-white",
    borderHover: "hover:border-[#00D9FF]/40",
    bgHover: "group-hover/layer:bg-[#00D9FF]/10",
    shadowHover: "group-hover/layer:shadow-[0_0_25px_rgba(0,217,255,0.25)]",
    pulseColor: "bg-[#00D9FF]",
    iconSpin: true
  },
  {
    icon: TrendingUp,
    themeClass: "text-[#A7F3D0] group-hover/layer:text-[#1F2937]",
    borderHover: "hover:border-[#A7F3D0]/60",
    bgHover: "group-hover/layer:bg-[#A7F3D0] group-hover/layer:text-[#1F2937]", // Full fill on hover
    shadowHover: "group-hover/layer:shadow-[0_0_35px_rgba(167,243,208,0.4)]",
    pulseColor: "bg-[#A7F3D0]",
    popEffect: true
  }
];

export function PipelineLayers() {
  const section = profile.sections.pipeline;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Timeline height animation based on scroll
  const timelineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="relative" ref={containerRef}>
        {/* Animated Connecting Line */}
        <div className="absolute left-6 top-0 hidden h-full w-px bg-[#1F2937] lg:block">
          <motion.div 
            className="w-full bg-gradient-to-b from-[#1F2937] via-[#00D9FF] to-[#A7F3D0] origin-top"
            style={{ height: timelineHeight }}
          />
        </div>

        <div className="grid gap-12 perspective-[2000px]">
          {profile.pipelineLayers.map((layer, index) => {
            const config = layerConfig[index];
            const Icon = config.icon;

            return (
              <Reveal key={layer.layer} delay={index * 0.1}>
                <motion.div 
                  className="grid gap-5 lg:grid-cols-[5rem_1fr] lg:items-stretch group/layer perspective-1000"
                  initial={{ rotateX: 10, y: 30, opacity: 0 }}
                  whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.4, 0, 0.2, 1],
                    delay: index * 0.1 
                  }}
                  whileHover={config.popEffect ? { scale: 1.02, z: 20 } : { scale: 1.01, z: 10 }}
                >
                  {/* Flowchart Node */}
                  <div className="relative hidden lg:block">
                    <motion.div 
                      className={cn(
                        "absolute left-0 top-8 grid size-12 place-items-center rounded-full border border-[#1F2937] bg-[#0A1428] text-sm font-bold text-[#94a3b8] transition-all duration-500",
                        config.shadowHover,
                        "group-hover/layer:border-white/20 group-hover/layer:text-white"
                      )}
                    >
                      {index + 1}
                    </motion.div>
                  </div>

                  {/* Layer Card */}
                  <BentoCard className={cn(
                    "grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center transition-all duration-500 transform-style-preserve-3d",
                    config.borderHover,
                    config.popEffect ? "group-hover/layer:-translate-y-2 group-hover/layer:bg-[#1F2937]/90" : "group-hover/layer:-translate-y-1"
                  )}>
                    <div className="transform-style-preserve-3d translate-z-10">
                      <div className="mb-6 flex items-center gap-3">
                        <div className={cn(
                          "grid size-12 place-items-center rounded-xl border border-white/5 bg-[#1F2937] transition-all duration-500",
                          config.themeClass,
                          config.bgHover
                        )}>
                          <Icon size={22} className={cn(config.iconSpin && "group-hover/layer:animate-[spin_4s_linear_infinite]")} />
                        </div>
                        <span className={cn(
                          "rounded-full border border-white/5 bg-[#0A1428] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors duration-300",
                          config.themeClass
                        )}>
                          {layer.layer}
                        </span>
                      </div>
                      <h3 className={cn(
                        "text-2xl font-bold tracking-tight text-white transition-colors duration-500",
                        config.popEffect && "group-hover/layer:text-[#A7F3D0]"
                      )}>
                        {layer.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-[#94a3b8]">{layer.description}</p>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-[#0A1428]/40 p-5 group-hover/layer:bg-[#0A1428]/80 transition-colors duration-500 translate-z-20">
                      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#94a3b8]">
                          {layer.signal}
                        </p>
                        <span className={cn("size-1.5 rounded-full animate-pulse", config.pulseColor)} />
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {layer.items.map((item) => (
                          <motion.span
                            key={item}
                            className="relative overflow-hidden rounded-xl border border-white/5 bg-[#1F2937]/50 px-3 py-3.5 text-xs text-white transition-all duration-300 select-none group/item"
                            whileHover={{ y: -2, scale: 1.02 }}
                          >
                            <span className="relative z-10">{item}</span>
                            <div className={cn(
                              "absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300",
                              config.bgHover
                            )} />
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
