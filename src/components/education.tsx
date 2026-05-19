import { BentoCard } from "@/components/bento-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";
import { profile } from "@/data/profile";

export function Education() {
  const section = profile.sections.education;

  return (
    <SectionShell id={section.id} eyebrow={section.eyebrow} title={section.title}>
      <div className="grid gap-4 lg:grid-cols-3">
        {profile.education.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal key={item.school} delay={index * 0.04}>
              <BentoCard className="h-full">
                <Icon className="mb-6 text-white" size={26} />
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-400">
                  {item.location}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.school}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{item.credential}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300">
                    {item.year}
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-zinc-300">
                    {item.result}
                  </span>
                </div>
              </BentoCard>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
