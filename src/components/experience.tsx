"use client";

import { profile } from "@/data/profile";
import { motion } from "framer-motion";
import { useRef } from "react";

export function Experience() {
  const section = profile.sections.experience;
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id={section.id} ref={containerRef} className="py-32 bg-card border-t border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-muted">03.</span>
          <h2 className="mt-4 font-display text-5xl md:text-8xl font-bold tracking-tighter text-foreground uppercase leading-[0.9]">
            {section.title}
          </h2>
        </div>

        {/* Minimalist Experience List */}
        <div className="flex flex-col border-t border-border">
          {profile.experience.map((item, index) => {
            const isLast = index === profile.experience.length - 1;

            return (
              <motion.div
                key={item.company + item.role}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col lg:flex-row lg:items-center justify-between py-12 lg:py-16 gap-8 border-b ${isLast ? 'border-border' : 'border-border'} hover:bg-background/50 transition-colors`}
              >


                <div className="flex flex-col lg:w-1/3 z-20">
                  <span className="font-mono text-sm uppercase tracking-widest text-muted mb-4">{item.duration}</span>
                  <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase group-hover:italic transition-all">
                    {item.company}
                  </h3>
                </div>

                <div className="flex flex-col lg:w-1/2 z-20">
                  <h4 className="text-2xl font-display font-medium text-foreground mb-6">
                    {item.role}
                  </h4>
                  <ul className="space-y-4">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-4 text-lg text-muted">
                        <span className="font-mono text-xs pt-2">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
