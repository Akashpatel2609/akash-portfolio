import { Database, GitBranch, Sparkles } from "lucide-react";
import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";

const layerIcons = [Database, GitBranch, Sparkles];

export function PipelineLayers() {
  const section = profile.sections.pipeline;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="relative">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-white via-violet-400 to-white/10 lg:block" />
        <div className="grid gap-5">
          {profile.pipelineLayers.map((layer, index) => {
            const Icon = layerIcons[index];

            return (
              <Reveal key={layer.layer} delay={index * 0.06}>
                <div className="grid gap-5 lg:grid-cols-[5rem_1fr] lg:items-stretch">
                  <div className="relative hidden lg:block">
                    <div className="absolute left-0 top-8 grid size-12 place-items-center rounded-full border border-white/15 bg-white text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.22)]">
                      {index + 1}
                    </div>
                  </div>
                  <BentoCard className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                    <div>
                      <div className="mb-6 flex items-center gap-3">
                        <div className="grid size-12 place-items-center rounded-xl border border-white/10 bg-white/[0.075] text-white">
                          <Icon size={23} />
                        </div>
                        <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
                          {layer.layer}
                        </span>
                      </div>
                      <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">
                        {layer.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-zinc-400">{layer.description}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                        {layer.signal}
                      </p>
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {layer.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-sm text-zinc-300"
                          >
                            {item}
                          </span>
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
