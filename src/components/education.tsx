"use client";

import { profile } from "@/data/profile";
import { motion } from "framer-motion";

export function Education() {
  const section = profile.sections.education;

  return (
    <section id={section.id} className="py-32 bg-background border-t border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-20 md:mb-32">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-muted">05.</span>
          <h2 className="mt-4 font-display text-5xl md:text-8xl font-bold tracking-tighter text-foreground uppercase leading-[0.9]">
            {section.title}
          </h2>
        </div>

        <div className="flex flex-col border-t border-border">
          {profile.education.map((item, index) => {
            const isLast = index === profile.education.length - 1;

            return (
              <motion.div
                key={item.school + item.credential}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex flex-col lg:flex-row lg:items-center justify-between py-12 lg:py-16 gap-8 border-b ${isLast ? 'border-border' : 'border-border'} hover:bg-card/50 transition-colors`}
              >
                
                <div className="flex flex-col lg:w-1/4 z-20">
                  <span className="font-mono text-sm uppercase tracking-widest text-muted mb-4">{item.year}</span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground uppercase group-hover:italic transition-all">
                    {item.school}
                  </h3>
                </div>

                <div className="flex flex-col lg:w-1/2 z-20">
                  <h4 className="text-2xl font-display font-medium text-foreground mb-4">
                    {item.credential}
                  </h4>
                  <p className="text-lg text-muted">{item.location}</p>
                </div>

                <div className="flex flex-col lg:w-1/4 z-20 lg:items-end">
                  <span className="border border-border bg-card px-5 py-3 font-mono text-sm uppercase tracking-widest text-foreground">
                    {item.result}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
