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
                  <div className="grid size-11 place-items-center rounded border border-[#38BDF8]/40 bg-[#38BDF8]/10 text-[#38BDF8]">
                    <Icon size={22} />
                  </div>
                  <span className="rounded border border-[#273244] px-3 py-1 text-xs text-[#A3E635]">
                    {project.impact}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#F8FAFC]">{project.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-[#94A3B8]">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="text-xs text-[#94A3B8]">
                      {tool}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#38BDF8] transition hover:text-[#F8FAFC]"
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
