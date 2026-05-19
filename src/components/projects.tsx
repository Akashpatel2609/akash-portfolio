import { ArrowUpRight } from "lucide-react";
import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";

export function Projects() {
  const section = profile.sections.projects;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="grid gap-4 lg:grid-cols-6">
        {profile.projects.map((project, index) => {
          const Icon = project.icon;

          return (
            <Reveal
              key={project.title}
              delay={index * 0.04}
              className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
            >
              <BentoCard className="flex h-full min-h-80 flex-col">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.075] text-white">
                    <Icon size={22} />
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-zinc-300">
                    {project.impact}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400">
                      {tool}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition hover:text-zinc-300"
                >
                  {project.cta}
                  <ArrowUpRight size={16} />
                </a>
              </BentoCard>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
