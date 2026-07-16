import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";

export function Projects() {
  const section = profile.sections.projects;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="grid gap-5 lg:grid-cols-12">
        {profile.projects.map((project, index) => {
          const Icon = project.icon;
          const isFeature = index < 2;

          return (
            <Reveal
              key={project.title}
              delay={index * 0.04}
              className={isFeature ? "lg:col-span-6" : "lg:col-span-4"}
            >
              <BentoCard className="flex h-full min-h-[34rem] flex-col p-0">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-white/[0.035]">
                  <Image
                    src={project.caseStudy.screenshot}
                    alt={project.caseStudy.screenshotAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full border border-white/15 bg-black/70 px-3 py-1.5 font-mono text-xs text-zinc-300">
                      PROJECT_{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="grid size-9 place-items-center rounded-full border border-white/15 bg-black/70 text-white">
                      <Icon size={17} />
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                      measured impact
                    </p>
                    <p className="mt-2 text-sm font-medium leading-6 text-white">{project.impact}</p>
                  </div>

                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">{project.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tools.slice(0, isFeature ? 6 : 4).map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-400"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`/projects/${project.slug}`}
                    aria-label={`${project.cta}: ${project.title}`}
                    className="mt-7 inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-white/10 bg-white text-sm font-semibold text-black px-5 transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    Open Case Study
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </BentoCard>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
