"use client";

import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";
import { motion } from "framer-motion";


export function Skills() {
  const section = profile.sections.skills;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {profile.skills.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <Reveal key={skill.group} delay={index * 0.05}>
              <BentoCard className="h-full">
                <Icon className="mb-6 text-violet-400 group-hover:text-violet-300 transition-colors" size={26} />
                <h3 className="text-lg font-semibold text-white">{skill.group}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.4)", color: "#fff" }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="cursor-default rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-zinc-400 transition-colors select-none"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </BentoCard>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}

