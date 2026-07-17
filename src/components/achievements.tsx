"use client";

import { profile } from "@/data/profile";
import { motion } from "framer-motion";

export function Achievements() {
  const section = profile.sections.achievements;

  return (
    <section id={section.id} className="py-32 bg-card border-t border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-muted">06.</span>
          <h2 className="mt-4 font-display text-5xl md:text-8xl font-bold tracking-tighter text-foreground uppercase leading-[0.9]">
            {section.title}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {profile.achievements.map((item, index) => {
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col gap-6 p-10 border border-border bg-background transition-colors hover:bg-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-3xl font-bold tracking-tight text-foreground uppercase group-hover:italic transition-all">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-lg text-muted">{item.description}</p>
                
                <div className="mt-auto pt-6 flex flex-wrap gap-3">
                  {item.metrics.map((metric) => (
                    <span key={metric} className="border border-border bg-card px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground">
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
