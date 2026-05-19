import { CheckCircle2 } from "lucide-react";
import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";

export function About() {
  const section = profile.sections.about;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Reveal>
          <BentoCard className="h-full">
            <p className="text-lg leading-8 text-zinc-400">{section.body}</p>
          </BentoCard>
        </Reveal>
        <Reveal delay={0.08}>
          <BentoCard className="h-full">
            <div className="space-y-4">
              {section.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="shrink-0 text-white" size={20} />
                  <span className="text-sm font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </BentoCard>
        </Reveal>
      </div>
    </SectionShell>
  );
}
