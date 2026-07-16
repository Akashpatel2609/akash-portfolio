"use client";

import { Database, GitBranch, Sparkles } from "lucide-react";
import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";
import { motion } from "framer-motion";

const layerIcons = [Database, GitBranch, Sparkles];

export function PipelineLayers() {
  const section = profile.sections.pipeline;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="relative">
        {/* Animated Connecting Line */}
        <div className="absolute left-6 top-0 hidden h-full w-px bg-zinc-800 lg:block">
          <motion.div 
            className="w-full h-full bg-gradient-to-b from-violet-500 via-pink-500 to-indigo-500 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>

        <div className="grid gap-8">
          {profile.pipelineLayers.map((layer, index) => {
            const Icon = layerIcons[index];

            return (
              <Reveal key={layer.layer} delay={index * 0.1}>
                <div className="grid gap-5 lg:grid-cols-[5rem_1fr] lg:items-stretch group/layer">
                  {/* Flowchart Node */}
                  <div className="relative hidden lg:block">
                    <motion.div 
                      className="absolute left-0 top-8 grid size-12 place-items-center rounded-full border border-violet-500/30 bg-zinc-950 text-sm font-semibold text-violet-300 shadow-[0_0_15px_rgba(124,58,237,0.15)] group-hover/layer:border-violet-400 group-hover/layer:shadow-[0_0_25px_rgba(124,58,237,0.4)] group-hover/layer:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      {index + 1}
                    </motion.div>
                  </div>

                  {/* Layer Card */}
                  <BentoCard className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center hover:border-violet-500/20">
                    <div>
                      <div className="mb-6 flex items-center gap-3">
                        <div className="grid size-12 place-items-center rounded-xl border border-violet-500/20 bg-violet-500/5 text-violet-400 group-hover/layer:text-violet-300 group-hover/layer:bg-violet-500/10 transition-colors duration-300">
                          <Icon size={22} />
                        </div>
                        <span className="rounded-full border border-white/5 bg-zinc-900 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-400">
                          {layer.layer}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight text-white group-hover/layer:text-violet-300 transition-colors duration-300">
                        {layer.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-zinc-400">{layer.description}</p>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-zinc-950/40 p-5 group-hover/layer:bg-zinc-950/60 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                          {layer.signal}
                        </p>
                        <span className="size-1.5 rounded-full bg-violet-400 animate-pulse" />
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {layer.items.map((item) => (
                          <motion.span
                            key={item}
                            className="rounded-xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-900 hover:border-violet-500/25 px-3 py-3.5 text-xs text-zinc-300 transition-all duration-300 select-none"
                            whileHover={{ y: -2 }}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </BentoCard>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
