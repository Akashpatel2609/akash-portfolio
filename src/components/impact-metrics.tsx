import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";

export function ImpactMetrics() {
  const section = profile.sections.impact;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {profile.impactMetrics.map((metric, index) => (
          <Reveal key={metric.label} delay={index * 0.04}>
            <BentoCard className="h-full">
              <p className="text-4xl font-semibold tracking-tight text-white">{metric.value}</p>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{metric.label}</p>
            </BentoCard>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
