"use client";

import { profile } from "@/data/profile";
import { motion } from "framer-motion";

export function About() {
  const section = profile.sections.about;

  return (
    <section id={section.id} className="py-32 bg-card border-t border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Section Header */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <span className="font-mono text-sm uppercase tracking-[0.3em] text-muted">01.</span>
              <h2 className="mt-4 font-display text-5xl md:text-8xl font-bold tracking-tighter text-foreground uppercase leading-[0.9]">
                {section.title}
              </h2>
            </div>
          </div>

          {/* About Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="prose prose-lg dark:prose-invert prose-p:font-medium prose-p:text-muted prose-p:leading-relaxed prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight max-w-none"
              dangerouslySetInnerHTML={{ __html: section.body }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
