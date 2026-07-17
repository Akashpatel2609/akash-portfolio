"use client";

import { profile } from "@/data/profile";
import { motion } from "framer-motion";

export function Skills() {
  const section = profile.sections.skills;

  return (
    <section id={section.id} className="py-32 bg-background border-t border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-sm uppercase tracking-[0.3em] text-muted">04.</span>
            <h2 className="mt-4 font-display text-5xl md:text-8xl font-bold tracking-tighter text-foreground uppercase leading-[0.9]">
              {section.title}
            </h2>
          </div>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          {profile.skills.map((skillGroup, index) => {
            return (
              <motion.div 
                key={skillGroup.group}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                <div className="border-b border-border pb-4">
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
                    {skillGroup.group}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((item) => (
                    <span 
                      key={item} 
                      className="border border-border bg-card px-5 py-3 font-mono text-sm uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background cursor-default"
                    >
                      {item}
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
